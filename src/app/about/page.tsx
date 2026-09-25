import type { Metadata } from "next";
import { ClosingCta } from "@/components/site/ClosingCta";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, valueProps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} has prepared taxes, run payroll and kept books from Huntingdon Valley, PA since ${site.foundedYear}, for clients in all 50 states.`,
  alternates: { canonical: "/about" },
};

/** What a new client can expect, step by step. */
const process = [
  {
    title: "A conversation first",
    body: "Before anything is quoted or filed, we talk about what you are actually dealing with. Some of those calls end with us telling someone they do not need to hire anyone.",
  },
  {
    title: "A plain answer on scope and cost",
    body: "You are told what we would handle, what it will cost, and what we need from you. No work starts until that is settled.",
  },
  {
    title: "The work, done by one person",
    body: "Your return or your payroll is prepared by the person you spoke to. Nothing is handed off to a name you have never heard.",
  },
  {
    title: "Someone to call afterwards",
    body: "Filing is not the end of it. Notices arrive, circumstances change, and questions come up in August. The same person picks up.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section
        data-surface="dark"
        className="relative isolate overflow-hidden bg-navy pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="warm-wash absolute inset-0 -z-10" />
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">About the firm</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
                A small practice,
                <span className="text-accent italic"> on purpose</span>
              </h1>
              <GoldRule weight="bold" className="mt-8 w-32" />
              <p className="mt-8 text-lg leading-relaxed text-ink-300">
                We have prepared returns and run payroll from the same
                Huntingdon Valley office since {site.foundedYear}. What began as
                a neighborhood practice now files for individuals, families and
                business owners in all 50 states &mdash; without becoming the
                kind of place where nobody knows your name.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Story */}
      <Section tone="paper" ariaLabelledBy="story-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="How we got here"
                id="story-heading"
                title="Three decades of other people's deadlines"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  The tax code has been rewritten more than once since{" "}
                  {site.foundedYear}. Rates have moved, credits have appeared
                  and lapsed, and the paperwork has migrated from folders to
                  portals. What has not changed is what people want from a
                  preparer: to be told the truth about their position, and to
                  have someone deal with the agencies on their behalf.
                </p>
                <p>
                  That is the whole basis of the practice. We stayed small
                  enough that the person who prepares your return is the person
                  who answers the phone, and we took on the work most firms find
                  inconvenient &mdash; multi-state filings, back taxes, audit
                  correspondence, the letters people are afraid to open.
                </p>
                <p>
                  Clients who moved out of Pennsylvania mostly stayed with us,
                  which is how a local practice ended up filing in all 50
                  states. Nothing about the process requires you to be in the
                  room.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* How we work */}
      <Section tone="paperRaised" ariaLabelledBy="process-heading">
        <Reveal>
          <SectionHeading
            eyebrow="What to expect"
            id="process-heading"
            title="How working with us actually goes"
            lead="No portals to figure out before you have spoken to anyone, and no proposal before we understand the problem."
          />
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={(i % 2) * 0.08} y={20}>
              <span
                aria-hidden="true"
                className="block font-display text-4xl leading-none text-accent/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                {step.title}
              </h3>
              <div aria-hidden="true" className="mt-4 h-px w-10 bg-accent/50" />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Why clients stay */}
      <Section tone="paper" ariaLabelledBy="values-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Why clients stay"
                id="values-heading"
                title="What you get that a bigger firm cannot sell you"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ButtonLink
                href="/services"
                variant="outline"
                size="md"
                className="mt-9"
              >
                See what we handle
                <ArrowIcon />
              </ButtonLink>
            </Reveal>
          </div>

          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {valueProps.map((prop, i) => (
              <Reveal as="li" key={prop.title} delay={(i % 2) * 0.08} y={20}>
                <h3 className="font-display text-xl leading-snug text-ink-50">
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

      {/* Where to find us */}
      <Section tone="paperRaised" ariaLabelledBy="office-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="The office"
                id="office-heading"
                title="Huntingdon Valley, and everywhere else"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  You are welcome to come in and sit down with your paperwork;
                  plenty of clients still do, and for a complicated year it is
                  often the fastest way through. Everyone else works with us by
                  phone and secure upload, and the returns are filed
                  electronically either way.
                </p>
              </div>
              <address className="mt-9 text-base not-italic">
                <p className="leading-relaxed text-ink-200">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}{" "}
                  {site.address.postalCode}
                </p>
                <p className="mt-4">
                  <a
                    href={site.phone.href}
                    className="text-accent transition-colors hover:text-accent-soft"
                  >
                    {site.phone.display}
                  </a>
                  <span aria-hidden="true" className="px-3 text-ink-400">
                    &middot;
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent transition-colors hover:text-accent-soft"
                  >
                    {site.email}
                  </a>
                </p>
              </address>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
