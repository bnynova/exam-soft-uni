# Recipe Share

Capstone project for "Software Technologies with AI" (SoftUni AI).

## Project description
_TODO: 2-4 sentences — what the app does, who can do what (visitor / registered
user / admin)._

## Architecture
- **Frontend:** Vite (multi-page), vanilla JavaScript, Bootstrap 5.
- **Backend:** Supabase — Postgres DB, Auth (JWT), Storage.
- **Communication:** frontend talks to Supabase directly via the
  `@supabase/supabase-js` client (REST API under the hood).

## Database schema
_TODO: paste/embed an ER diagram here once the schema is final (e.g. export
from Supabase's Table Editor, or draw with dbdiagram.io / Mermaid)._

Tables: `profiles`, `categories`, `recipes`, `comments`, `favorites`.
See `supabase/migrations/` for the full schema and RLS policies.

## Local development setup
1. `npm install`
2. Create a Supabase project at https://supabase.com
3. In the Supabase SQL editor, run the migrations in `supabase/migrations/`
   in order (or link the project with the Supabase CLI and `supabase db push`).
4. Copy `.env.example` to `.env` and fill in your project URL + anon key.
5. Create two Storage buckets in Supabase: `recipe-images` and `avatars`
   (public read).
6. `npm run dev` and open the printed local URL.

## Key folders
- `pages/` — HTML entry per screen (login, register, recipe detail, etc.)
- `src/pages/` — JS logic for each screen, matched 1:1 with `pages/*.html`
- `src/services/` — all Supabase access (auth, recipes, comments, favorites, storage)
- `src/components/` — reusable UI pieces (navbar, recipe card, comment list)
- `src/utils/` — small helpers (toasts, auth guards, formatting)
- `supabase/migrations/` — versioned SQL schema + RLS policies

## Demo credentials
_TODO: fill in once seeded, e.g. demo@example.com / demo123_

## Live URL
_TODO: Netlify/Vercel link_
