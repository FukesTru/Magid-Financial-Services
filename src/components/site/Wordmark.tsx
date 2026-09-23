import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The brand lockup: a gold-ruled monogram beside the firm name — "Magid" in
 * Playfair over "Financial Services" in letterspaced Inter. Used in the header
 * and footer; never re-typeset it inline anywhere else.
 */
export function Wordmark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group flex items-center gap-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center border border-gold-500/45 transition-colors duration-300 group-hover:border-gold-500"
      >
        <span className="font-display text-lg leading-none text-gold-500">
          {site.initials}
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] tracking-wide text-ink-50">
          Magid
        </span>
        {!compact && (
          <span className="mt-1 font-sans text-[0.5625rem] font-semibold tracking-[0.24em] text-ink-400 uppercase">
            Financial Services
          </span>
        )}
      </span>
    </Link>
  );
}
