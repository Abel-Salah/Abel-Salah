import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { callGeminiJson } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

type AuditResult = {
  overall: number;
  criteria: Array<{
    key: string;
    label: string;
    score: number;
    evidence: string[];
    recommendations: string[];
  }>;
  priorities: string[];
  limitations: string[];
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

function normalizeUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) throw new Error("URL_REQUIRED");
  const url = new URL(/^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.hostname === "localhost" || url.hostname.endsWith(".local")) {
    throw new Error("PUBLIC_URL_REQUIRED");
  }
  return url.toString();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const url = normalizeUrl(body.url);
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlKey) return json({ error: "FIRECRAWL_NOT_CONFIGURED" }, 503);

    const scrape = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: { Authorization: `Bearer ${firecrawlKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html", "links", { type: "screenshot", fullPage: false, quality: 70 }],
        onlyMainContent: false,
        timeout: 60000,
        maxAge: 3600000,
      }),
    });
    const scrapePayload = await scrape.json().catch(() => ({}));
    if (!scrape.ok) return json({ error: scrape.status === 429 ? "FIRECRAWL_RATE_LIMIT" : "FIRECRAWL_ERROR", details: scrapePayload.error }, scrape.status);

    const data = scrapePayload.data ?? {};
    // Keep the AI payload bounded: Firecrawl can return very large pages and
    // the audit should remain reliable on the public endpoint.
    const markdown = String(data.markdown ?? "").slice(0, 12000);
    const html = String(data.html ?? "").slice(0, 8000);
    const links = Array.isArray(data.links) ? data.links.slice(0, 80) : [];
    const metadata = data.metadata ?? {};

    const audit = await callGeminiJson<AuditResult>(
      `Tu es un auditeur senior de sites web. Analyse uniquement les éléments observés dans les données fournies. Ne fabrique aucune preuve, aucun résultat commercial et aucun fait absent. Donne un score entier de 0 à 10 pour chaque critère. Chaque score doit être justifié par au moins une observation concrète. Si une information est absente, indique-le clairement et baisse le score de confiance. Réponds uniquement en JSON avec cette structure: {"overall":number,"criteria":[{"key":string,"label":string,"score":number,"evidence":string[],"recommendations":string[]}],"priorities":string[],"limitations":string[]}. Critères obligatoires: experience, design, content, visibility, conversion, credibility. Les recommandations doivent être concrètes, ordonnées et applicables par une entreprise française.`,
      `URL auditée: ${url}\nMétadonnées: ${JSON.stringify(metadata)}\nLiens détectés: ${JSON.stringify(links)}\nHTML extrait: ${html}\nContenu rendu: ${markdown}`,
    );

    return json({ success: true, url, audit, screenshot: data.screenshot ?? null, source: "firecrawl+gemini", generatedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    if (message === "URL_REQUIRED" || message === "PUBLIC_URL_REQUIRED") return json({ error: message }, 400);
    console.error("score-site error", error);
    const category = message.startsWith("Gemini API error 429")
      ? "GEMINI_RATE_LIMIT"
      : message.startsWith("Gemini API error")
        ? "GEMINI_ERROR"
        : message.includes("GEMINI_API_KEY")
          ? "GEMINI_NOT_CONFIGURED"
          : "AUDIT_UNAVAILABLE";
    return json({ error: category }, 500);
  }
});
