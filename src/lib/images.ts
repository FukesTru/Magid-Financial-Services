import { imageSize } from "./image-size";

/**
 * Photography slots.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD THE PHOTOGRAPHS
 *
 * Drop the file into `public/images/` under the basename listed below. That is
 * the whole procedure — no code change. Each slot is resolved at build time by
 * looking for its basename with any of .jpg / .jpeg / .png / .webp and reading
 * the real dimensions out of the file header, so a re-export or a format swap
 * needs no edit either.
 *
 * A slot whose file is absent stays `null`, and a null slot renders its
 * section exactly as it looks without photography — the guilloche engraving
 * carries it. So the site is never broken or half-dressed while these are
 * being filled in, and adding them one at a time is fine.
 *
 * See IMAGERY.md for which generated image belongs in which slot.
 *
 * WHY THIS READS THE FILESYSTEM. Every consumer of `photos` is a server
 * component and every page using one is statically prerendered, so this runs
 * once at build time and the result is baked into the HTML. Nothing here
 * reaches the browser. If a *client* component ever needs this module, move
 * the resolution into a server component and pass the result down as props
 * rather than deleting the check.
 * ---------------------------------------------------------------------------
 */

export type SitePhoto = {
  src: string;
  /**
   * Alt text. Describe what the photo shows for someone who cannot see it —
   * or "" for a purely decorative background, which tells screen readers to
   * skip it rather than announcing a meaningless filename.
   */
  alt: string;
  width: number;
  height: number;
  credit?: { name: string; url: string };
};

const DIR = "public/images";
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * Alt text note: these describe what is *in* the frame and deliberately stop
 * short of claiming whose desk or office it is. The imagery is commissioned
 * atmosphere, not documentary photography of this firm's premises, and alt
 * text is not the place to blur that line.
 */
const SLOTS = {
  heroBackground: { file: "hero-desk", alt: "" },
  aboutPortrait: {
    file: "office-interior",
    alt: "A desk beside a tall window, with a wall of archival box files and bound ledgers behind it.",
  },
  ctaBackground: { file: "ledger-edges", alt: "" },
  contactOffice: {
    file: "reception",
    alt: "A quiet reception corner: two waiting chairs beside a low table, lit through wooden blinds.",
  },
  categoryIndividuals: {
    file: "kitchen-table",
    alt: "A kitchen table in morning light with a coffee cup, reading glasses and a closed folder of papers.",
  },
  categoryBusinesses: {
    file: "back-office",
    alt: "The back office of a small business: a wooden counter with a clipboard, a cash tin and stacked crates.",
  },
  categoryTaxProblems: {
    file: "envelopes",
    alt: "A squared stack of unopened official envelopes on a dark table, crossed by a single shaft of light.",
  },
} as const;

export type PhotoSlot = keyof typeof SLOTS;

function resolve(slot: PhotoSlot): SitePhoto | null {
  const { file, alt } = SLOTS[slot];
  for (const ext of EXTENSIONS) {
    const size = imageSize(`${DIR}/${file}.${ext}`);
    if (size) {
      return { src: `/images/${file}.${ext}`, alt, ...size };
    }
  }
  return null;
}

export const photos: Record<PhotoSlot, SitePhoto | null> = Object.fromEntries(
  (Object.keys(SLOTS) as PhotoSlot[]).map((slot) => [slot, resolve(slot)]),
) as Record<PhotoSlot, SitePhoto | null>;

/** Every credit that is actually in use, de-duplicated, for the footer. */
export function photoCredits(): { name: string; url: string }[] {
  const seen = new Map<string, { name: string; url: string }>();
  for (const photo of Object.values(photos)) {
    if (photo?.credit) seen.set(photo.credit.url, photo.credit);
  }
  return [...seen.values()];
}
