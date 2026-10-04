-- =============================================================================
-- Migration: 0001_initial_schema.sql
-- Description: Initial schema for Prototype Asisten AI Tunanetra
--
-- Tables: user_settings, conversations, messages, usage_events
-- All user-owned tables have Row Level Security (RLS) enabled per constitution.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- user_settings
-- One row per authenticated user.  Created on first login / settings save.
-- ---------------------------------------------------------------------------
create table if not exists public.user_settings (
  user_id       uuid        not null references auth.users(id) on delete cascade,
  speech_rate   numeric     not null default 1.0 check (speech_rate between 0.1 and 10),
  font_scale    numeric     not null default 1.0 check (font_scale  between 0.5 and 4),
  high_contrast boolean     not null default false,
  auto_speak    boolean     not null default false,
  platform      text,
  screen_reader text,
  updated_at    timestamptz not null default now(),
  constraint user_settings_pkey primary key (user_id)
);

alter table public.user_settings enable row level security;

-- Users may only read their own settings.
create policy "user_settings: owner select"
  on public.user_settings
  for select
  using (auth.uid() = user_id);

-- Users may insert their own settings row.
create policy "user_settings: owner insert"
  on public.user_settings
  for insert
  with check (auth.uid() = user_id);

-- Users may update their own settings row.
create policy "user_settings: owner update"
  on public.user_settings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- conversations
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id         uuid        not null default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  title      text        not null default '',
  created_at timestamptz not null default now(),
  constraint conversations_pkey primary key (id)
);

create index if not exists conversations_user_id_idx on public.conversations (user_id, created_at desc);

alter table public.conversations enable row level security;

create policy "conversations: owner select"
  on public.conversations
  for select
  using (auth.uid() = user_id);

create policy "conversations: owner insert"
  on public.conversations
  for insert
  with check (auth.uid() = user_id);

create policy "conversations: owner update"
  on public.conversations
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "conversations: owner delete"
  on public.conversations
  for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- messages
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id              uuid        not null default gen_random_uuid(),
  conversation_id uuid        not null references public.conversations(id) on delete cascade,
  user_id         uuid        not null references auth.users(id) on delete cascade,
  role            text        not null check (role in ('user', 'assistant')),
  content         text        not null,
  created_at      timestamptz not null default now(),
  constraint messages_pkey primary key (id)
);

create index if not exists messages_conversation_id_idx on public.messages (conversation_id, created_at asc);
create index if not exists messages_user_id_idx         on public.messages (user_id);

alter table public.messages enable row level security;

-- A user may only read messages that belong to their own conversations.
create policy "messages: owner select"
  on public.messages
  for select
  using (auth.uid() = user_id);

create policy "messages: owner insert"
  on public.messages
  for insert
  with check (auth.uid() = user_id);

create policy "messages: owner delete"
  on public.messages
  for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- usage_events
-- Append-only log for rate-limiting checks and analytics.
-- ---------------------------------------------------------------------------
create table if not exists public.usage_events (
  id         uuid        not null default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  kind       text        not null,  -- e.g. 'ai_request', 'image_upload'
  created_at timestamptz not null default now(),
  constraint usage_events_pkey primary key (id)
);

create index if not exists usage_events_user_id_created_at_idx
  on public.usage_events (user_id, created_at desc);

alter table public.usage_events enable row level security;

create policy "usage_events: owner select"
  on public.usage_events
  for select
  using (auth.uid() = user_id);

create policy "usage_events: owner insert"
  on public.usage_events
  for insert
  with check (auth.uid() = user_id);

-- usage_events are immutable once written; no update/delete policies.
