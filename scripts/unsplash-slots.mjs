/**
 * Which photograph goes where.
 *
 * This file is the editorial half of the photography system: it says what each
 * slot should show. `sync-unsplash.mjs` turns that into concrete, verified
 * photos and writes them to `src/lib/photo-manifest.json`.
 *
 * Two ways to fill a slot:
 *
 *   query: "..."   Search Unsplash and take the best-ranked usable result.
 *   pin:   "..."   Use exactly this photo. Paste the id from the photo's URL —
 *                  unsplash.com/photos/a-desk-with-papers-AbCdEf12345 pins as
 *                  "AbCdEf12345". `pin` wins over `query`.
 *
 * Pin anything a human has actually looked at and approved. Search results
 * move around over time, so a query is a starting point, not a guarantee.
 */

/** @typedef {"backdrop" | "frame" | "card"} SlotRole */

/**
 * Slots that are not tied to a service.
 *
 * `alt` is deliberately absent on the decorative ones: a backdrop that sits
 * under a headline is atmosphere, and announcing it to a screen reader adds
 * noise rather than information, so those ship with alt="". The About portrait
 * is different — it carries meaning, so the sync script records Unsplash's own
 * description as a starting point and asks a human to write the real thing.
 */
export const standaloneSlots = [
  {
    key: "hero-background",
    role: "backdrop",
    orientation: "landscape",
    decorative: true,
    query: "financial district skyline at dusk",
    note: "Sits behind the hero, masked out from under the headline. Wants depth and a dark, calm frame — not a bright or busy subject.",
  },
  {
    key: "about-portrait",
    role: "frame",
    orientation: "portrait",
    decorative: false,
    query: "accountant reviewing documents at desk",
    note: "The one photo on the homepage that carries meaning rather than atmosphere. Review the alt text by hand after syncing.",
  },
  {
    key: "cta-background",
    role: "backdrop",
    orientation: "landscape",
    decorative: true,
    query: "quiet modern office interior evening",
    note: "Behind the closing call to action. Text is centred here, so avoid anything with a bright hot spot in the middle.",
  },
];

/**
 * One card photo per service, keyed by the slug in `src/lib/site.ts`.
 *
 * Card photos are decorative: every card already states its service in a
 * heading and a summary line, so the photo is texture. Announcing it again
 * would just make a screen reader read each card twice.
 *
 * The sync script cross-checks these keys against `src/lib/site.ts` and fails
 * if the two lists have drifted, so adding a service without a photo query is
 * caught here rather than shipping as a blank card.
 */
export const serviceQueries = {
  "tax-preparation": "tax forms and paperwork on a desk",
  "accounting-services": "accounting ledger and bookkeeping",
  "business-tax-services": "business district office buildings",
  "income-tax-return-filing": "filing taxes on a laptop",
  "payroll-support": "payroll calculator and timesheets",
  "tax-planning": "financial planning charts and notes",
  "tax-problem-consulting": "advisor meeting a client across a desk",
  "irs-audit-representation": "government building stone columns",
  "new-business-tax-consulting": "small business owner opening a shop",
  "local-tax-return-preparation": "pennsylvania small town main street",
  "loan-modifications": "house keys and mortgage documents",
  "debt-settlement": "reviewing bills and statements with a calculator",
};

/** Every slot, flattened, in the order the sync script should work through them. */
export function allSlots() {
  return [
    ...standaloneSlots,
    ...Object.entries(serviceQueries).map(([slug, query]) => ({
      key: `service/${slug}`,
      role: /** @type {SlotRole} */ ("card"),
      orientation: /** @type {const} */ ("landscape"),
      decorative: true,
      query,
      note: `Card photo for the "${slug}" service.`,
    })),
  ];
}
