# Pin Gallery (Next.js 16 + Supabase)

Pinterest-style masonry gallery. Login required to view; only admins can upload/delete.

## Setup
1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in all three values
   (`SESSION_SECRET` from `openssl rand -base64 32`; Supabase URL and service-role key from Project Settings, API).
3. Supabase, SQL editor: run `supabase/schema.sql` (creates `users`, `images` and a private `images` bucket).
4. `npm run dev`, open http://localhost:3000, sign up.


## Notes
- Custom auth: bcrypt + JWT in an HTTP-only cookie (jose). Supabase is only DB and storage.
- Access is checked in three places: proxy, page (DAL), Server Actions.
- Bucket is private; images are served via 1-hour signed URLs.
- On Next.js 15 or older, rename `src/proxy.js` to `src/middleware.js` and the function `proxy` to `middleware`.
