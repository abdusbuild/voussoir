# Voussoir — Next.js site

Built from the Voussoir company profile brochure (architecture · interior ·
design practice, Noida). Next.js 16 (App Router), TypeScript, Tailwind v4.

## What's done

- Full page set: Home, Practice, Process, Projects (filterable
  grid + detail pages), Team, Contact.
- Design system in `src/app/globals.css`: paper/ink/accent color tokens,
  display + label font variables, a single low-opacity procedural grain
  background (no scanned texture image) applied once to the page background.
- Shared layout primitives: `Header`, `Footer`, `SectionHeader`,
  `CategoryStrip`, `Logo` (see note below), `Visual`
  (image-with-placeholder-fallback).
- All copy pulled directly from the source brochure PDF; project/team/values/
  process/discipline data lives in `src/data/*.ts` as plain TypeScript —
  edit those files to change content, no CMS wired up (per your call on scope).

## What still needs real assets before this is launch-ready

1. **Fonts.** Two families load via `next/font/google` in
   `src/app/layout.tsx`: Newsreader (`--font-serif`, headings) and Hanken
   Grotesk (`--font-sans`, everything else). The h1/h2/h3 type scale lives
   in `globals.css`; Tailwind's `font-serif` / `font-sans` utilities read the
   same two CSS variables.
2. **Logo.** The arch mark in the header/footer and the favicon are cropped
   from `public/brand/logo-voussoir.jpeg` (a JPEG on a black background) into
   `public/brand/logo-mark.png`, `src/app/icon.png` and `src/app/apple-icon.png`.
   The "VOUSSOIR" wordmark beside it is still live text. A transparent PNG or
   SVG of the logo would let the mark sit directly on the paper background.
3. **Photography.** Every image on the site (`Visual` component) falls back
   to a labeled placeholder because there's no real photography in
   `/public` yet. Drop files in at the exact paths already referenced in
   `src/data/projects.ts` / `src/data/team.ts` (e.g.
   `/public/projects/vana-1.jpg`) and they'll render automatically — zero
   code changes required. Do this before showing the client.
4. **Contact form.** Wired to a Server Action that validates on client and
   server and sends through Resend. Before launch, verify voussoir.in in Resend
   and set the variables in `.env.example`. Without them, dev only logs
   enquiries and production shows an "email us instead" error.

## Why the paper texture is subtle, not literal

The brochure uses paper grain as a quiet wash under a controlled palette,
not a texture on every component. A tiled scanned-paper image behind cards,
buttons, and forms will kill contrast and load slowly. This build uses one
small procedural SVG noise layer at low opacity on the page background only
— photography, cards, and text all sit on clean surfaces. If you want it
heavier, turn up `opacity` in the `body::before` rule in `globals.css`, but
test contrast on mobile before you do.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
```
