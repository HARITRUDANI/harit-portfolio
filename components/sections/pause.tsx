"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Cinematic Pause — the Simplification Moment.
 *
 * When this section enters view ≥45%, `void-mode` is set on <html> and the
 * entire site recedes: particles dim, cursor softens, section numbers vanish,
 * nav blurs. One line remains. When you scroll past, the environment
 * rebuilds itself.
 *
 * Reusable via props so the site can have multiple silence moments without
 * duplicating the void-mode wiring.
 */
type PauseProps = {
  /** Aria-label distinguishes multiple Pause sections to screen readers. */
  label: string;
  /** Plain text or JSX (so the amber accent word can wrap). */
  primary: ReactNode;
  /** Optional second, quieter line below. */
  secondary?: ReactNode;
  /**
   * Tighter mobile height for transition-adjacent pauses. Desktop unchanged.
   * Used for the memory pause that sits immediately before Contact.
   */
  compact?: boolean;
};

export function Pause({ label, primary, secondary, compact = false }: PauseProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0],
  );
  const lineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.intersectionRatio >= 0.45) {
          document.documentElement.classList.add("void-mode");
        } else {
          document.documentElement.classList.remove("void-mode");
        }
      },
      { threshold: [0, 0.25, 0.45, 0.7, 1] },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("void-mode");
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label={label}
      className={`relative flex w-full items-center justify-center overflow-hidden py-20 sm:py-24 sm:min-h-[70svh] md:min-h-[80svh] ${compact ? "min-h-[38svh]" : "min-h-[48svh]"}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="h-[70vh] w-[70vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,110,0.05), transparent 70%)",
          }}
        />
      </div>

      <motion.blockquote
        style={{ opacity: lineOpacity, y: lineY }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <p
          className="font-display font-light leading-[1.2] tracking-[-0.015em] text-balance text-[#f0ece4]"
          style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.4rem)" }}
        >
          {primary}
        </p>
        {secondary && (
          <p
            className="mt-8 font-display font-light leading-[1.4] text-[#8a8780] text-balance"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
          >
            {secondary}
          </p>
        )}
      </motion.blockquote>
    </section>
  );
}
