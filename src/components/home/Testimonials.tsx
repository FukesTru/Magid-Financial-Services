import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Small business owner, Bucks County" */
  detail: string;
};

/**
 * ---------------------------------------------------------------------------
 * PLACEHOLDER — no client reviews have been collected yet.
 *
 * This array is intentionally empty. Nothing here should be invented: made-up
 * testimonials are a legal and reputational risk for a financial services
 * firm. Paste verified, client-approved reviews below and the section swaps
 * itself from the "reviews pending" state to real quote cards automatically.
 *
 *   const testimonials: Testimonial[] = [
 *     {
 *       quote: "…exact wording as the client gave it…",
 *       name: "First name L.",
 *       detail: "Small business owner, Huntingdon Valley",
 *     },
 *   ];
 * ---------------------------------------------------------------------------
 */
const testimonials: Testimonial[] = [];

export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <Section tone="raised" ariaLabelledBy="testimonials-heading">
      <Reveal>
        <SectionHeading
          eyebrow="Testimonials"
          id="testimonials-heading"
          align="center"
          title="In our clients' words"
          lead={
            hasReviews
              ? "A few notes from the people we file for."
              : "We are gathering reviews from long-standing clients now. Verified quotes will appear here as they come in."
          }
        />
      </Reveal>

      {hasReviews ? (
        <ul className="mt-14 grid gap-px overflow-hidden border border-white/8 bg-white/8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.08} className="bg-navy-900">
              <figure className="flex h-full flex-col p-8">
                <QuoteGlyph />
                <blockquote className="mt-5 grow">
                  <p className="font-display text-lg leading-relaxed text-ink-200 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-7 border-t border-white/8 pt-5">
                  <span className="block font-sans text-sm font-semibold text-ink-50">
                    {t.name}
                  </span>
                  <span className="mt-1 block font-sans text-xs tracking-wide text-ink-400">
                    {t.detail}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <>
          <ul
            aria-hidden="true"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((i) => (
              <Reveal as="li" key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-sm border border-dashed border-gold-500/20 bg-navy-900/60 p-8">
                  <QuoteGlyph muted />
                  <div className="mt-6 space-y-3">
                    <span className="block h-2 w-full rounded-full bg-white/6" />
                    <span className="block h-2 w-11/12 rounded-full bg-white/6" />
                    <span className="block h-2 w-8/12 rounded-full bg-white/6" />
                  </div>
                  <div className="mt-8 border-t border-white/6 pt-5">
                    <span className="block h-2 w-24 rounded-full bg-white/8" />
                    <span className="mt-2.5 block h-2 w-32 rounded-full bg-white/6" />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.24}>
            <div className="mt-12 text-center">
              <p className="text-sm text-ink-400">
                Worked with us before? We would be glad to hear how it went.
              </p>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="md"
                className="mt-5"
              >
                Share your experience
              </ButtonLink>
            </div>
          </Reveal>
        </>
      )}
    </Section>
  );
}

function QuoteGlyph({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block font-display text-5xl leading-none ${
        muted ? "text-gold-500/20" : "text-gold-500/60"
      }`}
    >
      &ldquo;
    </span>
  );
}
