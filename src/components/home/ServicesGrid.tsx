import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/site";

export function ServicesGrid() {
  return (
    <Section id="services" tone="raised" ariaLabelledBy="services-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="lg:max-w-2xl">
          <SectionHeading
            eyebrow="What we do"
            id="services-heading"
            title="The paperwork we take off your desk"
            lead="Every engagement starts with a conversation about what you actually need — then we handle it end to end."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-sm font-semibold tracking-wide text-gold-400 transition-colors hover:text-gold-300"
          >
            View all services
            <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            as="li"
            key={service.slug}
            delay={(i % 3) * 0.07}
            y={18}
            className="bg-navy-850"
          >
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col p-7 transition-colors duration-300 ease-brand hover:bg-navy-800 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center border border-gold-500/25 text-gold-500 transition-all duration-300 ease-brand group-hover:border-gold-500/70 group-hover:bg-gold-500/10 group-hover:text-gold-400"
              >
                <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
              </span>

              <h3 className="mt-7 font-display text-xl leading-snug text-ink-50 transition-colors duration-300 group-hover:text-gold-400">
                {service.name}
              </h3>

              <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                {service.summary}
              </p>

              <span
                aria-hidden="true"
                className="mt-7 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase transition-colors duration-300 group-hover:text-gold-400"
              >
                Learn more
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
