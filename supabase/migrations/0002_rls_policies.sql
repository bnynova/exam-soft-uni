-- 0002_rls_policies.sql
-- Enable Row-Level Security and define access policies for every table.
-- Rule of thumb: public read where content is meant to be browsable,
-- writes restricted to the owner, admins get full access via role check.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.recipes enable row level security;
alter table public.comments enable row level security;
alter table public.favorites enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles: everyone can read (needed to show usernames/avatars),
-- a user can only update their own row, admins can update any.
create policy "profiles_select_all" on public.profiles
  for select using (true);

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- categories: public read, only admins manage them.
create policy "categories_select_all" on public.categories
  for select using (true);

create policy "categories_write_admin" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- recipes: public read, owner writes their own, admin can moderate any.
create policy "recipes_select_all" on public.recipes
  for select using (true);

create policy "recipes_insert_own" on public.recipes
  for insert with check (auth.uid() = user_id);

create policy "recipes_update_own_or_admin" on public.recipes
  for update using (auth.uid() = user_id or public.is_admin());

create policy "recipes_delete_own_or_admin" on public.recipes
  for delete using (auth.uid() = user_id or public.is_admin());

-- comments: public read, owner writes their own, owner or admin deletes.
create policy "comments_select_all" on public.comments
  for select using (true);

create policy "comments_insert_own" on public.comments
  for insert with check (auth.uid() = user_id);

create policy "comments_delete_own_or_admin" on public.comments
  for delete using (auth.uid() = user_id or public.is_admin());

-- favorites: a user can only see/add/remove their own favorites.
create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);

create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);
