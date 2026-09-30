import Image from "next/image";
import type { SitePhoto } from "@/lib/images";

/**
 * Full-bleed photographic backdrop for a dark section.
 *
 * The balance to strike is that the photograph has to be genuinely visible —
 * otherwise it is bytes for nothing — while the text over it stays readable.
 *
 * An earlier version was tuned against a deliberately near-white test image
 * and stacked three darkening layers to survive it. Against the real
 * photography, which is low-key and mostly shadow, that combination erased
 * the image: a 45%-opacity photo under a 45% navy wash left roughly a quarter
 * of the original, and a quarter of a dark photograph is nothing at all.
 *
 * So the darkening is now *positional* rather than global. The photo plays at
 * near full strength, and the navy is spent only where the text actually sits:
 *
 *   `side`   — text in a left column, photo owning the right of the frame
 *   `center` — text centred, so the scrim is a radial pool behind it instead
 *
 * Either way the text band is close to solid navy and the far side is close to
 * untouched photograph. Re-measure contrast after changing any stop here.
 */
export function PhotoBackdrop({
  photo,
  priority = false,
  focus = "side",
  scrim = "standard",
  flip = false,
  className = "",
}: {
  photo: SitePhoto;
  /** Set on the hero — it is the LCP element and should preload. */
  priority?: boolean;
  /** Where the text sits, which decides where the scrim goes. */
  focus?: "side" | "center";
  /**
   * How far the scrim reaches. The homepage hero holds its copy in a narrow
   * column, so the navy can give way early and leave most of the frame to the
   * photograph. Page heroes run their copy to `max-w-3xl`, which reaches well
   * past that — `wide` carries the navy far enough to cover it.
   */
  scrim?: "standard" | "wide";
  /**
   * Mirror the image horizontally. For a still life this is free, and it is
   * the cheapest way to move a subject that sits on the text side of the
   * frame over to the side the viewer can actually see.
   */
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      data-photo-backdrop
      aria-hidden={photo.alt === "" ? "true" : undefined}
      className={`absolute inset-0 -z-30 overflow-hidden ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="100vw"
        quality={80}
        className={`absolute inset-0 h-full w-full object-cover opacity-80 sm:opacity-95 ${
          flip ? "scale-x-[-1]" : ""
        } ${
          focus === "center"
            ? "[mask-image:radial-gradient(120%_120%_at_50%_50%,transparent_0%,black_75%)]"
            : flip
              ? // The mask lives in the element's own coordinate space and the
                // flip is applied to the result, so a `to right` mask comes out
                // mirrored — revealing the photo on the left, under the text,
                // and hiding it on the right. Reversing the gradient cancels
                // the flip back out.
                "[mask-image:linear-gradient(to_left,transparent_0%,transparent_16%,black_58%)]"
              : "[mask-image:linear-gradient(to_right,transparent_0%,transparent_16%,black_58%)]"
        }`}
      />

      {/* A light unifying tint — enough to hold a warm or cool photo inside
          the palette, not enough to put it out. */}
      <div className="absolute inset-0 bg-navy/15" />

      {/* Feather the seams into the sections above and below. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-transparent to-navy" />

      {/* The scrim that the text actually sits on. */}
      {focus === "side" ? (
        <div
          className={
            scrim === "wide"
              ? "absolute inset-0 bg-[linear-gradient(to_right,var(--color-navy)_0%,var(--color-navy)_52%,transparent_88%)]"
              : "absolute inset-0 bg-[linear-gradient(to_right,var(--color-navy)_0%,var(--color-navy)_32%,transparent_72%)]"
          }
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(70%_75%_at_50%_50%,var(--color-navy)_0%,var(--color-navy)_42%,transparent_85%)]" />
      )}
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
