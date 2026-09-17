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
                  <span className="text-gold-400 italic"> knowing your file</span>
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
                What started as a neighborhood practice now files for
                individuals, families, and business owners in all 50 states.
              </p>
              <p>
                The difference is who picks up the phone. You work with the
                person who prepared your return &mdash; not a queue &mdash; and
                that person still remembers your situation in August, long after
                the deadline has passed.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-gold-400 transition-colors hover:text-gold-300"
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
