create table if not exists profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  name text not null,
  slug text unique,
  created_at timestamptz default now()
);

create table if not exists business_profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  business_name text not null,
  business_type text not null,
  what_you_sell text not null,
  target_audience text not null,
  customer_pains text not null,
  faqs text not null,
  tone text,
  goals text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists content_pillars (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  description text not null,
  created_at timestamptz default now()
);

create table if not exists content_ideas (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  hook text,
  format text,
  angle text,
  created_at timestamptz default now()
);

create table if not exists weekly_plans (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  week_start date,
  plan_json jsonb not null,
  created_at timestamptz default now()
);

-- =====================================================================
-- Row Level Security
-- =====================================================================
-- Without RLS the public anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY, shipped to
-- the browser) can read/write every row in every table. Enable RLS on all
-- tables and scope access to the authenticated owner via auth.uid().
-- Run this whole file against the Supabase SQL editor.

alter table profiles          enable row level security;
alter table workspaces        enable row level security;
alter table business_profiles enable row level security;
alter table content_pillars   enable row level security;
alter table content_ideas     enable row level security;
alter table weekly_plans      enable row level security;

-- profiles: a user may only see and manage their own profile row.
drop policy if exists "profiles_self" on profiles;
create policy "profiles_self" on profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

-- workspaces: only the owner.
drop policy if exists "workspaces_owner" on workspaces;
create policy "workspaces_owner" on workspaces
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Helper predicate reused by all workspace-scoped child tables:
-- the row's workspace must be owned by the current user.
drop policy if exists "business_profiles_owner" on business_profiles;
create policy "business_profiles_owner" on business_profiles
  for all
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()))
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));

drop policy if exists "content_pillars_owner" on content_pillars;
create policy "content_pillars_owner" on content_pillars
  for all
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()))
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));

drop policy if exists "content_ideas_owner" on content_ideas;
create policy "content_ideas_owner" on content_ideas
  for all
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()))
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));

drop policy if exists "weekly_plans_owner" on weekly_plans;
create policy "weekly_plans_owner" on weekly_plans
  for all
  using (workspace_id in (select id from workspaces where owner_id = auth.uid()))
  with check (workspace_id in (select id from workspaces where owner_id = auth.uid()));
