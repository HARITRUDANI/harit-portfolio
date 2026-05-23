"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Razor-thin amber progress line at the very top of the page.
 * Spring-eased so it never feels mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      data-ambient="progress"
      style={{ scaleX, transformOrigin: "0%" }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-px bg-gradient-to-r from-[#c8a96e] via-[#c8a96e]/80 to-[#c8a96e]/0"
    />
  );
}
