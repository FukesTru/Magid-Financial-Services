"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import {
  primaryNav,
  serviceCategories,
  servicesInCategory,
  services,
  site,
} from "@/lib/site";
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

              // Services carries a dropdown of the twelve service pages; every
              // other nav item is a plain link.
              if (item.href === "/services") {
                return (
                  <ServicesMenu key={item.href} label={item.label} active={active} />
                );
              }

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
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <MobileServices key={item.href} label={item.label} />
              ) : (
                <li key={item.href} className="border-b border-white/6">
                  <Link
                    href={item.href}
                    className="block py-4 font-display text-xl text-ink-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
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

/* -------------------------------------------------------------------------- */
/* Desktop services dropdown                                                   */
/* -------------------------------------------------------------------------- */

/**
 * A disclosure, not a menubar.
 *
 * The ARIA menu pattern exists for application menus and brings expectations
 * this does not meet — arrow-key roving focus, typeahead, a menu that owns the
 * keyboard while open. This is a list of links, so it stays a button that
 * expands a panel of ordinary links: Tab moves through them, Escape closes and
 * returns focus to the button, and screen readers announce it as an expandable
 * button rather than promising navigation behaviour that is not there.
 *
 * The panel opens on hover for mouse users and on click or focus for everyone
 * else. `/services` itself stays reachable — it is the first link inside.
 */
function ServicesMenu({ label, active }: { label: string; active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // A short grace period, so a diagonal mouse path from the button to the
  // panel does not pass over a gap and dismiss the thing it is heading for.
  // Never closes out from under the keyboard: if focus is inside the panel,
  // the pointer wandering off must not strand that focus on a hidden element.
  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (containerRef.current?.contains(document.activeElement)) return;
      setOpen(false);
    }, 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <li
      ref={containerRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeSoon();
      }}
      // Deliberately no open-on-focus. Focus opening the panel would fight the
      // button's own toggle: tabbing to it would open the panel, and the Enter
      // press that a keyboard user then makes to open it would close it again.
      // So the keyboard opens it the ordinary way, with Enter or Space, and
      // focus leaving the panel closes it.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1.5 py-2 font-sans text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100 ${
          active || open
            ? "text-gold-400 after:scale-x-100"
            : "text-ink-200 hover:text-ink-50"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-300 ease-brand ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id="services-menu"
        hidden={!open}
        className="absolute top-full left-1/2 z-50 w-[min(48rem,calc(100vw-3rem))] -translate-x-1/2 pt-4"
      >
        <div className="border border-white/10 bg-navy-950/98 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <div className="grid grid-cols-3 gap-px bg-white/8">
            {serviceCategories.map((category) => (
              <div key={category.id} className="bg-navy-950 p-6">
                <p className="eyebrow font-sans text-[0.625rem]">
                  {category.label}
                </p>
                <ul className="mt-4 space-y-0.5">
                  {servicesInCategory(category.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-start gap-2.5 rounded-sm py-2 text-ink-300 transition-colors duration-200 hover:text-gold-400"
                      >
                        <ServiceIcon
                          name={service.icon}
                          className="mt-px h-4 w-4 shrink-0 text-gold-500/50 transition-colors duration-200 group-hover:text-gold-400"
                        />
                        <span className="font-sans text-[0.8125rem] leading-snug">
                          {service.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-6 border-t border-white/8 px-6 py-4">
            <p className="font-sans text-xs text-ink-400">
              {services.length} service areas, for individuals and businesses in
              all 50 states.
            </p>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase transition-colors hover:text-gold-300"
            >
              View all services
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1"
              >
                <path
                  d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile services disclosure                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The same twelve links inside the mobile panel. Tapping "Services" expands
 * the list rather than navigating, so the row keeps a separate link through to
 * the index page itself at the bottom of the list.
 */
function MobileServices({ label }: { label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-white/6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-services"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-display text-xl text-ink-50">{label}</span>
        <span
          aria-hidden="true"
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-brand ${
            open
              ? "rotate-45 border-gold-500 text-gold-400"
              : "border-white/15 text-ink-400"
          }`}
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
            <path
              d="M7 1.5v11M1.5 7h11"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        id="mobile-services"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-brand motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="border-l border-gold-500/25 pb-5 pl-4">
            {serviceCategories.map((category) => (
              <li key={category.id} className="mt-3 first:mt-1">
                <p className="eyebrow font-sans text-[0.625rem]">
                  {category.label}
                </p>
                <ul className="mt-1">
                  {servicesInCategory(category.id).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block py-2 font-sans text-[0.9375rem] text-ink-300"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="mt-4">
              <Link
                href="/services"
                className="font-sans text-sm font-semibold tracking-wide text-gold-400"
              >
                View all services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
