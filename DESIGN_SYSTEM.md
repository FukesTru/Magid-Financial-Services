# Magid Financial Services — Design System

The homepage establishes this system. **Every subsequent page must consume
these tokens and primitives rather than re-inventing them**, so the site reads
as one thing.

Tokens live in `src/app/globals.css` under `@theme`. Business facts live in
`src/lib/site.ts`. Nothing in either file should be duplicated inline.

---

## 1. Color

Defined as Tailwind theme tokens in `src/app/globals.css` — use `bg-bone`,
`text-accent`, `border-line`. Never hard-code a hex value in a component.

The palette has two halves. **Raw** tokens name an actual colour. **Semantic**
tokens name a *role*, and are redefined inside `[data-surface="dark"]`, so a
component written against them works on either ground without knowing which
one it is on.

### Raw surfaces

| Token          | Hex       | Use                                            |
| -------------- | --------- | ---------------------------------------------- |
| `bone`         | `#fbf9f5` | **Base page background.** Warm, never stark white |
| `bone-raised`  | `#f3efe7` | Second light surface, for banding              |
| `navy`         | `#0e1726` | Full-bleed accent band — the hero              |
| `navy-deep`    | `#0a111d` | Footer, trust bar, closing CTA                 |
| `navy-soft`    | `#16243a` | Card face on a navy band                       |
| `brass`        | `#c9a84c` | Bright brand gold — **fills**, and text on navy |
| `brass-bright` | `#e2c877` | Hover on a brass fill                          |

### Semantic tokens

These flip. Left is what they resolve to on the default light ground; right is
what `[data-surface="dark"]` redefines them to.

| Token         | On bone            | On navy            | Use                 |
| ------------- | ------------------ | ------------------ | ------------------- |
| `ink-50`      | `#0e1726` (17.1:1) | `#fbf9f5` (17.1:1) | Headings            |
| `ink-200`     | `#27354c` (11.8:1) | `#cbd5e4`          | High-emphasis body  |
| `ink-300`     | `#41506b` (7.7:1)  | `#a9b6ca` (8.8:1)  | **Default body copy** |
| `ink-400`     | `#5e6d86` (5.0:1)  | `#8494ac`          | Captions, muted meta |
| `card`        | `#ffffff`          | `#16243a`          | Card faces in a grid |
| `card-hover`  | `#faf8f3`          | `#1d2e48`          | Card hover          |
| `line`        | `#e5dfd3`          | `#22304a`          | Hairlines           |
| `accent`      | `#7e632a` (5.3:1)  | `#c9a84c` (7.9:1)  | Brass **as text**   |
| `accent-soft` | `#634d1e`          | `#e2c877`          | Accent hover        |

**Why `accent` has two values.** The brand gold `#c9a84c` measures 7.9:1 on
navy and 1.9:1 on bone — a good text colour on one ground and illegible on the
other. So `accent` darkens to `#7e632a` on light. Reach for `brass` when you
want the brand gold as a **fill** (a button, a rule); reach for `accent` when
you want it as **text**.

### Surface flipping

`<Section tone="navy">` (or `navyDeep`) sets `data-surface="dark"`, which
redefines every semantic token for that whole subtree. A component that reaches
for `bg-navy-soft` or `text-brass` directly will **not** flip.

This is the one thing to get right. A hand-rolled `<section className="bg-navy">`
that forgets `data-surface="dark"` renders its text in the *light* ink values on
navy — invisible, not merely low-contrast. Six sections shipped that way once.
Prefer `Section`; if you must hand-roll a navy band, set the attribute yourself.

### Rules of use

- Navy is punctuation. The page is bone; a navy band says "stop here". Hero,
  trust bar, closing CTA, footer — that is the whole budget.
- Brass is punctuation too. Roughly one brass element per view: a rule, an
  eyebrow, one solid button. Two competing brass buttons means one is wrong.
- Borders are hairlines: the `hairline*` utilities or `border-line`. Never a
  heavy border.
- Light banding alternates `paper` and `paperRaised` via `Section`'s `tone`.

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
| Eyebrow        | the `eyebrow` utility — 11px, 600, `0.2em` tracking, uppercase, `accent`                   |

Gold **italic** Playfair is the tagline voice. Use it for a short emphatic
phrase inside a heading (`<span className="text-accent italic">`), never for
body copy.

