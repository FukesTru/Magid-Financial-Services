import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isDeliveryConfigured } from "@/lib/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free consultation with Magid Financial Services. Call ${site.phone.display} or visit our office at ${site.address.street}, ${site.address.locality}, ${site.address.region}.`,
  alternates: { canonical: "/contact" },
};

const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
);

export default function ContactPage() {
  // Decided on the server: with no delivery provider configured the form
  // composes the message in the visitor's own mail client rather than
  // accepting it and dropping it. See src/lib/contact.ts.
  const canDeliver = isDeliveryConfigured();

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Book your
            <span className="text-gold-400 italic"> free consultation</span>
          </>
        }
        lead="Tell us what you are dealing with — a return, a payroll schedule, a letter you would rather not open — and we will tell you exactly what comes next. The first conversation costs nothing and carries no obligation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section tone="raised" ariaLabelledBy="contact-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Direct contact details first: some people want the phone number,
              not a form, and making them scroll past one to find it is rude. */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Reach us directly"
                id="contact-heading"
                title="However you prefer"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 space-y-px overflow-hidden border border-white/8 bg-white/8">
                <div className="bg-navy-900 p-6">
                  <dt className="eyebrow font-sans text-[0.625rem]">Phone</dt>
                  <dd className="mt-3">
                    <a
                      href={site.phone.href}
                      className="font-display text-2xl text-gold-400 transition-colors hover:text-gold-300"
                    >
                      {site.phone.display}
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      The fastest route to an answer, and it reaches a person
                      rather than a queue.
                    </p>
                  </dd>
                </div>

                <div className="bg-navy-900 p-6">
                  <dt className="eyebrow font-sans text-[0.625rem]">Email</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-sans text-lg break-all text-ink-100 transition-colors hover:text-gold-400"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>

                <div className="bg-navy-900 p-6">
                  <dt className="eyebrow font-sans text-[0.625rem]">Office</dt>
                  <dd className="mt-3">
                    <address className="text-[0.9375rem] leading-relaxed text-ink-200 not-italic">
                      {site.address.street}
                      <br />
                      {site.address.locality}, {site.address.region}{" "}
                      {site.address.postalCode}
                    </address>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 font-sans text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
                    >
                      Get directions
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          d="M6 3h7v7M13 3 4 12"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </dd>
                </div>

                <div className="bg-navy-900 p-6">
                  <dt className="eyebrow font-sans text-[0.625rem]">Hours</dt>
                  <dd className="mt-3">
                    {site.hours ? (
                      <ul className="space-y-2 text-[0.9375rem] text-ink-200">
                        {site.hours.map((entry) => (
                          <li key={entry.days} className="flex justify-between gap-6">
                            <span>{entry.days}</span>
                            <span className="text-ink-400">{entry.hours}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      /* Deliberately not guessed — see `hours` in lib/site.ts. */
                      <p className="text-[0.9375rem] leading-relaxed text-ink-300">
                        Hours shift through tax season, so please call for
                        today&rsquo;s. Outside them, email reaches us and we
                        answer as soon as we are back at the desk.
                      </p>
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <h2 className="font-display text-2xl leading-snug font-medium sm:text-3xl">
                Or send us the details
              </h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink-300">
                A sentence or two is enough to start. You will hear back from a
                person who has read it, usually within one business day.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9">
                <ContactForm canDeliver={canDeliver} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="base" ariaLabelledBy="expect-heading">
        <Reveal>
          <SectionHeading
            eyebrow="What happens next"
            id="expect-heading"
            align="center"
            title="No pressure, and no surprise invoice"
            lead="The first conversation is genuinely free. Here is what it looks like."
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden border border-white/8 bg-white/8 lg:grid-cols-3">
          {[
            {
              title: "We listen first",
              body: "You describe the situation. We ask the questions that actually change the answer, and we do not need every document in front of us to have that conversation.",
            },
            {
              title: "We tell you plainly",
              body: "What we would do, what it involves, and what it will cost. If you do not need us, we will say that too — it happens, and it is cheaper for everyone than finding out later.",
            },
            {
              title: "You decide",
              body: "No obligation and no follow-up campaign. If you want to go ahead, we send a short list of what to gather and get started.",
            },
          ].map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="bg-navy-850">
              <div className="flex h-full flex-col p-8">
                <span
                  aria-hidden="true"
                  className="block font-display text-4xl leading-none text-gold-500/35"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                  {item.title}
                </h3>
                <div aria-hidden="true" className="mt-4 h-px w-10 bg-gold-500/50" />
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="deep" ariaLabelledBy="privacy-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Your documents"
                id="privacy-heading"
                title={
                  <>
                    Sent securely,
                    <span className="text-gold-400 italic"> not by plain email</span>
                  </>
                }
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                <p>
                  Please do not put Social Security numbers, account numbers or
                  scans of tax documents into the form above or into ordinary
                  email &mdash; neither is a safe place for them. Once we are in
                  touch we will give you a secure way to send everything across.
                </p>
                <p>
                  Your information is used only to prepare and file your returns
                  and to carry out the work you engage us for. We do not sell
                  client data. Physical files are kept locked at the office,
                  access is limited to the staff working on your account, and as
                  a paid preparer we are bound by IRS Circular 230 and the
                  federal confidentiality rules that govern tax practitioners.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 text-[0.9375rem] text-ink-400">
                More questions answered in the{" "}
                <Link
                  href="/#faq"
                  className="text-gold-400 transition-colors hover:text-gold-300"
                >
                  frequently asked questions
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <ContactJsonLd />
    </>
  );
}
