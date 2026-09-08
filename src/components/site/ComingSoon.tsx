import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { site } from "@/lib/site";

/**
 * ---------------------------------------------------------------------------
 * PLACEHOLDER ROUTE SHELL
 *
 * The homepage links to /about, /services, /contact and twelve service pages.
 * Those pages are still to be built (pages 2..N of this project); this shell
 * keeps every link resolving to a real, on-brand page instead of a 404 in the
 * meantime. Replace each route's content as the page is designed — the shell
 * itself can then be deleted.
 * ---------------------------------------------------------------------------
 */
export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-40 pb-28 sm:pt-48 sm:pb-32">
      <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
            {title}
          </h1>
          <GoldRule weight="bold" className="mt-8 w-32" />
          <p className="mt-8 text-lg leading-relaxed text-ink-300">{body}</p>
          <p className="mt-6 text-base leading-relaxed text-ink-400">
            This page is being written. In the meantime, call{" "}
            <a
              href={site.phone.href}
              className="text-gold-400 transition-colors hover:text-gold-300"
            >
              {site.phone.display}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-gold-400 transition-colors hover:text-gold-300"
            >
              {site.email}
            </a>{" "}
            and we will answer directly.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={site.phone.href} variant="gold" size="lg">
              Call {site.phone.display}
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">
              Back to home
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
