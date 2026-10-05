import { supabase } from "@/integrations/supabase/client";

export type OpportunityScore = {
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

export type OpportunityDraft = {
  id: string;
  subject: string | null;
  rationale: string | null;
  message: string;
  linkedin_message: string | null;
  email_message: string | null;
  short_message: string | null;
  application_message: string | null;
  follow_up_plan: Array<{ delay_days: number; message: string }>;
  cv_url: string | null;
  profile_url: string;
  status: string;
};

export type OpportunityApplication = {
  id: string;
  status: string;
  applied_at: string | null;
  next_follow_up_at: string | null;
  notes: string | null;
};

export type Opportunity = {
  id: string;
  title: string;
  company: string | null;
  url: string;
  description: string | null;
  location: string | null;
  remote: boolean;
  discovered_at: string;
  status: string;
  job_scores: OpportunityScore[];
  job_outreach_drafts: OpportunityDraft[];
  job_applications: OpportunityApplication[];
};

type AdminActionBody = Record<string, unknown>;

async function callOpportunityAdmin<T>(
  token: string,
  body: AdminActionBody
): Promise<T | null> {
  const { data, error } = await supabase.functions.invoke<T>(
    "manage-opportunities",
    {
      body,
      headers: {
        "x-opportunity-admin-token": token,
      },
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function listOpportunities(
  token: string,
  status: string
): Promise<Opportunity[]> {
  const data = await callOpportunityAdmin<{ opportunities: Opportunity[] }>(token, {
    action: "list",
    status: status === "all" ? undefined : status,
    limit: 80,
  });

  return data?.opportunities ?? [];
}

export function updateOpportunityDraftText(
  token: string,
  draftId: string,
  message: string
) {
  return callOpportunityAdmin(token, {
    action: "update_draft",
    draftId,
    message,
    linkedinMessage: message,
  });
}

export function updateOpportunityDraftStatus(
  token: string,
  draftId: string,
  status: "approved" | "rejected"
) {
  return callOpportunityAdmin(token, {
    action: "update_draft_status",
    draftId,
    status,
  });
}

export function createOrUpdateOpportunityApplication(
  token: string,
  opportunityId: string,
  draftId: string
) {
  return callOpportunityAdmin(token, {
    action: "create_or_update_application",
    opportunityId,
    draftId,
    status: "sent",
    notes: "Marque envoye depuis le dashboard admin.",
  });
}
