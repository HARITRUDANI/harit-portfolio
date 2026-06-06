"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { globalExperience } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Three country blocks. Absorbs the former Systems Built section as
 * archival metadata under each country — no chips, no hover drama, no
 * decoration. Slight vertical unevenness between blocks (small pt-
 * variation + natural list-length differences) so symmetry doesn't
 * read as manufactured.
 */
const BLOCK_OFFSETS = ["md:pt-0", "md:pt-3", "md:pt-1"] as const;

export function GlobalExperience() {
  return (
    <Section
      id="global"
      index="06"
      label="global experience"
      domain="communication"
    >
      <FadeIn>
        <h2 className="max-w-3xl font-display text-[24px] font-light leading-[1.4] text-[#f0ece4] text-balance sm:text-[28px] md:text-[32px]">
          Three countries.
          <span className="text-[#a3a098]">
            {" "}
            Real production systems, not freelance side projects.
          </span>
        </h2>
      </FadeIn>

      <div className="mt-20 grid grid-cols-1 gap-y-16 md:grid-cols-3 md:items-start md:gap-x-10 md:gap-y-0">
        {globalExperience.map((region, i) => {
          const offset = BLOCK_OFFSETS[i] ?? "";
          return (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: EASE,
              }}
              className={offset}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[20px] font-light tracking-[-0.01em] text-[#f0ece4]">
                  {region.region}
                </h3>
                <span className="font-mono text-[32px] font-light leading-none text-[#c8a96e]/60">
                  {region.count}
                </span>
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8780]">
                Production systems
              </div>
              <p className="mt-6 text-[14px] leading-[1.75] text-[#a3a098] text-pretty">
                {region.description}
              </p>
              <ul className="mt-8 flex flex-col gap-y-2">
                {region.systems.map((system) => (
                  <li
                    key={system.name}
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  >
                    <span className="text-[#a3a098]">{system.name}</span>
                    <span aria-hidden className="mx-2 text-[#3a3a3a]">
                      ·
                    </span>
                    <span className="text-[#8a8780]">{system.note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <FadeIn delay={0.4}>
        <p className="mt-20 max-w-2xl font-mono text-[11px] uppercase leading-[1.8] tracking-[0.18em] text-[#a3a098]">
          Async-first · Cross-timezone · International delivery standards
        </p>
      </FadeIn>
    </Section>
  );
}
