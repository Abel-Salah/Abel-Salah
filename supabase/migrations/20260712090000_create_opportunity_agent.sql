create table if not exists public.job_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_type text not null check (source_type in ('google_cse', 'manual', 'api', 'rss')),
  enabled boolean not null default true,
  search_queries text[] not null default '{}',
  include_domains text[] not null default '{}',
  exclude_terms text[] not null default '{}',
  min_score integer not null default 70 check (min_score between 0 and 100),
  daily_limit integer not null default 20 check (daily_limit between 1 and 100),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, source_type)
);

create table if not exists public.job_opportunities (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.job_sources(id) on delete set null,
  source_type text not null default 'manual',
  title text not null,
  company text,
  url text not null unique,
  description text,
  location text,
  remote boolean not null default false,
  published_at timestamptz,
  discovered_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'scored', 'drafted', 'approved', 'rejected', 'applied', 'follow_up', 'closed')),
  raw_payload jsonb not null default '{}'
);

create table if not exists public.job_scores (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.job_opportunities(id) on delete cascade unique,
  score integer not null check (score between 0 and 100),
  fit_summary text not null,
  strengths text[] not null default '{}',
  risks text[] not null default '{}',
  suggested_angle text,
  created_at timestamptz not null default now()
);

create table if not exists public.job_outreach_drafts (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.job_opportunities(id) on delete cascade,
  channel text not null default 'manual' check (channel in ('manual', 'email', 'linkedin', 'platform')),
  subject text,
  message text not null,
  cv_url text,
  profile_url text not null default 'https://abelsalah.fr',
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected', 'sent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (opportunity_id)
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.job_opportunities(id) on delete cascade unique,
  draft_id uuid references public.job_outreach_drafts(id) on delete set null,
  status text not null default 'not_sent' check (status in ('not_sent', 'sent', 'replied', 'follow_up_scheduled', 'closed_won', 'closed_lost')),
  applied_at timestamptz,
  next_follow_up_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_sources_enabled_idx on public.job_sources(enabled, source_type);
create index if not exists job_opportunities_status_idx on public.job_opportunities(status, discovered_at desc);
create index if not exists job_scores_score_idx on public.job_scores(score desc);
create index if not exists job_outreach_drafts_status_idx on public.job_outreach_drafts(status, created_at desc);
create index if not exists job_applications_status_idx on public.job_applications(status, next_follow_up_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_job_sources_updated_at on public.job_sources;
create trigger set_job_sources_updated_at
before update on public.job_sources
for each row execute function public.set_updated_at();

drop trigger if exists set_job_outreach_drafts_updated_at on public.job_outreach_drafts;
create trigger set_job_outreach_drafts_updated_at
before update on public.job_outreach_drafts
for each row execute function public.set_updated_at();

drop trigger if exists set_job_applications_updated_at on public.job_applications;
create trigger set_job_applications_updated_at
before update on public.job_applications
for each row execute function public.set_updated_at();

alter table public.job_sources enable row level security;
alter table public.job_opportunities enable row level security;
alter table public.job_scores enable row level security;
alter table public.job_outreach_drafts enable row level security;
alter table public.job_applications enable row level security;

insert into public.job_sources (
  name,
  source_type,
  search_queries,
  include_domains,
  exclude_terms,
  min_score,
  daily_limit,
  metadata
)
values (
  'Google Search - opportunites IA et automatisation',
  'google_cse',
  array[
    'consultant IA freelance mission automatisation entreprise',
    'mission freelance expert IA PME automatisation',
    'consultant automation IA no-code freelance',
    'formation IA entreprise consultant freelance',
    'audit IA entreprise consultant'
  ],
  array[
    'welcometothejungle.com',
    'linkedin.com/jobs',
    'indeed.com',
    'malt.fr',
    'free-work.com',
    'lesjeudis.com'
  ],
  array[
    'stage',
    'alternance',
    'junior',
    'non remunere',
    'bénévole',
    'benevole'
  ],
  70,
  20,
  '{"notes": "Source initiale semi-automatique. Les brouillons restent a valider humainement avant toute candidature."}'::jsonb
)
on conflict (name, source_type) do nothing;
