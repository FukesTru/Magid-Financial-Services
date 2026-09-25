import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/site/ClosingCta";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { serviceDetails } from "@/lib/service-details";
import {
  getService,
  serviceCategories,
  services,
  servicesByCategory,
  site,
} from "@/lib/site";

/** Prerender one route per service in lib/site.ts. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const detail = serviceDetails[slug];
  return {
    title: service.name,
    description: detail?.metaDescription ?? service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const detail = serviceDetails[slug];
  const category = serviceCategories.find((c) => c.key === service.category);
  const related = servicesByCategory(service.category).filter(
    (s) => s.slug !== service.slug,
  );

  return (
    <>
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-navy-900 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-xs tracking-wide text-ink-400">
                <li>
                  <Link href="/services" className="hover:text-accent-soft">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-ink-300">{category?.label}</li>
              </ol>
            </nav>

            <div className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="hidden h-14 w-14 shrink-0 place-items-center border border-accent/35 text-accent sm:grid"
              >
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <div className="max-w-3xl">
                <h1 className="font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
                  {service.name}
                </h1>
                <GoldRule weight="bold" className="mt-7 w-28" />
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-300">
              {detail?.intro ?? service.summary}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="gold" size="lg">
                Book a Consultation
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="outline" size="lg">
                {site.phone.display}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {detail && (
        <>
          {/* Scope */}
          <Section tone="light" ariaLabelledBy="covers-heading">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionHeading
                    eyebrow="Scope"
                    id="covers-heading"
                    title="What this covers"
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <Reveal delay={0.1}>
                  <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {detail.covers.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-accent"
                        >
                          <path
                            d="m3.5 8.5 3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </Section>

          {/* Who it is for, and what we need */}
          <Section tone="base">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <h2 className="font-display text-2xl leading-snug font-medium sm:text-3xl">
                  Who it&rsquo;s for
                </h2>
                <GoldRule className="mt-6" />
                <p className="mt-6 text-base leading-relaxed text-ink-300">
                  {detail.who}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl leading-snug font-medium sm:text-3xl">
                  What we&rsquo;ll need from you
                </h2>
                <GoldRule className="mt-6" />
                <ul className="mt-6 space-y-4">
                  {detail.needs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-ink-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-ink-400">
                  Not sure you have all of it? Send what you have. Working out
                  what is missing is part of the job.
                </p>
              </Reveal>
            </div>
          </Section>
        </>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section tone="light" ariaLabelledBy="related-heading">
          <Reveal>
            <SectionHeading
              eyebrow={category?.label}
              id="related-heading"
              title="Related services"
              lead={category?.blurb}
            />
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {related.map((s, i) => (
              <Reveal
                as="li"
                key={s.slug}
                delay={i * 0.07}
                y={18}
                className="bg-card"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 ease-brand hover:bg-card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center border border-accent/25 text-accent transition-all duration-300 ease-brand group-hover:border-accent/70 group-hover:text-accent-soft"
                  >
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-lg leading-snug text-ink-50 transition-colors duration-300 group-hover:text-accent-soft">
                    {s.name}
                  </h3>
                  <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                    {s.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <ClosingCta />
    </>
  );
}
