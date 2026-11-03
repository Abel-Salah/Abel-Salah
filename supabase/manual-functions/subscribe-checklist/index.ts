// Deliberately deployed as one reviewed function through the personal dashboard.
// Kept outside the legacy deploy-all workflow; see docs/checklist-migration.md.
export const CHECKLIST_PDF_URL = "https://abelsalah.fr/downloads/checklist-audit-site-abel-salah.pdf";
const EXPECTED_PROJECT_URL = "https://pcjhrmwuqyxddyeikely.supabase.co";

export type ChecklistEnvironment = {
  supabaseUrl: string;
  serviceRoleKey: string;
  resendKey: string;
  fromEmail: string;
};
type JsonObject = Record<string, unknown>;
const object = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function allowedOrigin(origin: string | null): origin is string {
  return origin === "https://abelsalah.fr" || origin === "https://www.abelsalah.fr" ||
    (origin !== null && /^https:\/\/[a-z0-9-]+\.abelsalah-site\.pages\.dev$/.test(origin));
}
const escapeHTML = (value: string) => value.replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("missing_body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0, text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 8192) { await reader.cancel(); throw new Error("body_too_large"); }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } finally { reader.releaseLock(); }
}

export function createChecklistHandler(env: ChecklistEnvironment, fetcher: typeof fetch = fetch) {
  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin");
    const cors = {
      "Access-Control-Allow-Origin": allowedOrigin(origin) ? origin : "null",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin", "Cache-Control": "no-store", "Content-Type": "application/json",
    };
    const reply = (data: JsonObject, status = 200) => new Response(JSON.stringify(data), { status, headers: cors });
    if (!allowedOrigin(origin)) return reply({ error: "Origine non autorisée" }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply({ error: "Méthode non autorisée" }, 405);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return reply({ error: "Requête JSON requise" }, 415);
    }
    let input: unknown;
    try { input = await readBody(request); }
    catch (error) {
      return reply({ error: "Requête invalide" }, error instanceof Error && error.message === "body_too_large" ? 413 : 400);
    }
    if (!object(input)) return reply({ error: "Requête invalide" }, 400);
    const name = typeof input.first_name === "string" ? input.first_name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const source = typeof input.source === "string" ? input.source.trim() : "site";
    if (input.consent !== true || name.length < 1 || name.length > 80 || Array.from(name).some(char => char.charCodeAt(0) < 32) ||
        email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        /\.invalid$/i.test(email) || source.length > 100) {
      return reply({ error: "Vérifiez le prénom, l’adresse e-mail et le consentement." }, 400);
    }
    if (env.supabaseUrl !== EXPECTED_PROJECT_URL || !env.serviceRoleKey || !env.resendKey || !env.fromEmail) {
      return reply({ error: "Service temporairement indisponible." }, 503);
    }
    const rpc = async (name: string, args: JsonObject): Promise<unknown> => {
      const response = await fetcher(`${env.supabaseUrl}/rest/v1/rpc/${name}`, {
        method: "POST", signal: AbortSignal.timeout(10_000),
        headers: { apikey: env.serviceRoleKey, Authorization: `Bearer ${env.serviceRoleKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      if (!response.ok) throw new Error("checklist_storage_unavailable");
      return await response.json();
    };
    let claim: unknown;
    try {
      const rawIP = (request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
        request.headers.get("cf-connecting-ip") || "unknown").slice(0,200);
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(env.serviceRoleKey + "|" + rawIP));
      const clientKey = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2,"0")).join("");
      claim = await rpc("claim_checklist_delivery", {
        p_first_name: name, p_email: email, p_consent: true, p_source: source,
        p_client_key: clientKey, p_attempt: crypto.randomUUID(),
      });
    } catch { return reply({ error: "Service temporairement indisponible." }, 503); }
    if (!object(claim)) return reply({ error: "Service temporairement indisponible." }, 503);
    if (claim.state === "rate_limited") return reply({ error: "Trop de demandes. Réessayez plus tard." }, 429);
    if (claim.state === "sent") return reply({ ok: true, emailStatus: "sent", emailRetryAllowed: false, pdfUrl: CHECKLIST_PDF_URL });
    if (claim.state === "busy" || claim.state === "held") {
      return reply({ ok: true, emailStatus: "unconfirmed", emailRetryAllowed: claim.state === "busy", pdfUrl: CHECKLIST_PDF_URL });
    }
    if (claim.state !== "send" || typeof claim.id !== "string" || typeof claim.attempt !== "string" ||
        typeof claim.first_name !== "string" || claim.email !== email) {
      return reply({ error: "Service temporairement indisponible." }, 503);
    }
    const finish = async (messageId: string | null, errorCode: string | null) => {
      try {
        const result = await rpc("finish_checklist_delivery", {
          p_id: claim.id, p_attempt: claim.attempt, p_message_id: messageId, p_error_code: errorCode,
        });
        return result === true;
      } catch { return false; }
    };
    let provider: Response;
    try {
      provider = await fetcher("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(15_000),
        headers: { Authorization: `Bearer ${env.resendKey}`, "Content-Type": "application/json",
          "Idempotency-Key": `checklist-v1/${claim.id}` },
        body: JSON.stringify({
          from: env.fromEmail, to: [email], subject: "Votre checklist d’audit de site — Abel SALAH",
          text: `Bonjour ${claim.first_name},\n\nVotre checklist est disponible ici : ${CHECKLIST_PDF_URL}\n\nVous recevez cet e-mail après votre demande sur abelsalah.fr.\nRéférence : ${claim.id}\n\nAbel SALAH`,
          html: `<p>Bonjour ${escapeHTML(claim.first_name)},</p><p>Votre checklist est prête.</p><p><a href="${CHECKLIST_PDF_URL}">Télécharger la checklist d’audit de site</a></p><p>Vous recevez cet e-mail après votre demande sur abelsalah.fr.</p><p>Référence : ${claim.id}</p><p>Abel SALAH</p>`,
        }),
      });
    } catch {
      await finish(null,"provider_unconfirmed");
      return reply({ ok: true, emailStatus: "unconfirmed", emailRetryAllowed: true, pdfUrl: CHECKLIST_PDF_URL });
    }
    if (!provider.ok) {
      await finish(null,`provider_http_${provider.status}`);
      return reply({ ok: true, emailStatus: "unconfirmed", emailRetryAllowed: true, pdfUrl: CHECKLIST_PDF_URL });
    }
    let payload: unknown;
    try { payload = await provider.json(); } catch { payload = null; }
    if (!object(payload) || typeof payload.id !== "string" || !payload.id || payload.id.length > 128) {
      await finish(null,"provider_invalid_response");
      return reply({ ok: true, emailStatus: "unconfirmed", emailRetryAllowed: true, pdfUrl: CHECKLIST_PDF_URL });
    }
    // An accepted provider request is true even if persisting its receipt fails.
    // The stable key and DB lease prevent blind duplicate retries.
    await finish(payload.id,null);
    return reply({ ok: true, emailStatus: "sent", emailRetryAllowed: false, pdfUrl: CHECKLIST_PDF_URL });
  };
}

type EdgeRuntime = { env: { get(name: string): string | undefined }; serve(handler: (request: Request) => Promise<Response>): unknown };
const runtime = (globalThis as { Deno?: EdgeRuntime }).Deno;
if (runtime) {
  runtime.serve(createChecklistHandler({
    supabaseUrl: runtime.env.get("SUPABASE_URL") ?? "",
    serviceRoleKey: runtime.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    resendKey: runtime.env.get("RESEND_API_KEY") ?? "",
    fromEmail: runtime.env.get("NEWSLETTER_FROM_EMAIL") ?? "Abel SALAH <newsletter@abelsalah.fr>",
  }));
}
