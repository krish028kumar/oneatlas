# OneAtlas (Full Stack MVP)
Next.js 14 + TypeScript + Tailwind + Prisma + PostgreSQL. Seed data is MOCK.
1. `npm install`  2. copy `.env.example` to `.env` (use a Neon/Railway Postgres URL)
3. `npx prisma db push && npm run seed`  4. `npm run dev`
API: GET /api/models?q=&lab=&type=&cap=&sort=price|context|date&page= , /api/models/:slug, /api/labs, /api/rankings?category=
Deploy: Vercel (set DATABASE_URL). Pages and APIs share lib/queries.ts.
