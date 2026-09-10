# Magid Financial Services — Design System

The homepage establishes this system. **Every subsequent page must consume
these tokens and primitives rather than re-inventing them**, so the site reads
as one thing.

Tokens live in `src/app/globals.css` under `@theme`. Business facts live in
`src/lib/site.ts`. Nothing in either file should be duplicated inline.

---

## 1. Color

Defined as Tailwind theme tokens — use `bg-navy-900`, `text-gold-500`, etc.
Never hard-code a hex value in a component.

### Surfaces (deep navy ramp)

| Token       | Hex       | Use                                                     |
| ----------- | --------- | ------------------------------------------------------- |
| `navy-950`  | `#060a12` | Footer, trust bar, closing CTA — the deepest band        |
| `navy-900`  | `#0a0f1a` | **Base page background.** The brand's default ground     |
| `navy-850`  | `#0e1524` | Raised section band, service cards, stat cells           |
| `navy-800`  | `#131c2e` | Card hover state                                         |
| `navy-700`  | `#1b2739` | Elevated surfaces                                        |
| `navy-600`  | `#253349` | Heavier dividers                                         |

### Accent (gold)

| Token      | Hex       | Use                                                      |
| ---------- | --------- | -------------------------------------------------------- |
| `gold-300` | `#efdda6` | Link hover on gold text                                   |
| `gold-400` | `#e2c877` | Hover state on the primary button; hero tagline; headings |
| `gold-500` | `#c9a84c` | **Primary accent.** Buttons, rules, eyebrows, icons       |
| `gold-600` | `#a8873a` | Pressed / low-emphasis gold                               |
| `gold-700` | `#856a2b` | Reserved                                                  |

### Ink (text on dark)

| Token     | Hex       | Use                                     |
| --------- | --------- | --------------------------------------- |
| `ink-50`  | `#f6f8fb` | Headings                                |
| `ink-200` | `#ccd5e2` | High-emphasis body, nav links           |
| `ink-300` | `#a4b0c2` | **Default body copy**                   |
| `ink-400` | `#7b8799` | Captions, card descriptions, footer meta |

### Rules of use

- Gold is punctuation, not paint. Roughly one gold element per view: a rule, an
  eyebrow, one solid button. If a screen has two gold buttons competing, one of
  them is wrong.
- Borders are hairlines: `hairline`, `hairline-t`, `hairline-b` utilities, or
  `border-white/8`. Never a heavy or light-colored border.
