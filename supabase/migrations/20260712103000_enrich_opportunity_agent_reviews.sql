alter table public.job_scores
  add column if not exists relevance integer check (relevance between 0 and 100),
  add column if not exists urgency integer check (urgency between 0 and 100),
  add column if not exists budget_potential integer check (budget_potential between 0 and 100),
  add column if not exists response_probability integer check (response_probability between 0 and 100);

alter table public.job_outreach_drafts
  add column if not exists rationale text,
  add column if not exists linkedin_message text,
  add column if not exists email_message text,
  add column if not exists short_message text,
  add column if not exists application_message text,
  add column if not exists follow_up_plan jsonb not null default '[]';
