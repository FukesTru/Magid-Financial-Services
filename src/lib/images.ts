/**
 * Photography slots.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD A PHOTO
 *
 * Every slot below is `null`, and a null slot renders the section exactly as
 * it looks without photography — so the site is never broken or half-dressed
 * while these are being filled in.
 *
 * For an Unsplash photo, open the photo page and use the direct file URL:
 *
 *   heroBackground: {
 *     src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
 *     alt: "",                       // decorative background: empty alt
 *     width: 2400,
 *     height: 1600,
 *     credit: { name: "Photographer Name", url: "https://unsplash.com/@handle" },
 *   },
 *
 * `credit` is not optional in practice: the Unsplash License asks that the
 * photographer be credited wherever the photo is used. Credits collected here
 * are rendered once, together, in the site footer.
 *
 * To self-host instead (no dependency on Unsplash's CDN at runtime, which is
 * the more robust choice for a client site), drop the file in `public/images/`
 * and set `src: "/images/whatever.jpg"`. Nothing else changes.
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

export const photos: {
  /** Sits behind the hero, under the navy wash. Decorative. */
  heroBackground: SitePhoto | null;
  /** Fills the empty left column of the About section. Meaningful — needs real alt text. */
  aboutPortrait: SitePhoto | null;
  /** Sits behind the closing call to action. Decorative. */
  ctaBackground: SitePhoto | null;
} = {
  heroBackground: null,
  aboutPortrait: null,
  ctaBackground: null,
};

/** Every credit that is actually in use, de-duplicated, for the footer. */
export function photoCredits(): { name: string; url: string }[] {
  const seen = new Map<string, { name: string; url: string }>();
  for (const photo of Object.values(photos)) {
    if (photo?.credit) seen.set(photo.credit.url, photo.credit);
  }
  return [...seen.values()];
}
