-- 0001_init_schema.sql
-- Core tables for the Recipe Share app.

create extension if not exists "uuid-ossp";

-- Extends auth.users with app-specific profile data + role.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id serial primary key,
  name text not null unique
);

create table if not exists public.recipes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category_id integer references public.categories(id) on delete set null,
  title text not null,
  description text,
  ingredients text not null,
  instructions text not null,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

-- Indexes for common lookups/joins.
create index if not exists idx_recipes_user_id on public.recipes(user_id);
create index if not exists idx_recipes_category_id on public.recipes(category_id);
create index if not exists idx_comments_recipe_id on public.comments(recipe_id);
create index if not exists idx_favorites_recipe_id on public.favorites(recipe_id);

-- Seed a few categories to start with.
insert into public.categories (name) values
  ('Breakfast'), ('Main course'), ('Dessert'), ('Soup'), ('Salad'), ('Drink')
on conflict (name) do nothing;
