/**
 * Photography slots.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD THE PHOTOGRAPHS
 *
 * Every slot below is `null`, and a null slot renders its section exactly as
 * it looks without photography — the guilloche engraving carries it — so the
 * site is never broken or half-dressed while these are being filled in.
 *
 * The seven images these slots expect have already been generated and are
 * sitting in the Higgsfield workspace, in the project "Magid Financial
 * Services — site imagery". See IMAGERY.md for the filename each slot wants
 * and the job that produced it. Download them, drop them in `public/images/`
 * under those names, and fill in the slot:
 *
 *   heroBackground: {
 *     src: "/images/hero-desk.jpg",
 *     alt: "",                      // decorative background: empty alt
 *     width: 2688,
 *     height: 1520,
 *   },
 *
 * `credit` is only needed for stock photography whose licence asks for
 * attribution; credits collected here are rendered once, together, in the
 * footer. Generated imagery does not need one.
 * ---------------------------------------------------------------------------
 */

export type SitePhoto = {
  /** An absolute URL on an allowed host, or a repo-local path like /images/x.jpg */
  src: string;
  /**
   * Alt text. Describe what the photo shows for someone who cannot see it —
   * or use "" for a purely decorative background, which tells screen readers
   * to skip it rather than announcing a meaningless filename.
   */
  alt: string;
  /** Intrinsic pixel dimensions. Required so the layout reserves space. */
  width: number;
  height: number;
  credit?: { name: string; url: string };
};

export type PhotoSlot = keyof typeof photos;

export const photos: Record<
  | "heroBackground"
  | "aboutPortrait"
  | "ctaBackground"
  | "contactOffice"
  | "categoryIndividuals"
  | "categoryBusinesses"
  | "categoryTaxProblems",
  SitePhoto | null
> = {
  /** Behind the homepage hero, under the engraving. Decorative. → hero-desk.jpg */
  heroBackground: null,
  /** The About page's opening image. Meaningful — needs real alt text. → office-interior.jpg */
  aboutPortrait: null,
  /** Behind the closing call to action. Decorative. → ledger-edges.jpg */
  ctaBackground: null,
  /** The Contact page. Meaningful — needs real alt text. → reception.jpg */
  contactOffice: null,
  /** /services/individuals. → kitchen-table.jpg */
  categoryIndividuals: null,
  /** /services/businesses. → back-office.jpg */
  categoryBusinesses: null,
  /** /services/tax-problems. → envelopes.jpg */
  categoryTaxProblems: null,
};

/** Every credit that is actually in use, de-duplicated, for the footer. */
export function photoCredits(): { name: string; url: string }[] {
  const seen = new Map<string, { name: string; url: string }>();
  for (const photo of Object.values(photos)) {
    if (photo?.credit) seen.set(photo.credit.url, photo.credit);
  }
  return [...seen.values()];
}
