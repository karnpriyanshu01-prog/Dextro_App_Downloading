-- Dextro Play — Supabase schema
-- Run this in the Supabase SQL editor for a fresh project.
-- Wire lib/releases.ts, lib/faqs.ts, and the guides system to these tables
-- once you have a live project (see the TODO comments in lib/releases.ts).

create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────
-- app_releases
-- ─────────────────────────────────────────────
create table if not exists app_releases (
  id uuid primary key default uuid_generate_v4(),
  version text not null,
  version_code integer not null,
  file_url text not null,
  file_size bigint not null,
  sha256 text not null,
  min_android_version text not null,
  release_date date not null,
  release_notes jsonb not null default '{"added": [], "improved": [], "fixed": []}'::jsonb,
  is_latest boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- Only one row may be is_latest = true at a time.
create unique index if not exists one_latest_release
  on app_releases (is_latest)
  where is_latest;

alter table app_releases enable row level security;

-- Public can read only published releases.
create policy "Public can read published releases"
  on app_releases for select
  using (is_published = true);

-- Only authenticated admins (see admin_users below, or a custom claim) may write.
create policy "Admins can manage releases"
  on app_releases for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- articles (guides / blog)
-- ─────────────────────────────────────────────
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text,
  meta_title text,
  meta_description text,
  published boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table articles enable row level security;

create policy "Public can read published articles"
  on articles for select
  using (published = true);

create policy "Admins can manage articles"
  on articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- faqs
-- ─────────────────────────────────────────────
create table if not exists faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

alter table faqs enable row level security;

create policy "Public can read published faqs"
  on faqs for select
  using (published = true);

create policy "Admins can manage faqs"
  on faqs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- download_events (minimal analytics — no unnecessary personal data)
-- ─────────────────────────────────────────────
create table if not exists download_events (
  id uuid primary key default uuid_generate_v4(),
  release_id uuid references app_releases(id) on delete set null,
  mirror_id text,
  created_at timestamptz not null default now()
);

alter table download_events enable row level security;

-- Inserts happen from a trusted server route (service role), which
-- bypasses RLS entirely — this policy is only for the admin dashboard's
-- own "Total Downloads" count, read via the logged-in admin's normal
-- session (not service role), so it needs explicit SELECT access.
create policy "Admins can read download events"
  on download_events for select
  using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- app_screenshots
-- ─────────────────────────────────────────────
create table if not exists app_screenshots (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table app_screenshots enable row level security;

create policy "Public can read published screenshots"
  on app_screenshots for select
  using (is_published = true);

create policy "Admins can manage screenshots"
  on app_screenshots for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket the admin panel uploads screenshot images into. Public so
-- the images can be shown on the site without extra signed-URL plumbing.
insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', true)
on conflict (id) do nothing;

create policy "Public can view screenshot files"
  on storage.objects for select
  using (bucket_id = 'screenshots');

create policy "Admins can upload screenshot files"
  on storage.objects for insert
  with check (bucket_id = 'screenshots' and auth.role() = 'authenticated');

create policy "Admins can update screenshot files"
  on storage.objects for update
  using (bucket_id = 'screenshots' and auth.role() = 'authenticated');

create policy "Admins can delete screenshot files"
  on storage.objects for delete
  using (bucket_id = 'screenshots' and auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- site_settings
-- Simple key/value store for site-wide settings editable from the admin
-- panel without a redeploy (e.g. the floating WhatsApp channel link).
-- ─────────────────────────────────────────────
create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

-- Public can read settings (needed to render the WhatsApp icon etc. on the
-- public site).
create policy "Public can read site settings"
  on site_settings for select
  using (true);

-- Only authenticated admins may write.
create policy "Admins can manage site settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed row for the floating WhatsApp channel button. Change the value here
-- or from Admin → Settings after deploying.
insert into site_settings (key, value)
values ('whatsapp_channel_link', 'https://whatsapp.com/channel/0029VbDHBnFADTOD6fejmv0l')
on conflict (key) do nothing;

-- ─────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Inserts happen from the /api/contact server route (service role) after
-- validation — no public insert/select policy is defined here.
