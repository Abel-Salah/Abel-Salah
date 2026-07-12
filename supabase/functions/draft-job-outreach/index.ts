import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  callAiJson,
  clampLimit,
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
  profileUrl,
  type OutreachDraft,
} from "../_shared/opportunityAgent.ts";

type ScoredOpportunity = {
  id: string;
  title: string;
  company: string | null;
  url: string;
  description: string | null;
  score: {
    score: number;
    relevance: number | null;
    urgency: number | null;
    budget_potential: number | null;
    response_probability: number | null;
    fit_summary: string;
    strengths: string[];
    risks: string[];
    suggested_angle: string | null;
  };
};

type ScoreRow = ScoredOpportunity["score"] & {
  opportunity_id: string;
};

const systemPrompt = `Tu rediges un brouillon de prise de contact pour Abel SALAH.

Regles obligatoires :
- Ne jamais pretendre avoir deja parle avec la personne.
- Ne jamais inventer de reference client, chiffre ou disponibilite.
- Message court, humain, personnalise, oriente valeur.
- Ton professionnel, direct, sans agressivite commerciale.
- Le brouillon doit etre relu par un humain avant envoi.
- Prepare plusieurs formats utiles : LinkedIn, email, version courte et version candidature plateforme.
- Ajoute un plan de relance J+3, J+7, J+14.
- Retourne uniquement un JSON strict :
{
  "subject":"...",
  "rationale":"pourquoi cette opportunite est pertinente",
  "message":"message principal",
  "linkedin_message":"...",
  "email_message":"...",
  "short_message":"...",
  "application_message":"...",
  "follow_up_plan":[
    {"delay_days":3,"message":"..."},
    {"delay_days":7,"message":"..."},
    {"delay_days":14,"message":"..."}
  ]
}.`;

const validateDraft = (draft: OutreachDraft): OutreachDraft => ({
  subject: String(draft.subject ?? "").slice(0, 140),
  rationale: String(draft.rationale ?? "").slice(0, 700),
  message: String(draft.message ?? "").slice(0, 1800),
  linkedin_message: String(draft.linkedin_message ?? draft.message ?? "").slice(
    0,
    1200
  ),
  email_message: String(draft.email_message ?? draft.message ?? "").slice(0, 1800),
  short_message: String(draft.short_message ?? draft.message ?? "").slice(0, 500),
  application_message: String(
    draft.application_message ?? draft.message ?? ""
  ).slice(0, 1600),
  follow_up_plan: Array.isArray(draft.follow_up_plan)
    ? draft.follow_up_plan
        .filter((step) => [3, 7, 14].includes(Number(step.delay_days)))
        .map((step) => ({
          delay_days: Number(step.delay_days),
          message: String(step.message ?? "").slice(0, 900),
        }))
        .slice(0, 3)
    : [],
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const limit = clampLimit(body.limit, 10, 25);
    const minScore = clampLimit(body.minScore, 70, 100);

    const supabase = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );
    const lovableApiKey = getRequiredEnv("LOVABLE_API_KEY");
    const cvUrl = Deno.env.get("ABEL_CV_URL") ?? null;

    const { data: existingDrafts, error: draftsError } = await supabase
      .from("job_outreach_drafts")
      .select("opportunity_id")
      .limit(1000);

    if (draftsError) {
      throw draftsError;
    }

    const draftedIds = new Set(
      (existingDrafts ?? []).map((draft) => draft.opportunity_id as string)
    );

    const { data: scores, error: scoreError } = await supabase
      .from("job_scores")
      .select(
        "opportunity_id, score, relevance, urgency, budget_potential, response_probability, fit_summary, strengths, risks, suggested_angle"
      )
      .gte("score", minScore)
      .order("score", { ascending: false })
      .limit(limit * 3);

    if (scoreError) {
      throw scoreError;
    }

    const eligibleScores = ((scores ?? []) as ScoreRow[]).filter(
      (score) => !draftedIds.has(score.opportunity_id)
    );
    const eligibleIds = eligibleScores.map((score) => score.opportunity_id);

    if (eligibleIds.length === 0) {
      return jsonResponse({ success: true, drafts: [] });
    }

    const { data: opportunities, error: opportunityError } = await supabase
      .from("job_opportunities")
      .select("id, title, company, url, description")
      .eq("status", "scored")
      .in("id", eligibleIds)
      .limit(limit);

    if (opportunityError) {
      throw opportunityError;
    }

    const scoreByOpportunity = new Map(
      eligibleScores.map((score) => [score.opportunity_id, score])
    );
    const drafts = [];

    for (const item of (opportunities ?? []).slice(0, limit)) {
      const opportunity = {
        ...(item as Omit<ScoredOpportunity, "score">),
        score: scoreByOpportunity.get(item.id as string)!,
      };

      const draft = validateDraft(
        await callAiJson<OutreachDraft>(
          lovableApiKey,
          systemPrompt,
          JSON.stringify(
            {
              opportunity,
              abel_profile_url: profileUrl,
              cv_url: cvUrl,
            },
            null,
            2
          )
        )
      );

      if (!draft.message) {
        throw new Error(`AI returned an empty draft for opportunity ${opportunity.id}`);
      }

      const { data: inserted, error: insertError } = await supabase
        .from("job_outreach_drafts")
        .insert({
          opportunity_id: opportunity.id,
          channel: "manual",
          subject: draft.subject,
          message: draft.message,
          rationale: draft.rationale,
          linkedin_message: draft.linkedin_message,
          email_message: draft.email_message,
          short_message: draft.short_message,
          application_message: draft.application_message,
          follow_up_plan: draft.follow_up_plan,
          cv_url: cvUrl,
          profile_url: profileUrl,
          status: "pending_review",
        })
        .select("id, opportunity_id, status")
        .single();

      if (insertError) {
        throw insertError;
      }

      const { error: updateError } = await supabase
        .from("job_opportunities")
        .update({ status: "drafted" })
        .eq("id", opportunity.id);

      if (updateError) {
        throw updateError;
      }

      drafts.push(inserted);
    }

    return jsonResponse({ success: true, drafts });
  } catch (error) {
    console.error("draft-job-outreach error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
