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
