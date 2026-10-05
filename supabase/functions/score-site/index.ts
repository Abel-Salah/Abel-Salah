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

type ScrapedPage = {
  url: string;
  data: Record<string, unknown>;
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

function isInternalPage(candidate: string, root: URL) {
  try {
    const parsed = new URL(candidate, root);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    if (parsed.hostname !== root.hostname) return false;
    if (parsed.pathname.match(/\.(?:pdf|jpg|jpeg|png|gif|svg|webp|css|js|xml|zip)$/i)) return false;
    parsed.hash = '';
    parsed.search = '';
    return parsed.toString().replace(/\/$/, '') !== root.toString().replace(/\/$/, '');
  } catch {
    return false;
  }
}

async function scrapePage(url: string, firecrawlKey: string): Promise<ScrapedPage> {
  const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: { Authorization: `Bearer ${firecrawlKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      formats: ["markdown", "html", "links", { type: "screenshot", fullPage: true, quality: 70 }],
      onlyMainContent: false,
      timeout: 60000,
      maxAge: 3600000,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(response.status === 429 ? "FIRECRAWL_RATE_LIMIT" : "FIRECRAWL_ERROR");
  return { url, data: (payload.data ?? {}) as Record<string, unknown> };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const url = normalizeUrl(body.url);
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlKey) return json({ error: "FIRECRAWL_NOT_CONFIGURED" }, 503);

    const rootPage = await scrapePage(url, firecrawlKey);
    const rootData = rootPage.data;
    const discoveredLinks = Array.isArray(rootData.links) ? rootData.links.map(String) : [];
    const pageUrls = [...new Set(discoveredLinks.filter((link) => isInternalPage(link, new URL(url))))].slice(0, 4);
    const secondaryPages = await Promise.all(pageUrls.map(async (pageUrl) => {
      try { return await scrapePage(pageUrl, firecrawlKey); } catch (error) { console.warn("secondary page skipped", pageUrl, error); return null; }
    }));
    const pages = [rootPage, ...secondaryPages.filter((page): page is ScrapedPage => Boolean(page))];
    const pageContext = pages.map((page, index) => {
      const data = page.data;
      return `PAGE ${index + 1}\nURL: ${page.url}\nMétadonnées: ${JSON.stringify(data.metadata ?? {})}\nLiens internes: ${JSON.stringify(Array.isArray(data.links) ? data.links.slice(0, 40) : [])}\nHTML extrait: ${String(data.html ?? "").slice(0, 5000)}\nContenu rendu: ${String(data.markdown ?? "").slice(0, 7000)}`;
    }).join("\n\n---\n\n");

    const audit = await callGeminiJson<AuditResult>(
      `Tu es un auditeur senior de sites web. Analyse uniquement les éléments observés dans les données fournies, sur toutes les pages disponibles. Ne fabrique aucune preuve, aucun résultat commercial et aucun fait absent. Donne un score entier de 0 à 10 pour chaque critère. Chaque score doit être justifié par au moins une observation concrète et cite l'URL de la page concernée dans evidence. Si une information est absente, indique-le clairement et baisse le score de confiance. Réponds uniquement en JSON avec cette structure: {"overall":number,"criteria":[{"key":string,"label":string,"score":number,"evidence":string[],"recommendations":string[]}],"priorities":string[],"limitations":string[]}. Critères obligatoires: experience, design, content, visibility, conversion, credibility. Les recommandations doivent être concrètes, ordonnées et applicables par une entreprise française.`,
      `Domaine demandé: ${url}\nNombre de pages réellement récupérées: ${pages.length}\n${pageContext}`,
    );

    return json({ success: true, url, audit, pagesAnalyzed: pages.length, pages: pages.map((page) => ({ url: page.url, screenshot: page.data.screenshot ?? null, title: (page.data.metadata as Record<string, unknown> | undefined)?.title ?? null })), screenshot: rootData.screenshot ?? null, source: "firecrawl+gemini", generatedAt: new Date().toISOString() });
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
