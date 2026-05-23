"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { opening, person, stats } from "@/lib/data";
import { useDepthProtocol } from "@/hooks/use-depth-protocol";
import { HeroArchitecture } from "@/components/hero-architecture";
import { Magnetic } from "@/components/magnetic";
import { EASE } from "@/lib/motion";

/**
 * Hero — editorial engineering page.
 *
 * Composed like a single spread from a quiet engineering quarterly:
 * a kicker at the top rule, a left-aligned thesis headline, a brief
 * lede, attribution, and a footer-style status line. To the right, a
 * full-bleed architectural diagram extends past the edge — suggesting
 * a larger system continuing beyond view.
 *
 * Motion philosophy: a single confident reveal, then stillness.
 */

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 1, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Opening() {
  const ref = useDepthProtocol("opening") as React.RefObject<HTMLElement>;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line1 = "Software changes fast.".split(" ");
  const line2 = "Clear systems last.".split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative w-full overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-16"
    >
      <CalmAmbient />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-16"
      >
        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
          {/* Main editorial column */}
          <div className="md:col-span-7">
            {/* Sub-kicker — role on top, evidence below */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="mb-7 space-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8a8780]"
            >
              <div>{person.title}</div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                {stats.map((s, i) => (
                  <span
                    key={s.value}
                    className="inline-flex items-baseline gap-2.5"
                  >
                    <span className="text-[#a3a098]">{s.value}</span>
                    {i < stats.length - 1 && (
                      <span aria-hidden className="text-[#2a2a2a]">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Headline — editorial, two lines */}
            <h1
              className="font-display font-medium leading-[1.05] tracking-[-0.025em] text-[#f0ece4]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 3.25rem)" }}
            >
              <motion.span
                variants={wordContainer}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.7 }}
                className="block"
                aria-label="Software changes fast."
              >
                {line1.map((word, i) => (
                  <span
                    key={`a-${i}`}
                    className="inline-block overflow-hidden mr-[0.22em] pb-[0.05em] align-baseline"
                  >
                    <motion.span
                      variants={wordVariants}
                      className="inline-block"
                      aria-hidden
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
              <motion.span
                variants={wordContainer}
                initial="hidden"
                animate="show"
                transition={{ delay: 1.0 }}
                className="mt-2 block"
                aria-label="Clear systems last."
              >
                {line2.map((word, i) => (
                  <span
                    key={`b-${i}`}
                    className="inline-block overflow-hidden mr-[0.22em] pb-[0.05em] align-baseline"
                  >
                    <motion.span
                      variants={wordVariants}
                      className="inline-block"
                      aria-hidden
                    >
                      {i === line2.length - 1 ? (
                        <span className="text-[#c8a96e]">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>

            {/* Lede paragraph — bigger + roomier line-height on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
              className="mt-10 max-w-[32ch] text-[17px] leading-[1.75] text-[#bab7b0] text-pretty sm:max-w-lg sm:text-[16px] sm:leading-[1.7]"
            >
              The interesting problems were never about the feature. They
              were about the system underneath it.
            </motion.p>

            {/* Pull-quote / human insight — editorial card on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.7, ease: EASE }}
              className="mt-8 max-w-[34ch] border-l-2 border-[#c8a96e]/40 pl-5 text-[15.5px] leading-[1.75] text-[#a8a59e] italic text-pretty sm:max-w-md sm:border-l sm:border-[#c8a96e]/30 sm:text-[14px] sm:leading-[1.7] sm:text-[#a3a098]"
            >
              Most frontend problems eventually become communication problems.
            </motion.p>

            {/* Memory — visible from first paint */}
            <div className="mt-6 max-w-[36ch] sm:max-w-md">
              <p className="border-l border-[#c8a96e]/20 pl-5 text-[14.5px] leading-[1.75] text-[#a3a098] italic text-pretty sm:text-[13.5px] sm:leading-[1.7] sm:text-[#8a8780]">
                {opening.memory}
              </p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.0, ease: EASE }}
              className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7"
            >
              <Magnetic strength={14} radius={50}>
                <a
                  href="#work"
                  className="group glow-border inline-flex items-center gap-3 rounded-sm border border-[#c8a96e]/50 bg-[#c8a96e]/[0.06] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#f0ece4] transition-colors duration-500 hover:border-[#c8a96e] hover:bg-[#c8a96e]/[0.14]"
                >
                  Explore selected work
                  {/* Arrow moves only on group-hover — no infinite loop. */}
                  <span className="inline-block text-[#c8a96e] transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={8} radius={24}>
                <a
                  href="#contact"
                  className="inline-block font-mono text-[11.5px] uppercase tracking-[0.22em] text-[#8a8780] transition-colors hover:text-[#bab7b0]"
                >
                  Or get in touch
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right — architectural diagram, contained within its column */}
          <motion.div
            style={{ opacity: archOpacity }}
            className="relative hidden h-[440px] md:col-span-5 md:block lg:h-[480px]"
            aria-hidden
          >
            <HeroArchitecture />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

/**
 * Calm ambient background — one soft radial glow, off-axis.
 * No grid, no competing gradients. Negative space is part of the design.
 */
function CalmAmbient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.55, 0.78, 0.55] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[28%] right-[12%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.05), rgba(200,169,110,0) 70%)",
        }}
      />
    </div>
  );
}
