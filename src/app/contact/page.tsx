import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/site/LeadForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free consultation with ${site.name}. Call ${site.phone.display} or visit our office at ${site.address.street}, ${site.address.locality}, ${site.address.region}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { address } = site;

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-36 pb-24 sm:pt-44 sm:pb-28">
      <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />

      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.12] font-medium text-ink-50 sm:text-5xl">
              Book your free consultation
            </h1>
            <GoldRule weight="bold" className="mt-8 w-32" />
            <p className="mt-8 text-lg leading-relaxed text-ink-300">
              Tell us what you are dealing with &mdash; a return, a payroll
              schedule, a letter you would rather not open &mdash; and we will
              tell you exactly what comes next.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-4">
            <Reveal delay={0.08}>
              <h2 className="font-display text-xl text-ink-50">
                Reach us directly
              </h2>
              <div
                aria-hidden="true"
                className="mt-4 h-px w-10 bg-gold-500/50"
              />

              <address className="mt-7 space-y-6 text-sm not-italic">
                <div>
                  <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    Office
                  </p>
                  <p className="mt-2 leading-relaxed text-ink-300">
                    {address.street}
                    <br />
                    {address.locality}, {address.region} {address.postalCode}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    Phone
                  </p>
                  <p className="mt-2">
                    <a
                      href={site.phone.href}
                      className="text-ink-200 transition-colors hover:text-gold-400"
                    >
                      {site.phone.display}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    Email
                  </p>
                  <p className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink-200 transition-colors hover:text-gold-400"
                    >
                      {site.email}
                    </a>
                  </p>
                </div>
              </address>

              <p className="mt-8 text-sm leading-relaxed text-ink-400">
                Prefer to talk it through? Call during office hours and ask for
                whoever handles new enquiries. We serve clients in all 50
                states, so distance is not a problem &mdash; most of our work
                is done by phone and secure upload.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <h2 className="mt-12 font-display text-xl text-ink-50">
                What happens next
              </h2>
              <div aria-hidden="true" className="mt-4 h-px w-10 bg-gold-500/50" />
              <ol className="mt-7 space-y-6">
                {[
                  {
                    title: "We read what you sent",
                    body: "A preparer reads it and works out what your situation actually needs, rather than sorting it into a queue.",
                  },
                  {
                    title: "We tell you what it involves",
                    body: "What we would handle, what it will cost, and what we need from you. Sometimes the answer is that you do not need to hire anyone.",
                  },
                  {
                    title: "You decide",
                    body: "Nothing starts until scope and cost are settled. The consultation itself is free either way.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-xl leading-none text-gold-500/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-sans text-sm font-semibold text-ink-200">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-ink-400">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-8">
            <Reveal delay={0.14}>
              <h2 className="sr-only">Enquiry form</h2>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
