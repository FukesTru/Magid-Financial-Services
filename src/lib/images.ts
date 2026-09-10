/**
 * Photography slots.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD PHOTOS
 *
 * Photos are resolved from Unsplash once, by a script, and committed as static
 * data — the site never talks to Unsplash at runtime:
 *
 *   UNSPLASH_ACCESS_KEY=your-key npm run photos:sync
 *
 * That reads the editorial brief in `scripts/unsplash-slots.mjs` (what each
 * slot should show), resolves it against the Unsplash API, and writes verified
 * photos — real ids, real dimensions, real photographer credits — into
 * `photo-manifest.json` next to this file. To change what a slot shows, edit
 * the brief and re-run with `--force`; to choose an exact photo, pin its id.
 *
 * Any slot the manifest does not fill stays `null`, and a null slot renders
 * its section exactly as the photo-free design does — so the site is never
 * broken or half-dressed while these are being filled in.
 *
 * To self-host instead (no dependency on Unsplash's CDN at runtime, which is
 * the more robust choice for a client site), drop the file in `public/images/`
 * and set `src` to a repo-local path like `/images/whatever.jpg`. Nothing else
 * changes.
 *
 * Credits are not optional: the Unsplash License asks that the photographer be
 * credited wherever the photo is used. Credits recorded on each slot are
 * collected by `photoCredits()` and rendered once, together, in the footer.
 * ---------------------------------------------------------------------------
 */

import manifest from "./photo-manifest.json";
import { services } from "./site";

export type SitePhoto = {
  /** An absolute URL on an allowed host, or a repo-local path like /images/x.jpg */
  src: string;
  /**
   * Alt text. Describes what the photo shows for someone who cannot see it —
   * or "" for a decorative photo, which tells screen readers to skip it rather
   * than announcing something the surrounding copy already says.
   */
  alt: string;
  /** Intrinsic pixel dimensions. Required so the layout reserves space. */
  width: number;
  height: number;
  /**
   * A one-pixel PNG of the photo's dominant colour, for `placeholder="blur"`.
   * next/image cannot derive this for a remote image it has not fetched, so
   * the sync script records it from the colour Unsplash reports.
   */
  blurDataURL?: string;
  credit?: { name: string; url: string };
};

/* -------------------------------------------------------------------------- */
/* Reading the manifest                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Manifest entries are machine-written, so they are checked rather than
 * trusted: an entry missing a `src` or carrying junk dimensions would
 * otherwise reach `next/image` as a runtime error on a client's live site.
 * Anything malformed is treated as an unfilled slot, which the sections
 * already know how to render.
 */
function readSlot(key: string): SitePhoto | null {
  const entry: unknown = (manifest.slots as Record<string, unknown>)[key];
  if (!entry || typeof entry !== "object") return null;

  const { src, alt, width, height, blurDataURL, credit } = entry as Record<
    string,
    unknown
  >;

  if (typeof src !== "string" || src === "") return null;
  if (typeof width !== "number" || !Number.isFinite(width) || width <= 0) return null;
  if (typeof height !== "number" || !Number.isFinite(height) || height <= 0) return null;

  return {
    src,
    alt: typeof alt === "string" ? alt : "",
    width,
    height,
    blurDataURL: typeof blurDataURL === "string" ? blurDataURL : undefined,
    credit: isCredit(credit) ? credit : undefined,
  };
}

function isCredit(value: unknown): value is { name: string; url: string } {
  if (!value || typeof value !== "object") return false;
  const { name, url } = value as Record<string, unknown>;
  return typeof name === "string" && name !== "" && typeof url === "string" && url !== "";
}

/* -------------------------------------------------------------------------- */
/* The slots                                                                   */
/* -------------------------------------------------------------------------- */

export const photos: {
  /** Sits behind the hero, under the navy wash. Decorative. */
  heroBackground: SitePhoto | null;
  /** Fills the empty left column of the About section. Carries meaning. */
  aboutPortrait: SitePhoto | null;
  /** Sits behind the closing call to action. Decorative. */
  ctaBackground: SitePhoto | null;
} = {
  heroBackground: readSlot("hero-background"),
  aboutPortrait: readSlot("about-portrait"),
  ctaBackground: readSlot("cta-background"),
};

export type PhotoSlot = keyof typeof photos;

/**
 * One card photo per service, keyed by slug.
 *
 * Built from `services` rather than from the manifest, so the lookup is
 * exhaustive by construction: every service has an entry, and a service with
 * no photo yet gets `null` instead of a missing key.
 */
export const servicePhotos: Record<string, SitePhoto | null> = Object.fromEntries(
  services.map((service) => [service.slug, readSlot(`service/${service.slug}`)]),
);

export function servicePhoto(slug: string): SitePhoto | null {
  return servicePhotos[slug] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Attribution                                                                 */
/* -------------------------------------------------------------------------- */

/** Every credit that is actually in use, de-duplicated, for the footer. */
export function photoCredits(): { name: string; url: string }[] {
  const seen = new Map<string, { name: string; url: string }>();
  for (const photo of [...Object.values(photos), ...Object.values(servicePhotos)]) {
    if (photo?.credit) seen.set(photo.credit.url, photo.credit);
  }
  return [...seen.values()];
}
