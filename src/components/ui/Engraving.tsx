import type { CSSProperties } from "react";

/**
 * One of the generated guilloche assets in public/engraving/.
 * Regenerate them with `node scripts/generate-engravings.mjs`.
 */
export type EngravingVariant = "rosette" | "rosette-fine" | "band" | (string & {});

/**
 * A guilloche watermark.
 *
 * Purely decorative, so it is hidden from assistive technology and never
 * participates in layout. Colour comes from `currentColor` via the `engrave`
 * utility — set it with a text colour class and dial it with `opacity`.
 */
export function Engraving({
  variant,
  className = "",
  style,
}: {
  variant: EngravingVariant;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`engrave pointer-events-none absolute ${className}`}
      style={
        {
          "--engrave-src": `url('/engraving/${variant}.svg')`,
          ...style,
        } as CSSProperties
      }
    />
  );
}
