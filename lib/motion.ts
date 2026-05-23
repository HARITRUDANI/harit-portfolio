/**
 * Motion token system.
 *
 * Single source of truth for animation easings, durations, and common
 * Variants. Per the portfolio constitution: motion is governance, not
 * decoration — random durations are a regression.
 *
 * If a component needs a different timing or curve, add it here first
 * and import it. Never declare ad-hoc easings inline.
 */

import type { Variants } from "framer-motion";

/** Our signature easing — matches Linear / Apple / Vercel character. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Linear scroll-spring (used in scroll progress bar). */
export const SPRING_SCROLL = {
  stiffness: 120,
  damping: 28,
  restDelta: 0.001,
} as const;

/** Cursor spring (tight follow). */
export const SPRING_CURSOR = {
  damping: 22,
  stiffness: 280,
  mass: 0.4,
} as const;

/** Ambient cursor glow spring (lazy follow). */
export const SPRING_CURSOR_GLOW = {
  damping: 38,
  stiffness: 80,
  mass: 1.4,
} as const;

/** Standard durations — never use raw numbers in motion props. */
export const DURATION = {
  quick: 0.4,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
} as const;

/* ─────────────────────────────────────────────────────────
 * Reusable Variants
 * ───────────────────────────────────────────────────────── */

/** Soft fade-up entrance. Used in FadeIn primitive + most section reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/** Stagger container — children fade in with offset. */
export const staggerContainer = (
  staggerChildren = 0.06,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/**
 * LCP-friendly word reveal — starts at opacity:1 so the largest contentful
 * element is paintable from frame 1. Only y + blur animate.
 */
export const wordRevealLCP: Variants = {
  hidden: { opacity: 1, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};
