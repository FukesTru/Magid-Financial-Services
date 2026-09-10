import type { ReactNode } from "react";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { site } from "@/lib/site";

/**
 * The closing call to action.
 *
 * Every page ends on this band, so it takes its copy as props rather than
 * being cloned per page — one treatment, one set of overlays, one place to
 * retune the contrast measurements recorded in DESIGN_SYSTEM.md. The defaults
 * are the homepage's wording.
 */
export function ClosingCta({
  eyebrow = "Ready when you are",
  title = (
    <>Let&rsquo;s sort it out before the next deadline</>
  ),
  body = "Tell us what you are dealing with — a return, a payroll schedule, a letter you would rather not open. The first conversation is free, and you will leave it knowing exactly what comes next.",
  action = "Book Your Free Consultation",
}: {
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  action?: string;
} = {}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden border-t border-white/8 bg-navy-950 py-24 sm:py-28 lg:py-32"
    >
      {photos.ctaBackground && <PhotoBackdrop photo={photos.ctaBackground} />}

      <div
        aria-hidden="true"
        className="ledger-grid absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(60%_70%_at_50%_100%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_100%,color-mix(in_srgb,var(--color-gold-500)_16%,transparent)_0%,transparent_70%)]"
      />

      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2
              id="cta-heading"
              className="mt-5 font-display text-3xl leading-[1.15] font-medium sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <GoldRule align="center" className="mt-7" />
            <p className="mt-7 text-base leading-relaxed text-ink-300 sm:text-lg">
              {body}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="gold" size="lg">
                {action}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="quiet" size="lg">
                or call {site.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
