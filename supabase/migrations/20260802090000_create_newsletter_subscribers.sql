create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  subscribed_at timestamptz not null default now(),
  welcome_sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Public signup is intentionally insert-only. No public read/update/delete policy.
drop policy if exists "Public newsletter signup" on public.newsletter_subscribers;
create policy "Public newsletter signup"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (
    length(trim(email)) between 5 and 320
    and position('@' in trim(email)) > 1
    and status = 'subscribed'
  );

revoke all on public.newsletter_subscribers from anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
