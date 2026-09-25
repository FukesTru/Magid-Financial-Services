import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/site/ClosingCta";
import { ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { serviceCategories, servicesByCategory, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tax preparation, payroll support, accounting, IRS audit representation and more — for individuals and businesses in Huntingdon Valley, PA and all 50 states.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section
        data-surface="dark"
        className="relative isolate overflow-hidden bg-navy pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="warm-wash absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">What we do</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
                Tax, payroll and accounting
                <span className="text-accent italic"> handled properly</span>
              </h1>
              <GoldRule weight="bold" className="mt-8 w-32" />
              <p className="mt-8 text-lg leading-relaxed text-ink-300">
                Whatever you came here for &mdash; a return, a payroll run, a
                letter from the IRS &mdash; it starts with a conversation about
                what you actually need. Then we handle it end to end, from our
                Huntingdon Valley office, for clients in all 50 states.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {serviceCategories.map((category, index) => (
        <Section
          key={category.key}
          id={category.key}
          tone={index % 2 === 0 ? "paper" : "paperRaised"}
          ariaLabelledBy={`${category.key}-heading`}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <h2
                  id={`${category.key}-heading`}
                  className="font-display text-3xl leading-tight font-medium sm:text-4xl"
                >
                  {category.label}
                </h2>
                <GoldRule className="mt-6" />
                <p className="mt-6 text-base leading-relaxed text-ink-300">
                  {category.blurb}
                </p>
              </Reveal>
            </div>

            <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:col-span-8">
              {servicesByCategory(category.key).map((service, i) => (
                <Reveal
                  as="li"
                  key={service.slug}
                  delay={(i % 2) * 0.07}
                  y={18}
                  className={"bg-card"}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col p-7 transition-colors duration-300 ease-brand hover:bg-card-hover"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center border border-accent/25 text-accent transition-all duration-300 ease-brand group-hover:border-accent/70 group-hover:bg-accent/10 group-hover:text-accent-soft"
                    >
                      <ServiceIcon name={service.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-lg leading-snug text-ink-50 transition-colors duration-300 group-hover:text-accent-soft">
                      {service.name}
                    </h3>
                    <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                      {service.summary}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase transition-colors duration-300 group-hover:text-accent-soft"
                    >
                      Learn more
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl leading-snug font-medium sm:text-3xl">
              Not sure which of these you need?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300">
              Most people are not, and that is fine. Describe the situation and
              we will tell you what it takes to sort out &mdash; including when
              the answer is that you do not need us.
            </p>
            <Link
              href={site.phone.href}
              className="group mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-accent transition-colors hover:text-accent-soft"
            >
              Call {site.phone.display}
              <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <ClosingCta />
    </>
  );
}
