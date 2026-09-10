import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/site/PageHero";
import { ArrowIcon } from "@/components/ui/Button";
import { CardPhoto } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { servicePhoto } from "@/lib/images";
import { serviceContent } from "@/lib/service-content";
import {
  serviceCategories,
  services,
  servicesInCategory,
  site,
  yearsInBusiness,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tax preparation, payroll support, accounting, IRS audit representation and more — twelve service areas for individuals and businesses in all 50 states.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Twelve service areas,
            <span className="text-gold-400 italic"> one practice</span>
          </>
        }
        lead={`Individual returns, business filings, payroll, planning, and the resolution work that follows when something has gone wrong. All of it handled from our Huntingdon Valley office, for clients in all 50 states, since ${site.foundedYear}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {serviceCategories.map((category, categoryIndex) => (
        <Section
          key={category.id}
          id={category.id}
          tone={categoryIndex % 2 === 0 ? "raised" : "base"}
          ariaLabelledBy={`${category.id}-heading`}
        >
          <Reveal>
            <SectionHeading
              eyebrow={`0${categoryIndex + 1}`}
              id={`${category.id}-heading`}
              title={category.label}
              lead={category.blurb}
            />
          </Reveal>

          <ul className="mt-12 grid gap-px overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-2">
            {servicesInCategory(category.id).map((service, i) => {
              const photo = servicePhoto(service.slug);
              const surface = categoryIndex % 2 === 0 ? "bg-navy-900" : "bg-navy-850";

              return (
                <Reveal
                  as="li"
                  key={service.slug}
                  delay={(i % 2) * 0.07}
                  y={18}
                  className={surface}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className={`group flex h-full flex-col transition-colors duration-300 ease-brand ${
                      categoryIndex % 2 === 0
                        ? "hover:bg-navy-850"
                        : "hover:bg-navy-800"
                    }`}
                  >
                    {photo && (
                      <CardPhoto
                        photo={photo}
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    )}

                    <div className="flex grow flex-col p-7 sm:p-8">
                      <span
                        aria-hidden="true"
                        className="grid h-11 w-11 shrink-0 place-items-center border border-gold-500/25 text-gold-500 transition-all duration-300 ease-brand group-hover:border-gold-500/70 group-hover:bg-gold-500/10 group-hover:text-gold-400"
                      >
                        <ServiceIcon name={service.icon} className="h-5 w-5" />
                      </span>

                      <h3 className="mt-6 font-display text-xl leading-snug text-ink-50 transition-colors duration-300 group-hover:text-gold-400">
                        {service.name}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-400">
                        {service.summary}
                      </p>

                      {/*
                        The index is where someone decides which page to open,
                        so each card shows the two things the service actually
                        covers rather than making them click to find out.
                      */}
                      <ul className="mt-5 grow space-y-1.5">
                        {serviceContent[service.slug].includes
                          .slice(0, 2)
                          .map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-300"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-px w-3 shrink-0 bg-gold-500/50"
                              />
                              {item}
                            </li>
                          ))}
                      </ul>

                      <span
                        aria-hidden="true"
                        className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase transition-colors duration-300 group-hover:text-gold-400"
                      >
                        Learn more
                        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Section>
      ))}

      <Section tone="deep" ariaLabelledBy="not-sure-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Not sure which you need"
                id="not-sure-heading"
                title="Most people arrive with a situation, not a service"
                lead="Nobody wakes up needing “tax problem consulting.” They have a letter, a deadline, or a business that has outgrown a shoebox of receipts."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  Describe what is actually in front of you and we will tell you
                  which of the {services.length} areas above it falls under
                  &mdash; or that it does not need us at all, which happens more
                  often than you would expect from a firm that bills by the
                  engagement.
                </p>
                <p>
                  The first conversation costs nothing and carries no
                  obligation. After {yearsInBusiness} years, most of what
                  arrives is something we have seen before.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-gold-400 transition-colors hover:text-gold-300"
                >
                  Describe your situation
                  <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                </Link>
                <a
                  href={site.phone.href}
                  className="font-sans text-sm text-ink-300 transition-colors hover:text-gold-400 sm:ml-6"
                >
                  or call {site.phone.display}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Ready when you are"
        title={
          <>
            Tell us what you are
            <span className="text-gold-400 italic"> dealing with</span>
          </>
        }
        body="A return, a payroll schedule, a letter you would rather not open. The first conversation is free, and you will leave it knowing exactly what comes next."
      />
    </>
  );
}
