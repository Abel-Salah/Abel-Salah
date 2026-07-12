import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
  requireAdminToken,
} from "../_shared/opportunityAgent.ts";

type StepResult = {
  name: string;
  ok: boolean;
  status: number;
  body: unknown;
};

const callFunction = async (
  functionName: string,
  serviceRoleKey: string,
  body: Record<string, unknown>
): Promise<StepResult> => {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let parsed: unknown = text;

  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }

  return {
    name: functionName,
    ok: response.ok,
    status: response.status,
    body: parsed,
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const unauthorized = requireAdminToken(req);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await req.json().catch(() => ({}));
    const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const discoverLimit =
      typeof body.discoverLimit === "number"
        ? Math.max(1, Math.min(Math.floor(body.discoverLimit), 20))
        : 20;
    const scoreLimit =
      typeof body.scoreLimit === "number"
        ? Math.max(1, Math.min(Math.floor(body.scoreLimit), 20))
        : 20;
    const draftLimit =
      typeof body.draftLimit === "number"
        ? Math.max(1, Math.min(Math.floor(body.draftLimit), 10))
        : 10;

    const steps: StepResult[] = [];

    steps.push(
      await callFunction("discover-job-opportunities", serviceRoleKey, {
        limit: discoverLimit,
      })
    );

    if (steps[steps.length - 1]?.ok) {
      steps.push(
        await callFunction("score-job-opportunities", serviceRoleKey, {
          limit: scoreLimit,
        })
      );
    }

    if (steps[steps.length - 1]?.ok) {
      steps.push(
        await callFunction("draft-job-outreach", serviceRoleKey, {
          limit: draftLimit,
          minScore: 70,
        })
      );
    }

    const success = steps.every((step) => step.ok);

    return jsonResponse({ success, steps }, success ? 200 : 502);
  } catch (error) {
    console.error("run-opportunity-daily error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
