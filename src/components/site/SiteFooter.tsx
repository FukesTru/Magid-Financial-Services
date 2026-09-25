import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { photoCredits } from "@/lib/images";
import { primaryNav, services, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/**
 * Site-wide footer. Carries the full NAP block so the business's name,
 * address, and phone appear identically on every page.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { address } = site;
  const credits = photoCredits();

  return (
    <footer className="border-t border-line bg-navy-950">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand + address */}
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-400">
              Payroll, tax, and accounting for individuals and businesses —
              from our Huntingdon Valley office to clients in all 50 states
              since {site.foundedYear}.
            </p>

            <address className="mt-7 space-y-3 text-sm not-italic">
              <p className="text-ink-300">
                {address.street}
                <br />
                {address.locality}, {address.region} {address.postalCode}
              </p>
              <p>
                <a
                  href={site.phone.href}
                  className="text-ink-200 transition-colors hover:text-accent-soft"
                >
                  {site.phone.display}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-200 transition-colors hover:text-accent-soft"
                >
                  {site.email}
                </a>
              </p>
            </address>

            {site.socials.length > 0 && (
              <ul className="mt-7 flex gap-4">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      className="text-sm text-ink-400 transition-colors hover:text-accent-soft"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-5">
            <h2
              id="footer-services"
              className="eyebrow font-sans text-[0.6875rem]"
            >
              Services
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-ink-300 transition-colors hover:text-accent-soft"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-3">
            <h2
              id="footer-company"
              className="eyebrow font-sans text-[0.6875rem]"
            >
              Company
            </h2>
            <ul className="mt-6 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 transition-colors hover:text-accent-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-ink-300 transition-colors hover:text-accent-soft"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-400">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Serving clients in all 50 states since {site.foundedYear}.
          </p>
        </div>

        {/* The Unsplash License asks that photographers be credited wherever
            their work is used. Collected here so the credit is given once,
            without cluttering the sections the photos appear in. */}
        {credits.length > 0 && (
          <p className="mt-6 text-xs text-ink-400">
            Photography by{" "}
            {credits.map((credit, i) => (
              <span key={credit.url}>
                {i > 0 && (i === credits.length - 1 ? " and " : ", ")}
                <a
                  href={credit.url}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-accent-soft"
                >
                  {credit.name}
                </a>
              </span>
            ))}{" "}
            on{" "}
            <a
              href="https://unsplash.com"
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-accent-soft"
            >
              Unsplash
            </a>
            .
          </p>
        )}
      </Container>
    </footer>
  );
}
