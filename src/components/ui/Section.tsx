import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

/**
 * Surface a section sits on.
 *
 * `paper` is the site's default ground. `navy` bands are punctuation — a hero,
 * a closing call to action, a single emphatic break — not the norm. Pages that
 * alternate paper and paperRaised read as one continuous document; a navy band
 * says "stop here".
 */
type Tone = "paper" | "paperRaised" | "navy" | "navyDeep";

const toneClass: Record<Tone, string> = {
  paper: "bg-bone",
  paperRaised: "bg-bone-raised",
  navy: "bg-navy",
  navyDeep: "bg-navy-deep",
};

const isDark = (tone: Tone) => tone === "navy" || tone === "navyDeep";

/** Vertical rhythm. `tight` for interstitials, `loose` for a page's anchor section. */
type Space = "tight" | "normal" | "loose";

const spaceClass: Record<Space, string> = {
  tight: "py-14 sm:py-16",
  normal: "py-20 sm:py-24 lg:py-28",
  loose: "py-24 sm:py-32 lg:py-40",
};

/**
 * A full-bleed page section with the site's standard rhythm.
 *
 * Dark tones set data-surface="dark", which flips the semantic colour tokens
 * for everything inside — text, hairlines, card faces and the accent all
 * follow, so no component needs to know which ground it is on.
 */
export function Section({
  children,
  id,
  tone = "paper",
  space = "normal",
  as: Tag = "section",
  bleed = false,
  className = "",
  ariaLabelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  space?: Space;
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
      data-surface={isDark(tone) ? "dark" : undefined}
      className={`relative ${spaceClass[space]} ${toneClass[tone]} ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  );
}