---

## 3. Layout

- One content width, everywhere: `Container` (`max-w-6xl`, `px-6 sm:px-8`).
- `Section` supplies the vertical rhythm (`py-20 sm:py-24 lg:py-28`) and the
  `tone` banding. Prefer it over hand-rolled `<section>` elements.
- Editorial split for two-column sections: `lg:grid-cols-12` with a 4/8 or 5/7
  division — heading in the narrow column, content in the wide one.
- Card groups use a 1px "gap grid": `grid gap-px border border-line bg-line`
  with each cell on `bg-card`. This gives hairline seams without doubled
  borders.

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

## 4b. Engraving & photography

### Engraving

The site's decorative layer is **guilloche** — the interlaced line-work on
banknotes, share certificates and bond coupons. It is the one ornamental
language a financial firm owns outright, and these are the real construction
(overlaid epitrochoids) rather than a picture of one. Assets live in
`public/engraving/` and are generated by `scripts/generate-engravings.mjs`;
see `IMAGERY.md` for the maths and the parameter constraints.

Use it through `ui/Engraving.tsx`:

```tsx
<Engraving
  variant="rosette"
  className="... -z-20 aspect-square w-[62%] text-brass opacity-[0.13]"
/>
```

| Variant | Where |
| --- | --- |
| `rosette` | Hero, bleeding off an edge |
| `rosette-fine` | Closing CTA, centred like a seal |
| `band` | Trust bar; tiles seamlessly on `repeat-x` |
| `motif-<service-slug>` | Service cards, one per service |

**It is painted as a CSS mask, not an `<img>`.** An external SVG loaded through
`<img>` renders in its own isolated document, so nothing the page says about
colour reaches inside it. As a mask the file supplies only a shape and the
paint comes from the element — one cached asset serves the brass watermark on
navy and the ink watermark on bone. That is what the `engrave` utility sets up.

The assets are stroked **white**, not `currentColor`. A mask can be read as
alpha (opaque shows) or luminance (bright shows); black survives the first and
vanishes under the second, white survives both. Keep it white.

**Rules**

- Always decorative: `aria-hidden`, `pointer-events-none`, negative z-index.
  The component sets the first two for you.
- Keep it under ~0.16 opacity and let it be **cropped** by its container.
  A whole rosette floating in the middle of a section looks like clip art; an
  engraving running off the edge looks like a watermark.
- Any section holding one needs `relative isolate overflow-hidden`.
- Re-run the contrast audit after changing opacity — the watermark tints the
  ground beneath text. Both the resting and hover states were measured.

### Photography

Photography is **optional and additive**. Every slot in `src/lib/images.ts`
defaults to `null`, and a null slot renders its section exactly as the
photo-free design does — so the site is never half-dressed.

Two treatments, both in `ui/Photo.tsx`:

| Component       | Use                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `PhotoBackdrop` | Atmosphere behind a dark section (hero, closing CTA)                  |
| `PhotoFrame`    | A photo that carries meaning (the About portrait) — stays fully legible |

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
| Tagline `accent`    | 7.86:1  | 3.0:1         |
| Body `ink-300`      | 5.90:1  | 4.5:1         |

The closing CTA centres its text, so it sits differently against a
right-anchored photo. Measured the same way, under the centred CTA block with
the test image's hot spot placed dead centre: headline 13.03:1, gold 8.42:1,
body 6.31:1 — the section's own ledger grid and gold wash carry it.

If you retune the opacity or overlays, re-measure. Do not ship a backdrop
whose text band drops below 4.5:1 for body copy.

**Rules**

- Every photo needs `alt`. Decorative backgrounds take `alt: ""` so screen
  readers skip them rather than announcing a filename.
- Only the hero backdrop gets `priority` — it is the LCP element. Everything
  else lazy-loads.
- Self-host. Files in `public/images/` need no `next.config.ts` entry; a
  remote host does. The site's own photography is generated and self-hosted.
- `credit` is only for stock whose licence asks for attribution. Credits
  declared on a slot are collected and rendered once in the footer by
  `photoCredits()`.
- No faces and no legible text in generated imagery — see `IMAGERY.md` for why
  both matter on an accounting firm's site.

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
- Focus is a 2px `accent` outline at 3px offset, set once on `:focus-visible`
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
