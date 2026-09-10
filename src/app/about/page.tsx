import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/site/PageHero";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { serviceCategories, site, valueProps, yearsInBusiness } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Magid Financial Services has prepared taxes, run payroll, and kept books for individuals and businesses from Huntingdon Valley, PA since ${site.foundedYear}.`,
  alternates: { canonical: "/about" },
};

/**
 * ---------------------------------------------------------------------------
 * A NOTE ON WHAT THIS PAGE DOES NOT CLAIM
 *
 * No staff names, no headshots, no professional credentials (CPA, EA), no
 * client counts, no awards, no founding anecdote. None of that was supplied,
 * and an About page is the single worst place to invent it — it is the page a
 * prospective client reads to decide whether to trust the firm, and the page a
 * licensing board would read if a credential were overstated.
 *
 * Everything below is drawn from facts already in `src/lib/site.ts`: founded
 * 1989, Huntingdon Valley, all 50 states, twelve service areas, and the four
 * value propositions. When the client supplies bios and credentials, add them
 * to site.ts and extend this page.
 * ---------------------------------------------------------------------------
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={
          <>
            A practice built on
            <span className="text-gold-400 italic"> knowing your file</span>
          </>
        }
        lead={`Since ${site.foundedYear}, from one office in Huntingdon Valley, Pennsylvania — for individuals, families and business owners in all 50 states.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section tone="raised" ariaLabelledBy="story-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="The practice"
                id="story-heading"
                title={
                  <>
                    {yearsInBusiness} years in
                    <span className="text-gold-400 italic"> one place</span>
                  </>
                }
              />
            </Reveal>

            {photos.aboutPortrait && (
              <Reveal delay={0.14}>
                <PhotoFrame
                  photo={photos.aboutPortrait}
                  className="mt-10 aspect-4/5 w-full max-w-sm"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  Magid Financial Services has prepared returns and run payroll
                  from the same Huntingdon Valley office since {site.foundedYear}.
                  What began as a neighbourhood practice &mdash; walk-ins,
                  referrals, people from a few streets over &mdash; now files
                  for individuals, families and business owners in all 50
                  states.
                </p>
                <p>
                  Most of that growth came from clients who moved away and did
                  not want to start over with someone new. They took a job in
                  another state, or retired somewhere warmer, and kept sending
                  their documents here. Nothing about preparing a return
                  requires you to be in the room, and it turns out that once
                  someone knows your file, that is worth more than proximity.
                </p>
                <p>
                  We have worked through every major change in tax law since
                  {" "}{site.foundedYear}. That is not a claim to have seen
                  everything &mdash; nobody has &mdash; but it does mean that
                  when something unusual lands on the desk, it is usually a
                  variation on something we have handled before rather than a
                  blank page.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden border border-white/8 bg-white/8">
                {[
                  { value: `${yearsInBusiness}+`, label: "Years in practice" },
                  { value: "50", label: "States served" },
                  { value: "12", label: "Service areas" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-navy-900 px-4 py-6 sm:px-5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl text-gold-400">
                        {stat.value}
                      </span>
                      <span className="mt-2 block font-sans text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="base" ariaLabelledBy="how-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="How we work"
                id="how-heading"
                title="Four things that have not changed"
                lead="Tax work is a relationship, not a transaction. Here is what ours looks like."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ButtonLink href="/contact" variant="outline" size="md" className="mt-9">
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
                <div aria-hidden="true" className="mt-4 h-px w-10 bg-gold-500/50" />
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                  {prop.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="raised" ariaLabelledBy="who-heading">
        <Reveal>
          <SectionHeading
            eyebrow="Who we work with"
            id="who-heading"
            align="center"
            title="Three kinds of conversation"
            lead="Most of what arrives falls into one of these, and often a client moves between them over the years."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden border border-white/8 bg-white/8 lg:grid-cols-3">
          {serviceCategories.map((category, i) => (
            <Reveal as="li" key={category.id} delay={i * 0.08} className="bg-navy-850">
              <div className="flex h-full flex-col p-8">
                <span
                  aria-hidden="true"
                  className="block font-display text-4xl leading-none text-gold-500/35"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                  {category.label}
                </h3>
                <div aria-hidden="true" className="mt-4 h-px w-10 bg-gold-500/50" />
                <p className="mt-4 grow text-[0.9375rem] leading-relaxed text-ink-300">
                  {category.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="base" ariaLabelledBy="reach-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Where we work"
                id="reach-heading"
                title={
                  <>
                    Huntingdon Valley,
                    <span className="text-gold-400 italic"> and all 50 states</span>
                  </>
                }
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  The office is at {site.address.street},{" "}
                  {site.address.locality}, and clients in Montgomery and Bucks
                  counties are welcome to bring their documents in and sit down
                  with us. Pennsylvania filers get the local earned income and
                  school district returns prepared alongside the federal one,
                  which is the part most preparers from out of state miss.
                </p>
                <p>
                  Everyone else works with us by phone, email and secure upload
                  &mdash; the same service, minus the drive. We handle
                  multi-state filings for people who moved mid-year, work
                  remotely across a state line, or run a business that sells
                  into several states.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <address className="mt-10 border border-white/8 bg-navy-850 p-7 text-sm not-italic">
                <p className="text-ink-300">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}{" "}
                  {site.address.postalCode}
                </p>
                <p className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
                  <a
                    href={site.phone.href}
                    className="text-gold-400 transition-colors hover:text-gold-300"
                  >
                    {site.phone.display}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-gold-400 transition-colors hover:text-gold-300"
                  >
                    {site.email}
                  </a>
                </p>
              </address>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Ready when you are"
        title={
          <>
            Start with a
            <span className="text-gold-400 italic"> conversation</span>
          </>
        }
        body="It costs nothing, carries no obligation, and you will leave it knowing what we would do and what it would involve."
      />
    </>
  );
}
