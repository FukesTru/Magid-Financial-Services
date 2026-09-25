import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { PhotoFrame } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export function AboutPreview() {
  return (
    <Section tone="base" ariaLabelledBy="about-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              eyebrow="About the firm"
              id="about-heading"
              title={
                <>
                  A practice built on
                  <span className="text-accent italic"> knowing your file</span>
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
            <p className="text-xl leading-snug text-ink-200 sm:text-2xl">
              Same office in Huntingdon Valley since {site.foundedYear}. Same
              preparer on your file in August as in April.
            </p>

            <dl className="mt-10 space-y-7">
              {[
                {
                  term: "A preparer, not a queue.",
                  detail:
                    "The person who prepares your return is the person who knows your file when you come back with a question six months later.",
                },
                {
                  term: "Small on purpose.",
                  detail:
                    "It is the only way to know a situation before the client has finished describing it \u2014 and the reason nothing gets handed to a name you have never heard.",
                },
                {
                  term: "A local practice with a national reach.",
                  detail:
                    "Clients who moved out of Pennsylvania mostly stayed with us. Nothing about the work requires you to be in the room.",
                },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="font-sans text-base font-semibold text-ink-50">
                    {item.term}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-300 sm:text-base">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18}>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-accent transition-colors hover:text-accent-soft"
            >
              Learn more about us
              <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
