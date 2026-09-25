import type { Metadata } from "next";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "What to bring, how to get started, what it costs, what to do about an IRS letter, and how your information is kept private. Answers from a practice filing since 1989.",
  alternates: { canonical: "/faq" },
};

/** FAQ schema for the page that actually carries every question. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Questions</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
                Answers before you ask
              </h1>
              <GoldRule weight="bold" className="mt-8 w-32" />
              <p className="mt-8 text-lg leading-relaxed text-ink-300">
                The questions people actually put to us, answered as plainly as
                we would answer them on the phone. If yours is not here, it is
                worth a call &mdash; we answer questions from prospective
                clients at no charge.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={site.phone.href} variant="gold" size="lg">
                  Call {site.phone.display}
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Send a question
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section tone="light" ariaLabelledBy="all-faq-heading">
        <h2 id="all-faq-heading" className="sr-only">
          All questions
        </h2>
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
