import type { ReactNode } from "react";
import { GoldRule } from "./GoldRule";

/**
 * Standard section header: gold eyebrow, Playfair H2, gold rule, lead-in copy.
 * Reuse this on every page so section openings stay identical site-wide.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        id={id}
        className="mt-4 text-3xl leading-[1.15] font-medium sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      <GoldRule align={align} className="mt-6" />
      {lead ? (
        <p className="mt-6 text-base leading-relaxed text-ink-300 sm:text-lg">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
