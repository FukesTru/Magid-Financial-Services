"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered fade-up. Wrap any block that should animate into view.
 *
 * Fires once per element. Two safety nets keep the content visible when the
 * animation cannot or should not run, because the resting state of a fade-up
 * is `opacity: 0` and that must never be what a visitor is left looking at:
 *
 *  1. `prefers-reduced-motion` — the hook drops the motion wrapper entirely,
 *     and a CSS rule in globals.css pins the element visible even during the
 *     server-rendered pass before that hook has run.
 *  2. No JavaScript — a <noscript> stylesheet in the root layout does the
 *     same, so crawlers and JS-off visitors get the full page.
 *
 * Both overrides key off the `data-reveal` attribute below; do not remove it.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  /** Seconds. Use small increments (0.06–0.12) to stagger siblings. */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "article";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag data-reveal className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
