-- Run this in your Supabase project → SQL Editor

-- ── User profiles ────────────────────────────────────────────
-- user_id is a foreign key to auth.users.id (Supabase Auth)
-- display_name = first name + last name, set on sign-up
create table if not exists users (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  display_name text not null,
  created_at   timestamptz default now()
);

alter table users enable row level security;

create policy "Users can read their own profile"
  on users for select
  using (user_id = auth.uid());

create policy "Users can insert their own profile"
  on users for insert
  with check (user_id = auth.uid());

create policy "Users can update their own profile"
  on users for update
  using (user_id = auth.uid());

create policy "Users can delete their own profile"
  on users for delete
  using (user_id = auth.uid());

-- ── Trigger: auto-create profile on sign-up ──────────────────
-- Fires after a new row is inserted into auth.users.
-- Reads display_name from user_metadata (passed in signUp options).
-- Uses SECURITY DEFINER so it bypasses RLS — safe because it only
-- ever inserts a row keyed to the newly created auth user's own id.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (user_id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── Notes ────────────────────────────────────────────────────
create table if not exists notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  quote       text,
  mood        text,
  text        text,
  shared      boolean not null default true,
  likes       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for fast user note lookups and community feed queries
create index if not exists notes_user_id_idx   on notes (user_id);
create index if not exists notes_shared_idx    on notes (shared, created_at desc);

alter table notes enable row level security;

-- Community feed: anyone (including logged-out) can read shared notes
create policy "Anyone can read shared notes"
  on notes for select
  using (shared = true);

-- Authenticated users can read all of their own notes (shared or not)
create policy "Users can read their own notes"
  on notes for select
  using (auth.uid() = user_id);

-- Authenticated users can create notes
create policy "Users can insert their own notes"
  on notes for insert
  with check (auth.uid() = user_id);

-- Authenticated users can edit their own notes
create policy "Users can update their own notes"
  on notes for update
  using (auth.uid() = user_id);

-- Authenticated users can delete their own notes
create policy "Users can delete their own notes"
  on notes for delete
  using (auth.uid() = user_id);

-- ── Like function ─────────────────────────────────────────────
-- Safely increments the like count for any shared note.
-- Uses SECURITY DEFINER so it bypasses RLS (anyone can like),
-- but it only ever increments — it cannot overwrite other fields.
create or replace function increment_note_like(note_id uuid)
returns void
language sql
security definer set search_path = public
as $$
  update notes set likes = likes + 1 where id = note_id and shared = true;
$$;

-- ── Auto-update updated_at ────────────────────────────────────
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger notes_updated_at
  before update on notes
  for each row execute procedure update_updated_at();

-- Enable real-time for community feed
alter publication supabase_realtime add table notes;
