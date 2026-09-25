import Image from "next/image";
import type { SitePhoto } from "@/lib/images";

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
  priority = false,
  className = "",
}: {
  photo: SitePhoto;
  /** Set on the hero — it is the LCP element and should preload. */
  priority?: boolean;
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
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="100vw"
        quality={75}
        className="absolute inset-0 h-full w-full object-cover opacity-45 [mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,black_78%)]"
      />

      {/* Hold the whole frame inside the palette. */}
      <div className="absolute inset-0 bg-navy/45" />

      {/* Feather the top and bottom seams into the adjacent sections. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />

      {/* Guarantee the text column stays on near-solid navy at every width. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />
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
    <figure className={`relative overflow-hidden border border-line ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        sizes={sizes}
        quality={80}
        className="h-full w-full object-cover"
      />
      {/* Unifying tint — keeps a warm or blue-cast photo from clashing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy/25 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"
      />
    </figure>
  );
}
