import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type Tone = "base" | "raised" | "deep";

const toneClass: Record<Tone, string> = {
  base: "bg-navy-900",
  raised: "bg-navy-850",
  deep: "bg-navy-950",
};

/**
 * A full-bleed page section with the site's standard vertical rhythm.
 *
 * `tone` shifts the navy one step up or down the ramp — alternating tones is
 * how the page gets its banding without ever leaving the brand palette.
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
      className={`relative py-20 sm:py-24 lg:py-28 ${toneClass[tone]} ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}
