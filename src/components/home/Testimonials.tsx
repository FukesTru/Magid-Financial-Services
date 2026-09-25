import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { googleReviewsUrl, reviews } from "@/lib/reviews";

/**
 * Client reviews, quoted from the firm's Google Business Profile.
 *
 * Each card carries five stars because each quoted review is a five-star
 * review — that is a fact about the individual review, not a claim about the
 * firm's overall score. No average is displayed and none is marked up: the
 * profile also holds one-star reviews, and presenting a figure derived only
 * from the quotes chosen here would misrepresent it. The link to the full
 * profile is the honest counterweight, and it is deliberately prominent.
 */
export function Testimonials() {
  if (reviews.length === 0) return null;

  return (
    <Section tone="light" ariaLabelledBy="testimonials-heading">
      <Reveal>
        <SectionHeading
          eyebrow="Client reviews"
          id="testimonials-heading"
          align="center"
          title="In our clients' words"
          lead="Reviews left on our Google profile by the people we file for."
        />
      </Reveal>

      <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal
            as="li"
            key={review.name + i}
            delay={(i % 3) * 0.07}
            y={18}
            className="bg-card"
          >
            <figure className="flex h-full flex-col p-8">
              <Stars />
              <blockquote className="mt-5 grow">
                <p className="text-[0.9375rem] leading-relaxed text-ink-200">
                  &ldquo;{review.quote}&rdquo;
                  {review.excerpt && (
                    <span className="text-ink-400"> &hellip;</span>
                  )}
                </p>
              </blockquote>
              <figcaption className="mt-7 border-t border-line pt-5">
                <span className="block font-sans text-sm font-semibold text-ink-50">
                  {review.name}
                </span>
                <span className="mt-1 block font-sans text-xs tracking-wide text-ink-400">
                  Google review
                  {review.excerpt ? " · shortened" : ""}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.16}>
        <div className="mt-12 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide text-accent transition-colors hover:text-accent-soft"
          >
            Read every review on Google
            <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

/** Five gold stars — one review's own rating, not an average. */
function Stars() {
  return (
    <div
      role="img"
      aria-label="Rated 5 out of 5"
      className="flex items-center gap-1 text-accent"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            fill="currentColor"
            d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4 4.2 13.4l.7-4.3-3.1-3 4.3-.6z"
          />
        </svg>
      ))}
    </div>
  );
}
