import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  callAiJson,
  clampLimit,
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
  type OpportunityScore,
} from "../_shared/opportunityAgent.ts";

type Opportunity = {
  id: string;
  title: string;
  company: string | null;
  url: string;
  description: string | null;
  location: string | null;
};

const systemPrompt = `Tu scores des opportunites professionnelles pour Abel SALAH.

Profil cible :
- Consultant IA, automatisation commerciale, formation IA et strategie digitale.
- Cible ideale : dirigeants, PME, equipes commerciales, organismes de formation, missions B2B a impact mesurable.
- A eviter : stage, alternance, junior, postes salaries trop generalistes, offres sans lien IA/automation/business.

Retourne uniquement un JSON strict avec :
{
  "score": number 0-100,
  "fit_summary": "2 phrases max",
  "strengths": ["..."],
  "risks": ["..."],
  "suggested_angle": "angle de prise de contact personnalise"
}`;

const validateScore = (score: OpportunityScore): OpportunityScore => ({
  score: Math.max(0, Math.min(100, Math.round(Number(score.score) || 0))),
  fit_summary: String(score.fit_summary ?? "").slice(0, 800),
  strengths: Array.isArray(score.strengths)
    ? score.strengths.map(String).slice(0, 5)
    : [],
  risks: Array.isArray(score.risks) ? score.risks.map(String).slice(0, 5) : [],
  suggested_angle: String(score.suggested_angle ?? "").slice(0, 500),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const limit = clampLimit(body.limit, 20, 50);

    const supabase = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );
    const lovableApiKey = getRequiredEnv("LOVABLE_API_KEY");

    const { data: opportunities, error: opportunityError } = await supabase
      .from("job_opportunities")
      .select("id, title, company, url, description, location")
      .eq("status", "new")
      .order("discovered_at", { ascending: false })
      .limit(limit);

    if (opportunityError) {
      throw opportunityError;
    }

    const scored = [];

    for (const opportunity of (opportunities ?? []) as Opportunity[]) {
      const score = validateScore(
        await callAiJson<OpportunityScore>(
          lovableApiKey,
          systemPrompt,
          JSON.stringify(opportunity, null, 2)
        )
      );

      const { error: scoreError } = await supabase.from("job_scores").upsert(
        {
          opportunity_id: opportunity.id,
          ...score,
        },
        { onConflict: "opportunity_id" }
      );

      if (scoreError) {
        throw scoreError;
      }

      const { error: updateError } = await supabase
        .from("job_opportunities")
        .update({ status: "scored" })
        .eq("id", opportunity.id);

      if (updateError) {
        throw updateError;
      }

      scored.push({ opportunity_id: opportunity.id, ...score });
    }

    return jsonResponse({ success: true, scored });
  } catch (error) {
    console.error("score-job-opportunities error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
