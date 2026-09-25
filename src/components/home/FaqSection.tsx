import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, site } from "@/lib/site";

export function FaqSection() {
  return (
    <Section id="faq" tone="base" ariaLabelledBy="faq-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              id="faq-heading"
              title="Answers before you ask"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[0.9375rem] leading-relaxed text-ink-400">
              Do not see yours? Call{" "}
              <a
                href={site.phone.href}
                className="text-accent transition-colors hover:text-accent-soft"
              >
                {site.phone.display}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent transition-colors hover:text-accent-soft"
              >
                {site.email}
              </a>
              . We answer questions from prospective clients at no charge.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.12}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
