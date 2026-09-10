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

| Script                | Does                                                      |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | Dev server                                                 |
| `npm run build`       | Production build (prerenders all routes)                   |
| `npm run start`       | Serve the production build                                 |
| `npm run lint`        | ESLint                                                     |
| `npm run photos:sync` | Resolve the site's photography from Unsplash (see below)   |

## Environment

| Variable                        | Required | Notes                                                                                   |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | no       | Canonical origin. Defaults to `https://i-mfs.com`. **Change this if the client launches on a different domain** — canonical tags, Open Graph URLs, the sitemap and structured data all derive from it. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no       | GA4 measurement ID (`G-XXXXXXXXXX`). While unset, no analytics script loads and no cookies are set. |
| `RESEND_API_KEY`                | no       | Turns on server-side delivery for the contact form. Without it the form composes the enquiry in the visitor's own email app instead — it never accepts a message it cannot deliver. |
| `CONTACT_FROM_EMAIL`            | no       | Sender address on a domain verified with the provider. Required alongside `RESEND_API_KEY`. |
| `CONTACT_TO_EMAIL`              | no       | Where enquiries land. Defaults to the address published on the site. |
| `UNSPLASH_ACCESS_KEY`           | no       | Build-time only, and only for `npm run photos:sync`. Never bundled, never sent to the browser; deployments do not need it. |

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, site-wide metadata, chrome, schema, GA4
    page.tsx              Homepage
    globals.css           Design tokens (@theme) + base layer + utilities
    opengraph-image.tsx   Build-time OG card (1200×630)
    sitemap.ts robots.ts  Generated /sitemap.xml and /robots.txt
    about/                About the practice
    services/             Services index
    services/[slug]/      One page per service, prerendered from lib/site.ts
    contact/              Contact page, enquiry form and its server action
  components/
    home/                 The eight homepage sections
    site/                 Header (with the services dropdown), footer, page hero
    contact/              The enquiry form
    ui/                   Design-system primitives shared by every page
    seo/                  JSON-LD blocks and the GA4 tag
  lib/
    site.ts               Business facts, nav, the 12 services, value props, FAQs
    service-content.ts    Long-form copy for the twelve service pages
    contact.ts            Enquiry validation and delivery
    us-states.ts          State list for `areaServed` in structured data
    images.ts             Reads the photo manifest into typed, null-safe slots
    photo-manifest.json   Generated — the resolved photos themselves
scripts/
  unsplash-slots.mjs      What each photo slot should show (the editorial brief)
  sync-unsplash.mjs       Resolves that brief against Unsplash, writes the manifest
