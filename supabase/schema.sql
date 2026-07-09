-- Run this in the Supabase SQL editor for your project.
-- Enables secure per-user storage with Row Level Security (RLS).

create table if not exists public.user_sync_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  custom_sets jsonb not null default '[]'::jsonb,
  active_set_id text,
  progress_by_set jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_sync_data enable row level security;

-- Users can only read their own row
create policy "Users select own sync data"
  on public.user_sync_data
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can only insert their own row
create policy "Users insert own sync data"
  on public.user_sync_data
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only update their own row
create policy "Users update own sync data"
  on public.user_sync_data
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Optional: index for housekeeping queries
create index if not exists user_sync_data_updated_at_idx
  on public.user_sync_data (updated_at desc);
