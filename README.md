# Our Wedding Invite

A single-page wedding invitation site for **Kelly & Seun**.

## Customize

Edit [`src/site.config.ts`](src/site.config.ts) to set:

- Partner names and monogram
- Date, time, venue, and map link
- Story copy, schedule, dress code
- Hero / section images under `public/`
- Optional RSVP endpoint (`rsvp.endpoint`) for Formspree, Getform, etc.

Until an endpoint is set, the RSVP form shows a local success message only.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Built with Vite + React + TypeScript.