- Section banding alternates `navy-900` and `navy-850` (via `Section`'s `tone`),
  with `navy-950` reserved for the trust bar, closing CTA, and footer.

---

## 2. Typography

| Role     | Family                       | Token          |
| -------- | ---------------------------- | -------------- |
| Headings | Playfair Display (serif)     | `font-display` |
| Body, UI | Inter (sans-serif)           | `font-sans`    |

Both are self-hosted through `next/font/google` in `src/app/layout.tsx` — do
not add `<link>` tags to Google Fonts anywhere.

`h1`–`h4` pick up Playfair and `ink-50` automatically from the base layer. Body
text inherits Inter and `ink-300`.

### Scale

| Element        | Classes                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------ |
| Page H1 (hero) | `text-[2rem] sm:text-[2.75rem] md:text-5xl lg:text-[3.75rem] xl:text-[4rem]`, `leading-[1.1]` |
| Section H2     | `text-3xl sm:text-4xl lg:text-[2.75rem]`, `font-medium`, `leading-[1.15]`                    |
| Card H3        | `text-xl`, `leading-snug`                                                                    |
| Lead paragraph | `text-base sm:text-lg`, `leading-relaxed`, `text-ink-300`                                    |
| Body           | `text-[0.9375rem]` or `text-sm`, `leading-relaxed`                                           |
| Eyebrow        | the `eyebrow` utility — 11px, 600, `0.2em` tracking, uppercase, `gold-500`                   |

Gold **italic** Playfair is the tagline voice. Use it for a short emphatic
phrase inside a heading (`<span className="text-gold-400 italic">`), never for
body copy.

---

## 3. Layout

- One content width, everywhere: `Container` (`max-w-6xl`, `px-6 sm:px-8`).
- `Section` supplies the vertical rhythm (`py-20 sm:py-24 lg:py-28`) and the
  `tone` banding. Prefer it over hand-rolled `<section>` elements.
- Editorial split for two-column sections: `lg:grid-cols-12` with a 4/8 or 5/7
  division — heading in the narrow column, content in the wide one.
- Card groups use a 1px "gap grid": `grid gap-px border border-white/8
  bg-white/8` with each cell on `bg-navy-850`. This gives hairline seams
  without doubled borders.

---

## 4. Components

| Component                       | Purpose                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| `ui/Container`                  | The single content width                                        |
| `ui/Section`                    | Full-bleed section + vertical rhythm + `tone` banding           |
| `ui/SectionHeading`             | Eyebrow → H2 → gold rule → lead. Use on every section           |
| `ui/GoldRule`                   | The gold accent rule (`weight="bold"` is reserved for H1)       |
| `ui/Button` (`ButtonLink`)      | `gold` (primary), `outline` (secondary), `quiet` (tertiary)     |
| `ui/Reveal`                     | Scroll-triggered fade-up — see Motion below                     |
| `ui/Accordion`                  | Single-open, accessible disclosure list                         |
| `ui/ServiceIcon`                | The 24px stroke icon set                                        |
| `ui/Photo`                      | `PhotoBackdrop`, `PhotoFrame`, `CardPhoto` — see 4b              |
| `site/SiteHeader` / `SiteFooter`| Site chrome, rendered once from the root layout                 |
| `site/Wordmark`                 | The brand lockup. Never re-typeset it inline                    |
| `site/FloatingCallButton`       | Mobile "Call Now", appears past 520px of scroll                 |
| `site/ComingSoon`               | Placeholder route shell — delete as real pages land             |

### Buttons

One `gold` button per view. Pair it with `outline` for the secondary action
(usually the phone number). `quiet` reads as a link with a button-sized target.

### Icons

The icon set in `ui/ServiceIcon.tsx` is hand-drawn on a 24px grid at 1.5
stroke weight with round terminals. Add new glyphs there in the same style —
do not introduce an icon library, and do not mix in filled icons.

---

## 4b. Photography

Photography is **optional and additive**. Slots are resolved from Unsplash by
`npm run photos:sync` into `src/lib/photo-manifest.json` and read back through
`src/lib/images.ts`; any slot the manifest does not fill is `null`, and a null
slot renders its section exactly as the photo-free design does — so the site is
never half-dressed. See the Photography section of the README for the workflow.

Three treatments, all in `ui/Photo.tsx`:

| Component       | Use                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `PhotoBackdrop` | Atmosphere behind a dark section (hero, closing CTA)                  |
| `PhotoFrame`    | A photo that carries meaning (the About portrait) — stays fully legible |
| `CardPhoto`     | The photo band across the top of a service card                       |

**The backdrop is anchored right and masked out to the left.** That is
deliberate, and it is the rule to preserve if you change it: darkening a
full-bleed photo enough to be safe under a headline leaves the photo
invisible (an early version landed at ~4% effective visibility), so instead
the photo lives on the empty side of the section and the text column keeps
near-solid navy beneath it.

Measured against a deliberately near-white test image — the worst case a real
photograph can present — the ground directly under the hero text column
yields:

| Text            | Contrast   | WCAG AA needs |
| --------------- | ---------- | ------------- |
| Headline `ink-50`   | 12.16:1 | 3.0:1         |
| Tagline `gold-400`  | 7.86:1  | 3.0:1         |
| Body `ink-300`      | 5.90:1  | 4.5:1         |

The closing CTA centres its text, so it sits differently against a
right-anchored photo. Measured the same way, under the centred CTA block with
the test image's hot spot placed dead centre: headline 13.03:1, gold 8.42:1,
body 6.31:1 — the section's own ledger grid and gold wash carry it.

If you retune the opacity or overlays, re-measure. Do not ship a backdrop
whose text band drops below 4.5:1 for body copy.

**Card photos are texture, not subject.** Twelve photographs in one grid is a
lot of competing subject matter, so `CardPhoto` holds each one at 50% opacity
under a navy tint and dissolves its bottom edge into the card's own surface —
there is no seam between photo and copy, and what the card is *about* stays the
gold glyph and the heading beneath it. The photo comes forward on hover (to
75%, with a slight scale), which is what gives the existing card hover
something to do beyond a background shift.

Because the band runs edge to edge, the card's padding sits on an inner wrapper
rather than on the link itself. A card with no photo is unaffected by that:
with an empty manifest the grid renders pixel-for-pixel identically to the
pre-photography build.

**Rules**

- Every photo needs `alt`. Decorative photos — both backdrops and every card
  photo — take `alt: ""` so screen readers skip them rather than repeating a
  heading the card already states. The About portrait is the exception and
  needs real, hand-written alt text.
- Only the hero backdrop gets `preload` — it is the LCP element. Everything
  else lazy-loads. Note `preload` replaced `priority` in Next 16, and it must
  not be combined with `loading`: next/image throws if both are set.
- `quality` values must appear in `images.qualities` in `next.config.ts`
  (currently `[75, 80]`). Next 16 requires that allow-list; an unlisted value
  is silently rounded to the nearest listed one.
- Remote photos need a `blurDataURL` to blur up — next/image cannot derive one
  for a URL it has not fetched. The sync script supplies it as a one-pixel PNG
  of the photo's dominant colour.
- Unsplash photos must credit the photographer. Credits recorded on the slot
  are collected and rendered once in the footer by `photoCredits()`.
- `images.unsplash.com` is allow-listed in `next.config.ts`. Self-hosted files
  in `public/images/` need no entry.

---

## 5. Motion

All scroll animation goes through `ui/Reveal` (Framer Motion). Defaults:
24px rise, 0.6s, `cubic-bezier(0.22, 1, 0.36, 1)`, fires once.

Stagger siblings with small delays — `delay={(i % 3) * 0.07}` for a 3-column
grid. Keep the total stagger under ~0.25s.

**A fade-up rests at `opacity: 0`, so it must never be the only thing making
content visible.** Two overrides guarantee it is not, both keyed off the
`data-reveal` attribute `Reveal` sets:

1. `@media (prefers-reduced-motion: reduce)` in `globals.css` pins revealed
   elements to their final state.
2. A `<noscript>` stylesheet in the root layout does the same when JavaScript
   is unavailable.

If you write a new animation, give it the same two escape hatches.

---

## 6. Accessibility

- One `h1` per page; headings descend without skipping levels.
- Focus is a 2px `gold-500` outline at 3px offset, set once on `:focus-visible`
  in the base layer. Do not remove or restyle it per-component.
- A "Skip to content" link is the first tab stop and targets `#main`.
- Decorative SVG and ornament carry `aria-hidden="true"`; interactive controls
  carry real labels (`aria-expanded`, `aria-controls`, `aria-current`).
- Every image needs an `alt`. Decorative images take `alt=""`.

---

## 7. SEO conventions for new pages

Every page exports `metadata` with:

```ts
export const metadata: Metadata = {
  title: "Page name",              // the layout appends "| Magid Financial Services"
  description: "150–160 characters",
  alternates: { canonical: "/page-path" },
};
```

- `metadataBase`, Open Graph and Twitter defaults come from the root layout.
- The OG card is generated at build time by `src/app/opengraph-image.tsx`.
- `ProfessionalService` + `WebSite` schema is emitted site-wide from the root
  layout. Page-specific schema (e.g. `FAQPage`) is added by the page itself.
- Add new routes to `src/app/sitemap.ts`.
- Add new services to `src/lib/site.ts` — the services grid, the footer, the
  sitemap and the offer catalog all read from that one array.
