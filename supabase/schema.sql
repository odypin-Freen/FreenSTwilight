-- FREEN fan page: private, review-before-publish community posts.
create extension if not exists pgcrypto;

create table if not exists public.community_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_community_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (select 1 from public.community_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_community_admin() from public, anon;
grant execute on function public.is_community_admin() to authenticated;

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null default 'Anonymous fan' check (char_length(display_name) between 1 and 40),
  message text not null check (char_length(message) between 2 and 500),
  image_path text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);
create index if not exists community_posts_public_feed_idx on public.community_posts (created_at desc) where status = 'approved';
create index if not exists community_posts_review_queue_idx on public.community_posts (created_at asc) where status = 'pending';

alter table public.community_posts enable row level security;
alter table public.community_admins enable row level security;
revoke all on public.community_posts from anon, authenticated;
grant select on public.community_posts to authenticated;
grant update (status, reviewed_at, reviewed_by) on public.community_posts to authenticated;
create policy "Admins can read submissions" on public.community_posts
  for select to authenticated using (public.is_community_admin());
create policy "Admins can review submissions" on public.community_posts
  for update to authenticated using (public.is_community_admin()) with check (public.is_community_admin());
revoke all on public.community_admins from anon, authenticated;

-- All uploads remain private. Public visitors only receive short-lived URLs for approved rows.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community-pending', 'community-pending', false, 6291456, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = false, file_size_limit = 6291456, allowed_mime_types = array['image/jpeg','image/png','image/webp'];
create policy "Admins can view submission photos" on storage.objects
  for select to authenticated using (bucket_id = 'community-pending' and public.is_community_admin());
create policy "Admins can remove rejected photos" on storage.objects
  for delete to authenticated using (bucket_id = 'community-pending' and public.is_community_admin());

-- Atomic per-IP hash rate limit. Only the Edge Function service role can call this RPC.
create table if not exists public.community_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null,
  submission_count integer not null
);
revoke all on public.community_rate_limits from public, anon, authenticated;
create or replace function public.consume_community_rate_limit(p_key_hash text)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare v_count integer;
begin
  delete from public.community_rate_limits where window_started_at < now() - interval '1 day';
  insert into public.community_rate_limits (key_hash, window_started_at, submission_count)
  values (p_key_hash, now(), 1)
  on conflict (key_hash) do update set
    window_started_at = case when public.community_rate_limits.window_started_at <= now() - interval '1 hour' then now() else public.community_rate_limits.window_started_at end,
    submission_count = case when public.community_rate_limits.window_started_at <= now() - interval '1 hour' then 1 else public.community_rate_limits.submission_count + 1 end
  returning submission_count into v_count;
  return v_count <= 5;
end;
$$;
revoke all on function public.consume_community_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_community_rate_limit(text) to service_role;
