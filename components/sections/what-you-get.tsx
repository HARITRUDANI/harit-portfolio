"use client";

import { motion } from "framer-motion";
import { howIWork } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";
import { EASE } from "@/lib/motion";

/**
 * "How I Work" — editorial reflection.
 *
 * Replaced the previous bullet-list value-prop. Three short paragraphs
 * about how the work actually happens, not what someone "gets" by
 * hiring me. Per the constitution: depth over portfolio energy.
 */
export function WhatYouGet() {
  return (
    <Section
      id="what-you-get"
      index="09"
      label="how i work"
      domain="interaction"
    >
      <FadeIn>
        <h2 className="max-w-3xl font-display text-[26px] font-light leading-[1.35] tracking-[-0.01em] text-[#f0ece4] text-balance sm:text-[30px] md:text-[34px]">
          A few notes on{" "}
          <span className="text-[#a3a098]">how the work happens.</span>
        </h2>
      </FadeIn>

      <div className="mt-20 space-y-14 sm:space-y-16">
        {howIWork.map((entry, i) => (
          <motion.div
            key={entry.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            className="grid grid-cols-1 gap-y-3 md:grid-cols-12 md:gap-x-10"
          >
            <div className="md:col-span-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                {entry.label}
              </div>
            </div>
            <p className="text-[15.5px] leading-[1.75] text-[#bab7b0] text-pretty md:col-span-9 md:text-[16px]">
              {entry.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
