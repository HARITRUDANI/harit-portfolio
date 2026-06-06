"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { notesFromProduction } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

export function Notes() {
  return (
    <Section
      id="notes"
      index="03"
      label="notes from production"
      domain="communication"
    >
      <h2 className="sr-only">Notes from production</h2>
      <FadeIn>
        <p className="mb-20 max-w-2xl text-[14px] leading-[1.75] text-[#8a8780] italic text-pretty">
          Short reflections. Not polished. Real things I learned by building
          systems that other people had to live with.
        </p>
      </FadeIn>

      <div className="mx-auto max-w-3xl space-y-12 sm:space-y-14">
        {notesFromProduction.map((note, i) => {
          const isScar = i === notesFromProduction.length - 1;
          return (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.07,
                ease: EASE,
              }}
              className="group relative"
            >
              <span
                aria-hidden
                className="absolute -left-6 top-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#3a3a3a] sm:-left-10"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <blockquote
                className={
                  isScar
                    ? "border-l border-[#c8a96e]/30 pl-6 font-display text-[19px] font-light leading-[1.5] tracking-[-0.005em] text-[#bab7b0] italic text-pretty sm:text-[22px] md:text-[24px]"
                    : "font-display text-[20px] font-light leading-[1.5] tracking-[-0.005em] text-[#f0ece4] text-pretty sm:text-[24px] md:text-[26px]"
                }
              >
                {note}
              </blockquote>
            </motion.figure>
          );
        })}
      </div>
    </Section>
  );
}
