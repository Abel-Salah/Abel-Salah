export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export const profileUrl = "https://abelsalah.fr";
export const aiGatewayUrl = "https://ai.gateway.lovable.dev/v1/chat/completions";
export const aiModel = "google/gemini-3-flash-preview";

export type OpportunityScore = {
  score: number;
  fit_summary: string;
  strengths: string[];
  risks: string[];
  suggested_angle: string;
};

export type OutreachDraft = {
  subject: string;
  message: string;
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
  lovableApiKey: string,
  systemPrompt: string,
  userPrompt: string
) => {
  const response = await fetch(aiGatewayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: aiModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Gateway error ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI Gateway returned no JSON content");
  }

  return parseAiJson<T>(content);
};
