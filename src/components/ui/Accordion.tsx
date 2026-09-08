"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Single-open accordion used for the FAQ.
 *
 * The panel is always in the DOM (search engines and assistive tech read the
 * answers whether or not the panel is expanded); it is the grid row that
 * collapses, which animates smoothly without measuring heights in JS.
 */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-white/8 border-y border-white/8">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`font-display text-lg leading-snug transition-colors duration-200 sm:text-xl ${
                    isOpen
                      ? "text-gold-400"
                      : "text-ink-50 group-hover:text-gold-400"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-brand ${
                    isOpen
                      ? "rotate-45 border-gold-500 text-gold-400"
                      : "border-white/15 text-ink-400 group-hover:border-gold-500/50 group-hover:text-gold-400"
                  }`}
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                    <path
                      d="M7 1.5v11M1.5 7h11"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-brand motion-reduce:transition-none ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-10 pb-7 text-[0.9375rem] leading-relaxed text-ink-300">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
