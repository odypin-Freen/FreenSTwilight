-- Store submitter email privately for admin moderation records.
-- Existing submissions remain NULL because their email was not collected.
alter table public.community_posts
  add column if not exists email text;

alter table public.community_posts
  drop constraint if exists community_posts_email_length_check;

alter table public.community_posts
  add constraint community_posts_email_length_check
  check (email is null or char_length(email) between 3 and 254);

comment on column public.community_posts.email is
  'Private submitter contact email; readable only to authenticated community admins.';
