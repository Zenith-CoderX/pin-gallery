-- 1) Users (custom auth)
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);
alter table public.users enable row level security;
-- No policies on purpose: only the service-role key (server) can access it.

-- 2) Images
create table public.images (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  path text not null,
  created_at timestamptz not null default now()
);
alter table public.images enable row level security;

-- 3) Private storage bucket (images are served with signed URLs)
insert into storage.buckets (id, name, public) values ('images', 'images', false)
on conflict (id) do nothing;

-- 4) After you sign up, make yourself admin:
-- update public.users set role = 'admin' where email = 'you@example.com';
