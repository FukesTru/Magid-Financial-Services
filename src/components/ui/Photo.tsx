import Image from "next/image";
import type { SitePhoto } from "@/lib/images";

/**
 * Blur-up props for a remote photo.
 *
 * next/image only derives a `blurDataURL` for images it can read at build
 * time, which a remote URL is not — so the sync script records the photo's
 * dominant colour as a one-pixel PNG and the image fades up out of its own
 * colour. A slot without one falls back to no placeholder rather than
 * rendering `placeholder="blur"` with nothing to show, which throws.
 */
function blurProps(photo: SitePhoto) {
  return photo.blurDataURL
    ? ({ placeholder: "blur", blurDataURL: photo.blurDataURL } as const)
    : ({ placeholder: "empty" } as const);
}

/**
 * Full-bleed photographic backdrop for a dark section.
 *
 * Photography has to sit *inside* the palette here, not fight it: the image is
 * held at low opacity over navy and finished with a gradient to the base
 * colour, so the section reads as deep navy that happens to have depth rather
 * than as a stock photo with text on top. That also protects the contrast of
 * the headline, which is the thing that actually has to be readable.
 */
export function PhotoBackdrop({
  photo,
  preload = false,
  className = "",
}: {
  photo: SitePhoto;
  /** Set on the hero — it is the LCP element and should load from the head. */
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      data-photo-backdrop
      aria-hidden={photo.alt === "" ? "true" : undefined}
      className={`absolute inset-0 -z-30 overflow-hidden ${className}`}
    >
      {/*
        The photo is anchored right and faded out to the left, so it has real
        presence on the empty side of the section while the headline — which
        is left-aligned — still sits on close to solid navy. Darkening the
        whole frame enough to be safe under text would leave the photo
        invisible; moving it out from under the text keeps both.
      */}
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        // `preload` replaces the deprecated `priority` prop in Next 16. Note
        // that it must not be combined with `loading` — next/image throws if
        // both are set — and it already suppresses lazy loading on its own,
        // so everything without it lazy-loads by default.
        preload={preload}
        sizes="100vw"
        quality={75}
        {...blurProps(photo)}
        className="absolute inset-0 h-full w-full object-cover opacity-45 [mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,black_78%)]"
      />

      {/* Hold the whole frame inside the palette. */}
      <div className="absolute inset-0 bg-navy-900/45" />

      {/* Feather the top and bottom seams into the adjacent sections. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-transparent to-navy-900" />

      {/* Guarantee the text column stays on near-solid navy at every width. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-transparent" />
    </div>
  );
}

/**
 * A framed content photo — used where the image is part of the message rather
 * than atmosphere, so it stays legible instead of being washed into the
 * background. Keeps the site's hairline border and a faint navy tint so it
 * still belongs to the palette.
 */
export function PhotoFrame({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  photo: SitePhoto;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`relative overflow-hidden border border-white/8 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        // Higher than the site default because this is the one photo meant to
        // be looked at rather than felt. 80 is allow-listed in next.config.ts;
        // an unlisted value would be silently rounded to the nearest one.
        quality={80}
        {...blurProps(photo)}
        className="h-full w-full object-cover"
      />
      {/* Unifying tint — keeps a warm or blue-cast photo from clashing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy-900/25 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"
      />
    </figure>
  );
}

/**
 * The photo band across the top of a card.
 *
 * Twelve photographs in one grid is a lot of competing subject matter, so this
 * treatment deliberately pushes them towards texture: held well back, tinted
 * into the navy, and dissolved into the card's own surface at the bottom edge
 * so there is no hard seam between photo and copy. What the card is actually
 * *about* stays the gold glyph and the heading underneath.
 *
 * The photo then comes forward on hover, which gives the existing card hover
 * something to do beyond a background shift. It expects to be rendered inside
 * the card's `group`.
 */
export function CardPhoto({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  photo: SitePhoto;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden={photo.alt === "" ? "true" : undefined}
      className={`relative aspect-16/9 overflow-hidden bg-navy-900 ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        quality={75}
        {...blurProps(photo)}
        className="h-full w-full object-cover opacity-50 transition duration-500 ease-brand group-hover:scale-105 group-hover:opacity-75 motion-reduce:transform-none motion-reduce:transition-none"
      />

      {/* Pull any warm or blue-cast photo back towards the palette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy-900/40 mix-blend-multiply"
      />

      {/*
        Dissolve the bottom edge into the card surface. `navy-850` is the card's
        own background, so the photo ends without a visible border — and the
        hover surface is a step lighter, which is why the seam is redrawn in
        `navy-800` on hover rather than left to mismatch.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy-850/45 to-navy-850 transition-colors duration-300 ease-brand group-hover:via-navy-800/45 group-hover:to-navy-800"
      />
    </div>
  );
}
