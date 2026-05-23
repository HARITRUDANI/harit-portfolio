"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";

/**
 * Cinematic section divider.
 *
 * Three layers:
 *  1. A thin horizon line that grows from the left as it scrolls into view.
 *  2. A soft amber light sweep that travels along the line.
 *  3. A small diamond marker at the centre with a breathing halo.
 *
 * All scroll-linked so the experience is choreographed, not random.
 */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Sweep travels left to right as you scroll past
  const sweepX = useTransform(scrollYProgress, [0, 1], ["-100%", "120%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto flex h-px w-full max-w-6xl items-center justify-center px-6 sm:px-10 md:px-16"
      // Breathing margin above + below: pauses cadence between sections
      // without adding ornament. Mobile gets a bit more (intimacy rule).
      style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
    >
      {/* The horizon line */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className="absolute left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:left-10 sm:right-10 md:left-16 md:right-16"
      />

      {/* The travelling amber sweep */}
      <motion.span
        style={{ x: sweepX }}
        className="absolute left-0 h-px w-[28%] bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent"
      />

      {/* The centre diamond + breathing halo */}
      <div className="relative">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="block h-[5px] w-[5px] rotate-45 bg-[#c8a96e]"
        />
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 40,
            height: 40,
            background:
              "radial-gradient(circle, rgba(200,169,110,0.18), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
