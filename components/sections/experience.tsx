"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { experience } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

export function Experience() {
  return (
    <Section
      id="experience"
      index="08"
      label="experience"
      domain="architecture"
    >
      <FadeIn>
        <h2 className="max-w-2xl font-display text-[24px] font-light leading-[1.4] text-[#f0ece4] text-balance sm:text-[28px]">
          One company.
          <span className="text-[#a3a098]"> Trainee to Senior Engineer. Nine production systems. Three countries.</span>
        </h2>
        <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-[#8a8780] text-pretty">
          Most engineers change companies for variety. I changed domains — LMS, consumer, enterprise, AI. The scope kept expanding. So did the depth.
        </p>
      </FadeIn>

      <div className="mt-20 divide-y divide-white/[0.06] border-t border-white/[0.06]">
        {experience.map((role, i) => (
          <motion.div
            key={`${role.company}-${role.role}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: EASE,
            }}
            className="grid grid-cols-1 gap-y-3 py-14 md:grid-cols-12 md:gap-x-10 md:py-16"
          >
            <div className="md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8a8780]">
                {role.period}
              </div>
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-[19px] font-medium tracking-[-0.005em] text-[#f0ece4] sm:text-[20px]">
                  {role.role}
                </h3>
                {role.current && (
                  <span className="rounded-full border border-[#c8a96e]/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c8a96e]">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a3a098]">
                {role.company}
              </div>
              <p className="mt-4 max-w-2xl text-[14px] leading-[1.7] text-[#bab7b0] text-pretty">
                {role.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
