# Magid Financial Services

Website rebuild for Magid Financial Services — payroll, tax and accounting,
Huntingdon Valley, PA, serving clients in all 50 states since 1989.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

| Script          | Does                                    |
| --------------- | --------------------------------------- |
| `npm run dev`   | Dev server                              |
| `npm run build` | Production build (prerenders all routes) |
| `npm run start` | Serve the production build              |
| `npm run lint`  | ESLint                                  |

## Environment

| Variable                        | Required | Notes                                                                                   |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | no       | Canonical origin. Defaults to `https://i-mfs.com`. **Change this if the client launches on a different domain** — canonical tags, Open Graph URLs, the sitemap and structured data all derive from it. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no       | GA4 measurement ID (`G-XXXXXXXXXX`). While unset, no analytics script loads and no cookies are set. |

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, site-wide metadata, chrome, schema, GA4
    page.tsx              Homepage
    globals.css           Design tokens (@theme) + base layer + utilities
    opengraph-image.tsx   Build-time OG card (1200×630)
    sitemap.ts robots.ts  Generated /sitemap.xml and /robots.txt
    about/ services/ contact/   Placeholder routes (see below)
  components/
    home/                 The eight homepage sections
    site/                 Header, footer, wordmark, floating call button
    ui/                   Design-system primitives shared by every page
    seo/                  JSON-LD blocks and the GA4 tag
  lib/
    site.ts               Business facts, nav, the 12 services, value props, FAQs
    us-states.ts          State list for `areaServed` in structured data
```

`src/lib/site.ts` is the single source of truth for contact details and the
services list. The header, footer, services grid, sitemap and structured data
all read from it, so a phone number or service name is only ever edited once.

## Design system

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**. The homepage establishes the
tokens, type scale, layout rules, motion behaviour and SEO conventions that
every later page must follow.

## Placeholder content to replace

Three things are deliberately unfinished, each marked with a comment in the
code:

1. **Testimonials** — `src/components/home/Testimonials.tsx` renders a
   "reviews pending" state because no client reviews have been collected.
   Paste verified quotes into the `testimonials` array and the section switches
   to real quote cards on its own. Do not invent testimonials.
2. **Routes for pages 2..N** — `/about`, `/services`, `/contact` and the twelve
   `/services/[slug]` pages currently render the `ComingSoon` shell so that no
   homepage link 404s. Replace each as the page is designed, then delete
   `src/components/site/ComingSoon.tsx`.
3. **Photography** — every slot in `src/lib/images.ts` is `null`, so the site
   currently renders without photos (which is a complete design, not a broken
   one). Fill a slot to switch photography on for that section; the file
   documents the shape and both the hotlink and self-hosted options.
4. **Social profiles** — the client has not supplied any. Add them to
   `site.socials` in `src/lib/site.ts` and they appear in the footer and in the
   `sameAs` property of the structured data automatically.

## SEO

- Title, meta description, canonical, Open Graph and Twitter tags are set in
  the root layout; per-page overrides go in each page's `metadata` export.
- `ProfessionalService` and `WebSite` JSON-LD ship site-wide; the homepage adds
  `FAQPage` for its accordion.
- `/sitemap.xml` and `/robots.txt` are generated from `src/lib/site.ts`.
- All 22 routes are statically prerendered.
