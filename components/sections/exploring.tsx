"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { currentlyExploring, person } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

export function Exploring() {
  return (
    <Section
      id="exploring"
      index="05"
      label="currently exploring"
      domain="longevity"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <FadeIn>
            <h2 className="font-display text-[24px] font-light leading-[1.4] text-[#f0ece4] text-balance sm:text-[28px]">
              What&rsquo;s open in my mind right now.
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-[1.75] text-[#a3a098] text-pretty">
              Some of this is active learning. Some of it is unresolved
              thinking I haven&rsquo;t finished yet. Both belong here.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a96e]/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c8a96e]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                Last updated · {person.lastUpdated}
              </span>
            </div>
          </FadeIn>
        </div>

        <div className="space-y-12 lg:col-span-7">
          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]">
              Active
            </div>
            <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {currentlyExploring.active.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: EASE,
                  }}
                  className="group flex items-center justify-between py-5"
                >
                  <span className="text-[15px] text-[#f0ece4]">{item}</span>
                  <span className="font-mono text-[10px] text-[#3a3a3a] transition-colors group-hover:text-[#c8a96e]">
                    →
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
              Unfinished thinking
            </div>
            <ul className="space-y-6">
              {currentlyExploring.unfinished.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.08,
                    ease: EASE,
                  }}
                  className="border-l border-white/[0.08] pl-5 text-[14.5px] leading-[1.7] text-[#a3a098] italic text-pretty"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
