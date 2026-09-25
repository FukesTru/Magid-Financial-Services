import Link from "next/link";
import { ClosingCta } from "@/components/site/ClosingCta";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import {
  type ServiceCategory,
  serviceCategories,
  servicesByCategory,
  site,
} from "@/lib/site";

/**
 * Landing page for one service category — the layer between /services and the
 * individual service pages. Someone arriving from a search for "payroll
 * services near me" should not have to read about debt settlement first.
 */
export function ServiceCategoryPage({
  categoryKey,
}: {
  categoryKey: ServiceCategory;
}) {
  const category = serviceCategories.find((c) => c.key === categoryKey)!;
  const services = servicesByCategory(categoryKey);
  const others = serviceCategories.filter((c) => c.key !== categoryKey);

  return (
    <>
      <section
        data-surface="dark"
        className="relative isolate overflow-hidden bg-navy pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="warm-wash absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-xs tracking-wide text-ink-400">
                <li>
                  <Link href="/services" className="hover:text-accent">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-ink-300">{category.label}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="eyebrow">For {category.label.toLowerCase()}</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
                {category.blurb}
              </h1>
              <GoldRule weight="bold" className="mt-8 w-32" />
              <p className="mt-8 text-lg leading-relaxed text-ink-300">
                {category.intro}
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
            </div>
          </Reveal>
        </Container>
      </section>

      <Section tone="paper" ariaLabelledBy="cat-services-heading">
        <Reveal>
          <SectionHeading
            eyebrow="What we handle"
            id="cat-services-heading"
            title={`${category.label} — what we take on`}
          />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.slug}
              delay={(i % 2) * 0.07}
              y={18}
              className="bg-card"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-300 ease-brand hover:bg-card-hover sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center border border-accent/25 text-accent transition-all duration-300 ease-brand group-hover:border-accent/70 group-hover:bg-accent/10"
                >
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-lg leading-snug text-ink-50 transition-colors duration-300 group-hover:text-accent">
                  {service.name}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                  {service.summary}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase transition-colors duration-300 group-hover:text-accent"
                >
                  Learn more
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="paperRaised" ariaLabelledBy="other-cats-heading">
        <Reveal>
          <SectionHeading
            eyebrow="Also on the desk"
            id="other-cats-heading"
            title="Not what you came for?"
            lead="Plenty of clients need more than one of these. They are handled by the same people, with the same file."
          />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {others.map((other, i) => (
            <Reveal as="li" key={other.key} delay={i * 0.07} className="bg-card">
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full flex-col p-8 transition-colors duration-300 ease-brand hover:bg-card-hover"
              >
                <h3 className="font-display text-xl text-ink-50 transition-colors duration-300 group-hover:text-accent">
                  {other.label}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                  {other.blurb}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-accent uppercase"
                >
                  See these
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
