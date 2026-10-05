export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-opportunity-admin-token, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export const profileUrl = "https://abelsalah.fr";

export type OpportunityScore = {
  score: number;
  relevance?: number;
  urgency?: number;
  budget_potential?: number;
  response_probability?: number;
  fit_summary: string;
  strengths: string[];
  risks: string[];
  suggested_angle: string;
};

export type OutreachDraft = {
  subject: string;
  rationale?: string;
  message: string;
  linkedin_message?: string;
  email_message?: string;
  short_message?: string;
  application_message?: string;
  follow_up_plan?: Array<{ delay_days: number; message: string }>;
};

export const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export const getRequiredEnv = (name: string) => {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const requireAdminToken = (req: Request) => {
  const expected = getRequiredEnv("OPPORTUNITY_ADMIN_TOKEN");
  const provided = req.headers.get("x-opportunity-admin-token");

  if (!provided || provided !== expected) {
    return jsonResponse({ error: "Unauthorized opportunity admin request" }, 401);
  }

  return null;
};

export const clampLimit = (value: unknown, fallback: number, max: number) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.min(Math.floor(value), max));
};

export const parseAiJson = <T>(content: string): T => {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return JSON.parse(fenced?.[1] ?? trimmed) as T;
};

export const callAiJson = async <T>(
  _unusedApiKey: string,
  systemPrompt: string,
  userPrompt: string
) => {
  const { callGeminiJson } = await import("./gemini.ts");
  return callGeminiJson<T>(systemPrompt, userPrompt);
};
