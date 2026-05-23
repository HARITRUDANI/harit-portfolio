"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * A giant section number that fades in behind the section content.
 * Scroll-linked — appears as you enter the section, fades as you leave.
 * Inspired by Linear's docs and high-end editorial sites.
 */
export function SectionMarker({ index }: { index: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Felt, not seen. Soft opacity peak so giant numbers never compete with content.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [0, 0.025, 0.04, 0.015, 0],
  );
  const x = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ opacity, x }}
        className="absolute -left-2 top-1/2 -translate-y-1/2 select-none font-display font-bold leading-none tracking-tighter text-[#c8a96e] sm:-left-4"
      >
        {/* Tighter clamp — much smaller on small screens, full size on desktop */}
        <span style={{ fontSize: "clamp(5rem, 19vw, 24rem)" }}>{index}</span>
      </motion.div>
    </div>
  );
}
