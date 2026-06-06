"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { changedMyMind } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

export function ChangedMind() {
  return (
    <Section
      id="changed-mind"
      index="04"
      label="things i changed my mind about"
      domain="architecture"
    >
      <h2 className="sr-only">Things I changed my mind about</h2>
      <FadeIn>
        <p className="mb-20 max-w-2xl text-[14px] leading-[1.75] text-[#8a8780] italic text-pretty">
          The work changes you. These are some of the ways it changed me.
        </p>
      </FadeIn>

      <div className="space-y-20 sm:space-y-24">
        {changedMyMind.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.9,
              delay: i * 0.1,
              ease: EASE,
            }}
            className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-10"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a8780]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="md:col-span-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                Before
              </div>
              <p className="text-[15.5px] leading-[1.7] text-[#a3a098] text-pretty">
                {entry.from}
              </p>
            </div>

            <div className="hidden md:col-span-1 md:flex md:items-center md:justify-center">
              <span aria-hidden className="text-[#c8a96e]/85">
                →
              </span>
            </div>

            <div className="md:col-span-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/85">
                Now
              </div>
              <p className="text-[15.5px] leading-[1.7] text-[#f0ece4] text-pretty">
                {entry.to}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
