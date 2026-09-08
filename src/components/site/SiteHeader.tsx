"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/**
 * Sticky site header. Transparent while it sits over the hero, then solid
 * navy with a hairline once the visitor scrolls past it.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever navigation happens. Adjusting state during
  // render (rather than in an effect) keeps this to a single render pass and
  // covers back/forward navigation as well as taps on the menu's own links.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  // Trap the page behind the open menu and allow Escape to dismiss it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-brand ${
        solid
          ? "border-b border-white/8 bg-navy-950/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 font-sans text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100 ${
                      active
                        ? "text-gold-400 after:scale-x-100"
                        : "text-ink-200 hover:text-ink-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={site.phone.href}
            className="font-sans text-sm font-medium text-ink-200 transition-colors hover:text-gold-400"
          >
            {site.phone.display}
          </a>
          <ButtonLink href="/contact" variant="gold" size="md">
            Book a Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="-mr-2 grid h-11 w-11 place-items-center text-ink-200 lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-brand ${
                menuOpen ? "top-1/2 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 block h-px w-6 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-brand ${
                menuOpen ? "top-1/2 -rotate-45" : "bottom-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/8 bg-navy-950 lg:hidden"
      >
        <nav aria-label="Mobile" className="px-6 py-8 sm:px-8">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-white/6">
                <Link
                  href={item.href}
                  className="block py-4 font-display text-xl text-ink-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3">
            <ButtonLink href="/contact" variant="gold" size="lg">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline" size="lg">
              Call {site.phone.display}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
