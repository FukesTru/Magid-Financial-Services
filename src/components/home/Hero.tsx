import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";
import { Reveal } from "@/components/ui/Reveal";
import { photos } from "@/lib/images";
import { PhotoBackdrop } from "@/components/ui/Photo";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:min-h-[92svh] lg:pt-48 lg:pb-32">
      {/* Optional photographic depth, sunk beneath the grid and gold wash. */}
      {photos.heroBackground && (
        <PhotoBackdrop photo={photos.heroBackground} priority />
      )}

      {/* Layered ground: engraved ledger grid under a warm gold wash. */}
      <div
        aria-hidden="true"
        className="ledger-grid absolute inset-0 -z-20 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div aria-hidden="true" className="gold-wash absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container className="flex h-full flex-col justify-center">
        <div className="max-w-5xl">
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Huntingdon Valley, PA</span>
              <span aria-hidden="true" className="hidden text-gold-500/40 sm:inline">
                &bull;
              </span>
              <span>Payroll, Tax &amp; Accounting</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[2rem] leading-[1.1] font-medium text-ink-50 sm:text-[2.75rem] md:text-5xl lg:text-[3.75rem] xl:text-[4rem]">
              Expert Payroll &amp; Tax Solutions&nbsp;&mdash;
              <span className="mt-2 block font-normal text-gold-400 italic">
                Maximizing Your Success, Minimizing Your Stress
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <GoldRule weight="bold" className="mt-9 w-32" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl">
              Somebody has to read the notices, hit the deadlines and know which
              deductions are yours. Since {site.foundedYear},{" "}
              <span className="text-ink-50">that has been us</span> &mdash; from
              one office in Huntingdon Valley, for families and business owners
              in all 50 states.
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
