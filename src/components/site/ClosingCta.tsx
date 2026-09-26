import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Engraving } from "@/components/ui/Engraving";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      data-surface="dark"
      className="relative isolate overflow-hidden border-t border-line bg-navy-deep py-24 sm:py-28 lg:py-32"
    >
      {photos.ctaBackground && <PhotoBackdrop photo={photos.ctaBackground} />}

      {/* Centred behind the copy, so the call to action reads as though it is
          stamped on the page rather than printed over a flat fill. */}
      <Engraving
        variant="rosette-fine"
        className="top-1/2 left-1/2 -z-20 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 text-brass opacity-[0.07] sm:w-[95%] lg:w-[62%]"
      />

      <div
        aria-hidden="true"
        className="ledger-grid absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(60%_70%_at_50%_100%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_100%,color-mix(in_srgb,var(--color-brass)_16%,transparent)_0%,transparent_70%)]"
      />

      <div
        aria-hidden="true"
        className="film-grain absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
      />

      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ready when you are</p>
            <h2
              id="cta-heading"
              className="mt-5 font-display text-3xl leading-[1.15] font-medium sm:text-4xl lg:text-5xl"
            >
              Let&rsquo;s sort it out before the next deadline
            </h2>
            <GoldRule align="center" className="mt-7" />
            <p className="mt-7 text-base leading-relaxed text-ink-300 sm:text-lg">
              Tell us what you are dealing with &mdash; a return, a payroll
              schedule, a letter you would rather not open. The first
              conversation is free, and you will leave it knowing exactly what
              comes next.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="gold" size="lg">
                Book Your Free Consultation
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
