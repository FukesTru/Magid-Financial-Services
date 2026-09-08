"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Mobile-only "Call Now" button. Hidden until the visitor has scrolled past
 * the hero, so it never covers the hero's own phone CTA.
 */
export function FloatingCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.phone.href}
      aria-label={`Call ${site.name} at ${site.phone.display}`}
      className={`fixed right-5 bottom-5 z-40 flex items-center gap-2.5 rounded-full bg-gold-500 py-3.5 pr-5 pl-4 font-sans text-sm font-semibold text-navy-950 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-brand motion-reduce:transition-none lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
        <path
          d="M4.2 2.8h3l1.4 3.5-2 1.3a10.5 10.5 0 0 0 5.8 5.8l1.3-2 3.5 1.4v3a1.4 1.4 0 0 1-1.5 1.4A14.6 14.6 0 0 1 2.8 4.3a1.4 1.4 0 0 1 1.4-1.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      Call Now
    </a>
  );
}
