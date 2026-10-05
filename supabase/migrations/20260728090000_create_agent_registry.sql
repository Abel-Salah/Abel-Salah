create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  mission text not null,
  description text not null,
  schedule text not null default 'manual',
  autonomy_level text not null default 'analysis_only'
    check (autonomy_level in ('analysis_only', 'prepare_for_review', 'execute_reversible')),
  requires_human_approval boolean not null default true,
  enabled boolean not null default true,
  last_run_at timestamptz,
  next_run_at timestamptz,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  status text not null default 'running'
    check (status in ('running', 'succeeded', 'failed', 'partial')),
  trigger_type text not null default 'manual'
    check (trigger_type in ('manual', 'cron', 'orchestrator', 'webhook')),
  input jsonb not null default '{}',
  output jsonb not null default '{}',
  error text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  run_id uuid references public.agent_runs(id) on delete set null,
  task_type text not null,
  title text not null,
  priority integer not null default 50 check (priority between 0 and 100),
  status text not null default 'queued'
    check (status in ('queued', 'in_progress', 'pending_review', 'completed', 'dismissed', 'blocked')),
  requires_human_approval boolean not null default true,
  input jsonb not null default '{}',
  output jsonb not null default '{}',
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agents_enabled_schedule_idx on public.agents(enabled, next_run_at);
create index if not exists agent_runs_agent_started_idx on public.agent_runs(agent_id, started_at desc);
create index if not exists agent_tasks_queue_idx on public.agent_tasks(status, priority desc, created_at);

drop trigger if exists set_agents_updated_at on public.agents;
create trigger set_agents_updated_at before update on public.agents
for each row execute function public.set_updated_at();

drop trigger if exists set_agent_tasks_updated_at on public.agent_tasks;
create trigger set_agent_tasks_updated_at before update on public.agent_tasks
for each row execute function public.set_updated_at();

alter table public.agents enable row level security;
alter table public.agent_runs enable row level security;
alter table public.agent_tasks enable row level security;

insert into public.agents (slug, name, mission, description, schedule, autonomy_level, requires_human_approval, metadata)
values
  ('atlas', 'Atlas', 'Orchestration générale', 'Coordonne les agents, crée les tâches et surveille les résultats.', 'daily 07:00 Europe/Paris', 'execute_reversible', true, '{"role":"orchestrator"}'::jsonb),
  ('nova', 'Nova', 'Prospection et nouvelles collaborations', 'Détecte missions, partenaires, prescripteurs et opportunités commerciales.', 'daily 07:10 Europe/Paris', 'prepare_for_review', true, '{"role":"business_development"}'::jsonb),
  ('cleo', 'Cléo', 'SEO Google', 'Analyse Search Console, indexation, requêtes, CTR et pages à optimiser.', 'daily 07:30 Europe/Paris', 'prepare_for_review', true, '{"role":"seo_google","connector":"search_console"}'::jsonb),
  ('iris', 'Iris', 'SEO IA et visibilité LLM', 'Suit la présence de la marque dans les moteurs IA et propose des actions d’autorité.', 'weekly monday 08:00 Europe/Paris', 'prepare_for_review', true, '{"role":"seo_llm","connector":"llm_visibility_checks"}'::jsonb),
  ('plume', 'Plume', 'Contenu SEO', 'Propose et prépare des contenus sans publication automatique.', 'weekly tuesday 09:00 Europe/Paris', 'prepare_for_review', true, '{"role":"content"}'::jsonb)
on conflict (slug) do update set
  name = excluded.name,
  mission = excluded.mission,
  description = excluded.description,
  schedule = excluded.schedule,
  metadata = excluded.metadata,
  updated_at = now();
