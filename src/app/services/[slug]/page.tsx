import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/site/PageHero";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { servicePhoto } from "@/lib/images";
import { serviceContent } from "@/lib/service-content";
import {
  getService,
  serviceCategories,
  services,
  servicesInCategory,
  site,
} from "@/lib/site";

/** Prerender one route per service in lib/site.ts. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.name,
    // The lead reads better as a meta description than the one-line card
    // summary does, and it is the sentence the page actually opens with.
    description: serviceContent[service.slug].lead,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const content = serviceContent[service.slug];
  const photo = servicePhoto(service.slug);
  const category = serviceCategories.find((c) => c.id === service.category)!;

  // Everything else in this category, for onward navigation at the foot of the
  // page. Three is enough to be useful without turning into another index.
  const related = servicesInCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={category.label}
        title={service.name}
        lead={content.lead}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <ButtonLink href="/contact" variant="gold" size="lg">
          Book a Consultation
          <ArrowIcon />
        </ButtonLink>
        <ButtonLink href={site.phone.href} variant="outline" size="lg">
          {site.phone.display}
        </ButtonLink>
      </PageHero>

      <Section tone="raised" ariaLabelledBy="overview-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <span
                aria-hidden="true"
                className="grid h-14 w-14 place-items-center border border-gold-500/30 text-gold-500"
              >
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <h2
                id="overview-heading"
                className="mt-7 font-display text-2xl leading-snug font-medium sm:text-3xl"
              >
                What this actually involves
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-ink-300 sm:text-lg">
                {content.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="base" ariaLabelledBy="includes-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="What's included"
                id="includes-heading"
                title={
                  <>
                    Everything the engagement
                    <span className="text-gold-400 italic"> covers</span>
                  </>
                }
                lead="No line-by-line billing for questions. If it falls inside the work below, it is part of the work."
              />
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 border border-white/8 bg-navy-850 p-7">
                <p className="eyebrow font-sans text-[0.625rem]">Who it suits</p>
                <ul className="mt-5 space-y-4">
                  {content.goodFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-300"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-gold-500"
                      >
                        <path
                          d="M3 8.5 6.5 12 13 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ul className="grid gap-px overflow-hidden border border-white/8 bg-white/8">
                {content.includes.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-5 bg-navy-900 px-6 py-5 sm:px-7"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-display text-sm text-gold-500/60 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* How it works — identical on every service page, because it is. */}
      <Section tone="raised" ariaLabelledBy="process-heading">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            id="process-heading"
            align="center"
            title="Three steps, and none of them is a queue"
            lead="The person you speak to first is the person who does the work."
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden border border-white/8 bg-white/8 lg:grid-cols-3">
          {[
            {
              step: "A conversation, at no cost",
              body: "Call or send a message describing the situation. We will tell you what we would do, what it involves, and whether you actually need us.",
            },
            {
              step: "Documents, however suits you",
              body: "Bring them to the Huntingdon Valley office, or send them by secure upload. Nothing about the process requires you to be in the room.",
            },
            {
              step: "The work, then the follow-up",
              body: "We prepare, review and file. Then we are still here in August when a question comes up, and we still remember your file.",
            },
          ].map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.08} className="bg-navy-850">
              <div className="flex h-full flex-col p-8">
                <span
                  aria-hidden="true"
                  className="block font-display text-4xl leading-none text-gold-500/35"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl leading-snug text-ink-50">
                  {item.step}
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

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="relative isolate overflow-hidden border-t border-white/8 bg-navy-900 py-20 sm:py-24"
        >
          {photo && <PhotoBackdrop photo={photo} />}

          <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
            <Reveal>
              <p className="eyebrow">Also in {category.label.toLowerCase()}</p>
              <h2
                id="related-heading"
                className="mt-4 font-display text-2xl leading-snug font-medium sm:text-3xl"
              >
                Work that usually travels with this
              </h2>
            </Reveal>

            <ul className="mt-10 grid gap-px overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 0.07} className="bg-navy-850">
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col p-7 transition-colors duration-300 ease-brand hover:bg-navy-800"
                  >
                    <span
                      aria-hidden="true"
                      className="text-gold-500 transition-colors duration-300 group-hover:text-gold-400"
                    >
                      <ServiceIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg leading-snug text-ink-50 transition-colors duration-300 group-hover:text-gold-400">
                      {item.name}
                    </h3>
                    <p className="mt-3 grow text-sm leading-relaxed text-ink-400">
                      {item.summary}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase transition-colors duration-300 group-hover:text-gold-400"
                    >
                      Learn more
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingCta
        eyebrow="Ready when you are"
        title={
          <>
            Let&rsquo;s talk about
            <span className="text-gold-400 italic"> {service.name.toLowerCase()}</span>
          </>
        }
        body="The first conversation is free and carries no obligation. Tell us where you stand and we will tell you plainly what comes next."
      />

      <ServiceJsonLd service={service} description={content.lead} />
    </>
  );
}
