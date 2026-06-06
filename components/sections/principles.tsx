"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { principles, type Principle } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { useSectionDepth } from "@/store/depth-store";
import { Reveal } from "@/components/motion/reveal";
import { FadeIn } from "@/components/motion/fade-in";
import { ThoughtMap } from "./thought-map";

export function Principles() {
  return (
    <Section id="principles" index="02" label="how i think">
      <FadeIn>
        <h2 className="max-w-3xl font-display text-[28px] font-light leading-[1.25] tracking-[-0.01em] text-[#f0ece4] text-balance sm:text-[34px] md:text-[40px]">
          A map of the things I think about,
          <span className="text-[#a3a098]">
            {" "}
            and the convictions that pull them together.
          </span>
        </h2>
      </FadeIn>

      <div className="mt-8 md:mt-20">
        <FadeIn delay={0.1}>
          <ThoughtMap />
        </FadeIn>
      </div>

      <div className="mt-10 sm:mt-32">
        <div className="mb-12 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
          Principles
        </div>
        <ul className="space-y-0 border-t border-white/[0.06]">
          {principles.map((p, i) => (
            <PrincipleRow key={p.index} principle={p} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function PrincipleRow({ principle: p, index }: { principle: Principle; index: number }) {
  const depth = useSectionDepth("principles");

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative grid grid-cols-1 gap-y-3 border-b border-white/[0.06] py-10 md:grid-cols-12 md:gap-x-10 md:py-14"
    >
      {/* hover amber trace */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[#c8a96e] opacity-0 transition-opacity duration-500 group-hover:opacity-60"
      />

      <div className="md:col-span-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a8780]">
          {p.index}
        </span>
      </div>

      <div className="md:col-span-11">
        <p className="font-display text-[20px] font-light leading-[1.45] tracking-[-0.01em] text-[#f0ece4] text-pretty sm:text-[22px] md:text-[24px]">
          {p.surface}
        </p>

        <Reveal show={depth >= 1}>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.75] text-[#bab7b0] text-pretty">
            {p.depth}
          </p>
        </Reveal>

        <Reveal show={depth >= 2} delay={0.15}>
          <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.75] text-[#a3a098] italic text-pretty">
            {p.core}
          </p>
        </Reveal>
      </div>
    </motion.li>
  );
}
