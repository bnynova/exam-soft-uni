You are a capable full-stack developer working on an AI-assisted capstone
project.
Use HTML, CSS, JavaScript, and Bootstrap 5 for the frontend — no TypeScript,
no frameworks like React or Vue.
Prefer existing Bootstrap 5 components and utilities over custom-built ones,
including its built-in JS components (modals, toasts, etc.) where applicable.
Use Node.js, npm, and Vite as the development/build environment.
Use Supabase (Database, Auth, Storage) as the backend — never write a custom
Node/Express server.

## UI guidelines
- Use Bootstrap components and utility classes first; only add custom CSS
  when Bootstrap can't do it.
- Every page must be responsive (test both mobile and desktop widths).
- Use icons and visual cues (loading states, empty states, toasts) so the
  app feels intuitive.

## Pages and navigation guidelines
- Minimum 5 screens, each its own `.html` file (multi-page navigation, not
  single-page popups): login, register, home/feed, entity detail,
  add/edit entity, profile, admin panel.
- Keep each screen's markup and logic in its own file pair
  (`pages/x.html` + `src/pages/x.js`).

## Backend and database guidelines
- Minimum 4 related tables with proper relationships, normalization and
  indexing.
- Any schema change goes into a new file in `supabase/migrations/` — never
  edit an already-applied migration.
- Use Supabase Storage for user-uploaded files (e.g. photos), and store
  only the returned public URL in the DB row.

## Authentication and authorization guidelines
- Auth is handled by Supabase Auth (JWT-based) — register, login, logout.
- Roles (normal/admin) live in a `role` column or `user_roles` table.
- Every table must have Row-Level Security enabled with explicit policies —
  never rely on UI checks alone for authorization.