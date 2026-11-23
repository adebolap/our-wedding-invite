# Our Wedding Invite

A celebration site for **Kelly & Seun**, with a guest photo album backed by Postgres.

## Customize

Edit [`src/site.config.ts`](src/site.config.ts) to set:

- Partner names and monogram
- Date, time, venue, and map link
- Story copy, schedule, dress code
- Images under `public/`
- Guest share QR target (`share.publicUrl`)

## Guest photo album

Guests can scan the Share QR code or open `#share` to upload photos.

- Schema: `migrations/001_guest_photos.sql`
- API: `GET/POST /api/photos`, `GET /api/photos/:id`
- Locally the API uses in-memory PGlite (no setup)
- On Vercel, connect the Neon integration so `DATABASE_URL` (and ideally `DATABASE_URL_UNPOOLED`) are set for Production and Preview
- Migrations run automatically during `npm run build`

## Develop

```bash
npm install
npm run dev
```

This starts Vite and the guest-photo API together.

## Build

```bash
npm run build
npm run preview
```

Built with Vite + React + TypeScript + Hono + Postgres.
