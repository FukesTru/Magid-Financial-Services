import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const marks = [
  "Individuals & Businesses",
  "Federal, State & Local",
  "IRS Representation",
];

export function TrustBar() {
  return (
    <section
      aria-label="Credentials"
      className="border-y border-line bg-navy-950"
    >
      <Container className="py-7">
        <Reveal y={12}>
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
            <p className="font-display text-lg text-ink-50 sm:text-xl">
              Serving all 50 states since{" "}
              <span className="text-accent">{site.foundedYear}</span>
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {marks.map((mark, i) => (
                <li key={mark} className="flex items-center gap-6">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-1 w-1 rounded-full bg-accent/50 sm:block"
                    />
                  )}
                  <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    {mark}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
