import type { ReactNode } from "react";

/**
 * The site's single content width. Every section uses this so that headings,
 * body copy, and cards line up on the same left edge down the whole page.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
