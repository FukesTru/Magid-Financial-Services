import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type Tone = "base" | "raised" | "deep" | "light" | "lightDeep";

const toneClass: Record<Tone, string> = {
  base: "bg-navy-900",
  raised: "bg-navy-850",
  deep: "bg-navy-950",
  light: "bg-paper",
  lightDeep: "bg-paper-deep",
};

/** Light tones flip the semantic tokens for everything inside them. */
const isLight = (tone: Tone) => tone === "light" || tone === "lightDeep";

/**
 * A full-bleed page section with the site's standard vertical rhythm.
 *
 * `tone` sets the band's surface. The navy tones shift one step up or down the
 * ramp; the light tones switch the band to paper and set data-surface="light",
 * which flips the semantic colour tokens for every component inside — text,
 * hairlines, card faces and the accent all follow automatically.
 */
export function Section({
  children,
  id,
  tone = "base",
  as: Tag = "section",
  bleed = false,
  className = "",
  ariaLabelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  as?: ElementType;
  /** Skip the Container when the section manages its own width. */
  bleed?: boolean;
  className?: string;
  ariaLabelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      data-surface={isLight(tone) ? "light" : undefined}
      className={`relative py-20 sm:py-24 lg:py-28 ${toneClass[tone]} ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}
