import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
  requireAdminToken,
} from "../_shared/opportunityAgent.ts";

type AdminAction =
  | "list"
  | "update_opportunity_status"
  | "update_draft"
  | "update_draft_status"
  | "create_or_update_application";

const opportunityStatuses = new Set([
  "new",
  "scored",
  "drafted",
  "approved",
  "rejected",
  "applied",
  "follow_up",
  "closed",
]);

const draftStatuses = new Set(["pending_review", "approved", "rejected", "sent"]);
const applicationStatuses = new Set([
  "not_sent",
  "sent",
  "replied",
  "follow_up_scheduled",
  "closed_won",
  "closed_lost",
]);

const addDaysIso = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
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
    const action = (body.action ?? "list") as AdminAction;
    const supabase = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );

    if (action === "list") {
      const status = typeof body.status === "string" ? body.status : null;
      const limit =
        typeof body.limit === "number"
          ? Math.max(1, Math.min(Math.floor(body.limit), 100))
          : 50;

      let query = supabase
        .from("job_opportunities")
        .select(
          `
          id,
          title,
          company,
          url,
          description,
          location,
          remote,
          discovered_at,
          published_at,
          status,
          job_scores(
            score,
            relevance,
            urgency,
            budget_potential,
            response_probability,
            fit_summary,
            strengths,
            risks,
            suggested_angle
          ),
          job_outreach_drafts(
            id,
            subject,
            rationale,
            message,
            linkedin_message,
            email_message,
            short_message,
            application_message,
            follow_up_plan,
            cv_url,
            profile_url,
            status,
            created_at,
            updated_at
          ),
          job_applications(
            id,
            status,
            applied_at,
            next_follow_up_at,
            notes,
            created_at,
            updated_at
          )
        `
        )
        .order("discovered_at", { ascending: false })
        .limit(limit);

      if (status && opportunityStatuses.has(status)) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return jsonResponse({ success: true, opportunities: data ?? [] });
    }

    if (action === "update_opportunity_status") {
      if (!opportunityStatuses.has(body.status)) {
        return jsonResponse({ error: "Invalid opportunity status" }, 400);
      }

      const { data, error } = await supabase
        .from("job_opportunities")
        .update({ status: body.status })
        .eq("id", body.opportunityId)
        .select("id, status")
        .single();

      if (error) {
        throw error;
      }

      return jsonResponse({ success: true, opportunity: data });
    }

    if (action === "update_draft") {
      const update: Record<string, string> = {};

      if (typeof body.subject === "string") {
        update.subject = body.subject.slice(0, 140);
      }

      if (typeof body.message === "string") {
        update.message = body.message.slice(0, 1800);
      }

      if (typeof body.linkedinMessage === "string") {
        update.linkedin_message = body.linkedinMessage.slice(0, 1200);
      }

      if (typeof body.emailMessage === "string") {
        update.email_message = body.emailMessage.slice(0, 1800);
      }

      if (typeof body.shortMessage === "string") {
        update.short_message = body.shortMessage.slice(0, 500);
      }

      if (typeof body.applicationMessage === "string") {
        update.application_message = body.applicationMessage.slice(0, 1600);
      }

      if (Object.keys(update).length === 0) {
        return jsonResponse({ error: "No draft fields to update" }, 400);
      }

      const { data, error } = await supabase
        .from("job_outreach_drafts")
        .update(update)
        .eq("id", body.draftId)
        .select("id, status, updated_at")
        .single();

      if (error) {
        throw error;
      }

      return jsonResponse({ success: true, draft: data });
    }

    if (action === "update_draft_status") {
      if (!draftStatuses.has(body.status)) {
        return jsonResponse({ error: "Invalid draft status" }, 400);
      }

      const { data: draft, error: draftError } = await supabase
        .from("job_outreach_drafts")
        .update({ status: body.status })
        .eq("id", body.draftId)
        .select("id, opportunity_id, status")
        .single();

      if (draftError) {
        throw draftError;
      }

      if (body.status === "approved") {
        await supabase
          .from("job_opportunities")
          .update({ status: "approved" })
          .eq("id", draft.opportunity_id);
      }

      if (body.status === "rejected") {
        await supabase
          .from("job_opportunities")
          .update({ status: "rejected" })
          .eq("id", draft.opportunity_id);
      }

      return jsonResponse({ success: true, draft });
    }

    if (action === "create_or_update_application") {
      if (!applicationStatuses.has(body.status)) {
        return jsonResponse({ error: "Invalid application status" }, 400);
      }

      const now = new Date();
      const appliedAt =
        body.status === "sent" || body.status === "follow_up_scheduled"
          ? now.toISOString()
          : body.appliedAt ?? null;
      const nextFollowUpAt =
        body.nextFollowUpAt ??
        (body.status === "sent" ? addDaysIso(now, 3) : null);

      const { data, error } = await supabase
        .from("job_applications")
        .upsert(
          {
            opportunity_id: body.opportunityId,
            draft_id: body.draftId ?? null,
            status: body.status,
            applied_at: appliedAt,
            next_follow_up_at: nextFollowUpAt,
            notes: typeof body.notes === "string" ? body.notes.slice(0, 2000) : null,
          },
          { onConflict: "opportunity_id" }
        )
        .select("id, opportunity_id, status, next_follow_up_at")
        .single();

      if (error) {
        throw error;
      }

      if (body.status === "sent" || body.status === "follow_up_scheduled") {
        await supabase
          .from("job_opportunities")
          .update({ status: body.status === "sent" ? "applied" : "follow_up" })
          .eq("id", body.opportunityId);

        if (body.draftId) {
          await supabase
            .from("job_outreach_drafts")
            .update({ status: "sent" })
            .eq("id", body.draftId);
        }
      }

      return jsonResponse({ success: true, application: data });
    }

    return jsonResponse({ error: "Unknown admin action" }, 400);
  } catch (error) {
    console.error("manage-opportunities error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
