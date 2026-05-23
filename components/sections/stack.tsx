"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { stack } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { FadeIn } from "@/components/motion/fade-in";
import { TechIcon } from "@/components/tech-icon";

export function Stack() {
  return (
    <Section
      id="stack"
      index="07"
      label="stack & ecosystem"
      domain="performance"
    >
      <FadeIn>
        <h2 className="max-w-2xl font-display text-[24px] font-light leading-[1.4] text-[#f0ece4] text-balance sm:text-[28px]">
          The tools, grouped by what they actually do.
        </h2>
      </FadeIn>

      <div className="mt-20 divide-y divide-white/[0.06] border-t border-white/[0.06]">
        {stack.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: EASE,
            }}
            className="grid grid-cols-1 gap-y-4 py-8 md:grid-cols-12 md:gap-x-10"
          >
            <div className="md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8a96e]/92">
                {group.group}
              </div>
            </div>
            <div className="md:col-span-9">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group inline-flex items-center gap-2 text-[15px] text-[#f0ece4] transition-colors duration-300 hover:text-[#c8a96e]"
                  >
                    <TechIcon
                      icon={item.icon}
                      className="h-[14px] w-[14px] opacity-55 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
