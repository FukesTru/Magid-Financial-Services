import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";

export type Crumb = { label: string; href?: string };

/**
 * The opening block of every page below the homepage.
 *
 * The homepage hero is a full-height statement piece; this is its working
 * counterpart — same ground treatment and the same typographic scale one step
 * down, so an interior page is recognisably the same site without competing
 * with the front door. It replaces the `ComingSoon` shell that stood in for
 * these pages while they were being written.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Trailing crumb is the current page and is not linked. */
  crumbs?: Crumb[];
  /** Buttons or other actions, rendered under the lead. */
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="ledger-grid absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container>
        {crumbs && crumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-ink-400">
                {crumbs.map((crumb, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={crumb.label} className="flex items-center gap-2">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-ink-400/50">
                          /
                        </span>
                      )}
                      {crumb.href && !last ? (
                        <Link
                          href={crumb.href}
                          className="transition-colors hover:text-gold-400"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span aria-current={last ? "page" : undefined} className="text-ink-300">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[2rem] leading-[1.12] font-medium text-ink-50 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <GoldRule weight="bold" className="mt-8 w-32" />
          </Reveal>
          {lead && (
            <Reveal delay={0.18}>
              <p className="mt-8 text-lg leading-relaxed text-ink-300">{lead}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
