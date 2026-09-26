import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Engraving } from "@/components/ui/Engraving";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valueProps } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <Section
      tone="navy"
      ariaLabelledBy="why-heading"
      className="isolate overflow-hidden"
    >
      {/* Third beat in the engraving rhythm: the hero crops its rosette off the
          right edge, this one off the left, and the closing CTA centres it. */}
      <Engraving
        variant="rosette"
        className="top-1/2 left-[-40%] -z-10 aspect-square w-[95%] -translate-y-1/2 text-brass opacity-[0.10] lg:left-[-24%] lg:w-[52%]"
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Why clients stay"
              id="why-heading"
              title="Four reasons the same families keep coming back"
              lead="Anyone can file a return once. Fewer can still answer the question in August."
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
                className="block font-display text-4xl leading-none text-accent/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                {prop.title}
              </h3>
              <div
                aria-hidden="true"
                className="mt-4 h-px w-10 bg-accent/50"
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
