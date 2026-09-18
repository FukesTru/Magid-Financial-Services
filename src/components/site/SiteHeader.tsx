"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import {
  primaryNav,
  serviceCategories,
  servicesByCategory,
  site,
} from "@/lib/site";
import { ServicesPanel } from "./ServicesPanel";
import { Wordmark } from "./Wordmark";

/** How long the dropdown waits before closing when the pointer leaves. */
const CLOSE_DELAY_MS = 140;

/**
 * Sticky site header. Transparent while it sits over the hero, then solid
 * navy with a hairline once the visitor scrolls past it.
 *
 * The Services item is both a link and a dropdown trigger. Those are kept as
 * two separate controls — the label navigates, an adjacent chevron button
 * toggles the panel — so the menu is reachable by keyboard and touch without
 * the label becoming a control that does two different things depending on
 * input device.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus whenever navigation happens. Adjusting state during
  // render (rather than in an effect) keeps this to a single render pass and
  // covers back/forward navigation as well as taps on the menus' own links.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  /* --- Dropdown hover intent -------------------------------------------- */
  // The panel sits outside the nav item in the DOM so it can span the header
  // without overflowing, which means the pointer "leaves" the trigger on its
  // way there. A short grace period bridges that gap.
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openServices = useCallback(() => {
    cancelClose();
    setServicesOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(
      () => setServicesOpen(false),
      CLOSE_DELAY_MS,
    );
  }, [cancelClose]);

  /**
   * Hover-to-open, but only for a real mouse. Touch fires an emulated
   * pointerenter before the tap's click, which opened the panel and then let
   * the click toggle it shut again — so a tap appeared to do nothing.
   */
  const onPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") openServices();
    },
    [openServices],
  );

  const onPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") scheduleClose();
    },
    [scheduleClose],
  );

  /**
   * Activating the trigger moves focus into the panel, so a keyboard user
   * reaches the services rather than tabbing on through the rest of the nav.
   * Hover-opening deliberately does not touch focus.
   */
  const toggleServices = useCallback(() => {
    setServicesOpen((wasOpen) => {
      if (!wasOpen) {
        requestAnimationFrame(() =>
          panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
        );
      }
      return !wasOpen;
    });
  }, []);

  useEffect(() => cancelClose, [cancelClose]);

  // Escape closes whichever menu is open; a click outside closes the dropdown.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-services-menu]")) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen]);

  // Trap the page behind the open mobile menu and allow Escape to dismiss it.
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

  const solid = scrolled || menuOpen || servicesOpen;

  const linkClass = (active: boolean) =>
    `relative py-2 font-sans text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100 ${
      active
        ? "text-gold-400 after:scale-x-100"
        : "text-ink-200 hover:text-ink-50"
    }`;

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

              if (item.href !== "/services") {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={linkClass(active)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  data-services-menu
                  className="flex items-center gap-1"
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClass(active)}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="services-dropdown"
                    aria-label={
                      servicesOpen ? "Hide services menu" : "Show services menu"
                    }
                    // Deliberately no onFocus handler: focusing this button
                    // used to open the panel, and the click that followed
                    // immediately toggled it shut again. Keyboard users open
                    // it by activating the button, which is also less
                    // disorienting than a menu springing open while tabbing.
                    ref={triggerRef}
                    onClick={toggleServices}
                    className="grid h-6 w-5 place-items-center text-ink-400 transition-colors hover:text-gold-400"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className={`h-3 w-3 transition-transform duration-300 ease-brand ${
                        servicesOpen ? "rotate-180" : ""
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

      {/* Services dropdown — spans the header so twelve links fit without
          overflowing the viewport at narrower desktop widths.

          The `hidden` attribute is doing the hiding rather than a class, and
          it beats the `lg:block` beside it because Tailwind's preflight marks
          `[hidden]` as `display: none !important`. Swapping it for a class
          would need `lg:block` made conditional too. */}
      <div
        id="services-dropdown"
        data-services-menu
        hidden={!servicesOpen}
        ref={panelRef}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="absolute inset-x-0 top-full hidden border-t border-white/8 bg-navy-950 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] lg:block"
      >
        <ServicesPanel onNavigate={() => setServicesOpen(false)} />
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
                <li key={item.href} className="border-b border-white/6">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="block py-4 font-display text-xl text-ink-50"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services"
                      aria-label={
                        mobileServicesOpen
                          ? "Hide services list"
                          : "Show services list"
                      }
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="grid h-11 w-11 place-items-center text-ink-400"
                    >
                      <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-brand ${
                          mobileServicesOpen ? "rotate-45" : ""
                        }`}
                      >
                        <path
                          d="M7 1.5v11M1.5 7h11"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    id="mobile-services"
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-brand motion-reduce:transition-none ${
                      mobileServicesOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-6 pb-6">
                        {serviceCategories.map((category) => (
                          <div key={category.key}>
                            <p className="font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-gold-500 uppercase">
                              {category.label}
                            </p>
                            <ul className="mt-3 space-y-2.5">
                              {servicesByCategory(category.key).map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="flex items-center gap-3 text-[0.9375rem] text-ink-300"
                                  >
                                    <ServiceIcon
                                      name={s.icon}
                                      className="h-4 w-4 shrink-0 text-gold-500/70"
                                    />
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
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