```

`src/lib/site.ts` is the single source of truth for contact details and the
services list. The header, footer, services grid, sitemap and structured data
all read from it, so a phone number or service name is only ever edited once.

## Design system

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**. The homepage establishes the
tokens, type scale, layout rules, motion behaviour and SEO conventions that
every later page must follow.

## Content the client still needs to supply

Five things are deliberately blank rather than guessed. Each degrades to
something sensible, and each is marked with a comment where it lives:

1. **Testimonials** — `src/components/home/Testimonials.tsx` renders a
   "reviews pending" state because no client reviews have been collected.
   Paste verified quotes into the `testimonials` array and the section switches
   to real quote cards on its own. Do not invent testimonials.
2. **Photography** — the manifest is empty, so the site renders without photos
   (which is a complete design, not a broken one). Run `npm run photos:sync` to
   fill it — see [Photography](#photography) below.
3. **Office hours** — `site.hours` is `null`, so the contact page tells visitors
   to call for current hours. A tax practice keeps different hours in February
   than in July and publishing the wrong ones sends someone to a locked door.
   Fill in the array and the page renders the table instead.
4. **Social profiles** — none supplied. Add them to `site.socials` in
   `src/lib/site.ts` and they appear in the footer and in the `sameAs` property
   of the structured data automatically.
5. **Credentials, staff and fees** — no page claims a CPA or EA licence, names
   a preparer, or quotes a price, because none of that was supplied. An About
   page is the worst place to guess at it. Add real details to `src/lib/site.ts`
   and extend the About page; see the note at the top of
   `src/lib/service-content.ts`.

## Photography

Photos are resolved from Unsplash **once, by a script**, and committed as
static data. The running site never talks to Unsplash: no API key ships to the
browser, no request is made on page load, and a rate limit or an outage at
Unsplash cannot affect the live site.

```bash
UNSPLASH_ACCESS_KEY=your-key npm run photos:sync
```

That reads `scripts/unsplash-slots.mjs` — the editorial brief, one entry per
slot saying what the photo should show — resolves each entry against the
Unsplash API, and writes the results to `src/lib/photo-manifest.json`: real
photo ids, real dimensions, real photographer credits. Commit that file.

There are fifteen slots: the hero backdrop, the About portrait, the closing CTA
backdrop, and one card photo for each of the twelve services.

| Flag            | Does                                                        |
| --------------- | ----------------------------------------------------------- |
| *(none)*        | Fill only the slots that are still empty                     |
| `--force`       | Re-resolve slots that are already filled                     |
| `--only=<key>`  | Work on one slot, e.g. `--only=service/payroll-support`       |
| `--dry-run`     | Show what would change without writing or calling the API     |

Runs are resumable — results are merged into the existing manifest and filled
slots are skipped — which matters because a demo Unsplash application is capped
at 50 requests an hour and a full sync of all fifteen slots spends about thirty.

**Choosing a specific photo.** A search result is a starting point, not a
guarantee; rankings move. Once someone has actually looked at a photo and
approved it, pin it by id in `scripts/unsplash-slots.mjs`:

```js
{ key: "hero-background", pin: "AbCdEf12345", /* … */ }
```

The id is the trailing segment of the photo's page URL.

**Things the script takes care of, which are easy to get wrong by hand:**

- **Attribution.** The Unsplash License requires crediting the photographer.
  Credits are recorded per slot and rendered once, together, in the footer by
  `photoCredits()`. Photographer links carry the UTM parameters Unsplash asks
  for.
- **Download tracking.** Unsplash's API terms require registering a download
  whenever a photo is put to use; the script hits that endpoint for each photo
  it resolves.
- **Blur-up placeholders.** `next/image` cannot derive a `blurDataURL` for a
  remote image it has not fetched, so the script encodes the photo's dominant
  colour as a one-pixel PNG and images fade up out of their own colour.
- **Alt text.** Decorative slots ship with `alt=""` so screen readers skip
  them. The About portrait carries meaning, so the script seeds it with
  Unsplash's own description and flags it (`needsAltReview`) for a human to
  rewrite. **Do that before launch** — a stock caption is not alt text.

**Every slot is optional.** An unfilled slot renders its section exactly as the
photo-free design does — verified: with an empty manifest the services grid
renders pixel-for-pixel identically to the site before photography existed. So
the slots can be filled in over time without the site ever looking half-dressed.

**Self-hosting instead.** Set a slot's `src` to a repo-local path
(`/images/whatever.jpg`) with the file in `public/images/` and nothing else
changes. For a client site this is the more robust option long-term, since it
drops the runtime dependency on Unsplash's CDN.

## Contact form

The enquiry form on `/contact` has one rule behind it, in `src/lib/contact.ts`:
**it never accepts a message it cannot deliver.** A form that says "thank you"
and drops the enquiry is worse than no form — the prospect stops trying and the
firm never learns they existed.

So there are two modes, chosen on the server:

| State | What the form does |
| ----- | ------------------- |
| `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` set | Posts to a server action, which validates and sends. |
| Either missing | Composes the same message in the visitor's own email app. No backend involved, nothing to lose. |

If delivery is configured but then fails, the visitor is told, their message
stays in the form, and they are handed the same mail-client fallback with
everything they typed already in it. The provider error is logged server-side
only — it can quote the API key back, so it never reaches the browser.

`/contact` is statically rendered, so the mode is fixed at build time. Adding
the environment variables to a running host is not enough; redeploy.

Other things worth knowing:

- Validation is deliberately forgiving. Turning away a real enquiry over a
  formatting opinion costs more than accepting an odd one.
- There is a honeypot field for bots, positioned off-screen rather than
  `display: none` (some bots skip hidden inputs) and kept out of the tab order.
  A caught submission is reported back as sent, so a bot learns nothing.
- **There is no rate limiting.** If the form attracts abuse, add it at the edge
  or in the server action — nothing in the app throttles submissions today.
- Swapping Resend for another provider means changing one `fetch` in
  `deliverEnquiry()`. There is no SDK dependency.

## SEO

- Title, meta description, canonical, Open Graph and Twitter tags are set in
  the root layout; per-page overrides go in each page's `metadata` export.
- `ProfessionalService` and `WebSite` JSON-LD ship site-wide; the homepage adds
  `FAQPage` for its accordion.
- `/sitemap.xml` and `/robots.txt` are generated from `src/lib/site.ts`.
- All 22 routes are statically prerendered.
