import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Engraving } from "@/components/ui/Engraving";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { site } from "@/lib/site";

/**
 * The hero is built as a stack of layers rather than a single flat fill,
 * because a flat navy field reads as an unstyled background no matter how
 * good the colour is. From back to front:
 *
 *   -z-30  optional photograph
 *   -z-20  guilloche watermark, bleeding off the right edge
 *   -z-20  ledger grid, faded out before it reaches the headline
 *   -z-10  warm light from the upper left, grain, and the seam into TrustBar
 *
 * The light direction is deliberate and consistent: warm wash top-left, the
 * engraving catching it on the right, the floor falling away at the bottom.
 */
export function Hero() {
  return (
    <section
      data-surface="dark"
      className="relative isolate overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28 lg:min-h-[92svh] lg:pt-48 lg:pb-32"
    >
      {photos.heroBackground && (
        <PhotoBackdrop photo={photos.heroBackground} priority />
      )}

      {/* The watermark. Cropped hard by the right edge so it reads as an
          engraving the page is sitting on, not a circle floating in space. */}
      <Engraving
        variant="rosette"
        className="top-[-22%] right-[-34%] -z-20 aspect-square w-[125%] text-brass opacity-[0.10] sm:w-[85%] lg:top-1/2 lg:right-[-16%] lg:w-[62%] lg:-translate-y-1/2 lg:opacity-[0.13]"
      />

      {/* Ledger grid, cut off before it reaches the text column. */}
      <div
        aria-hidden="true"
        className="ledger-grid absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />

      {/* Warm light from the upper left. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_18%_0%,color-mix(in_srgb,var(--color-brass)_15%,transparent)_0%,transparent_65%)]"
      />
      {/* Floor: the section darkens as it falls away. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_55%_at_50%_120%,color-mix(in_srgb,#000_38%,transparent)_0%,transparent_70%)]"
      />
      {/* Tooth. Stops the wide gradients banding on 8-bit displays. */}
      <div
        aria-hidden="true"
        className="film-grain absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
      />
      {/* Seam into the trust bar below. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy"
      />

      <Container className="flex h-full flex-col justify-center">
        <div className="max-w-5xl">
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Huntingdon Valley, PA</span>
              <span aria-hidden="true" className="hidden text-accent/40 sm:inline">
                &bull;
              </span>
              <span>Payroll, Tax &amp; Accounting</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Short enough to set large. The firm's full tagline is kept in
                lib/site.ts as a brand asset; as an h1 it ran to twelve words
                and read like a brochure cover. */}
            <h1 className="mt-7 font-display text-[2.5rem] leading-[1.06] font-medium text-ink-50 sm:text-[3.25rem] md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
              Filed right. Filed on time.
              <span className="mt-2 block font-normal text-accent italic">
                Since {site.foundedYear}.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <GoldRule weight="bold" className="mt-9 w-32" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl">
              Somebody has to read the notices, hit the deadlines and know which
              deductions are yours. For families and business owners in all 50
              states, <span className="text-ink-50">that has been us</span>{" "}
              &mdash; from one office in Huntingdon Valley.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="gold" size="lg">
                Book a Consultation
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="outline" size="lg">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    d="M4.2 2.8h3l1.4 3.5-2 1.3a10.5 10.5 0 0 0 5.8 5.8l1.3-2 3.5 1.4v3a1.4 1.4 0 0 1-1.5 1.4A14.6 14.6 0 0 1 2.8 4.3a1.4 1.4 0 0 1 1.4-1.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                {site.phone.display}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
