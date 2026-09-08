import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valueProps } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <Section tone="base" ariaLabelledBy="why-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Why clients stay"
              id="why-heading"
              title="Four reasons the same families keep coming back"
              lead="Tax work is a relationship, not a transaction. Here is what ours looks like."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ButtonLink
              href="/contact"
              variant="outline"
              size="md"
              className="mt-9"
            >
              Talk to us
              <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {valueProps.map((prop, i) => (
            <Reveal as="li" key={prop.title} delay={(i % 2) * 0.08} y={20}>
              <span
                aria-hidden="true"
                className="block font-display text-4xl leading-none text-gold-500/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                {prop.title}
              </h3>
              <div
                aria-hidden="true"
                className="mt-4 h-px w-10 bg-gold-500/50"
              />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                {prop.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
