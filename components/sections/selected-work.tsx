"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Section } from "@/components/section-wrapper";
import { useSectionDepth } from "@/store/depth-store";
import { FadeIn } from "@/components/motion/fade-in";

import { EASE } from "@/lib/motion";

export function SelectedWork() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="work" index="01" label="selected work" domain="architecture">
      <h2 className="sr-only">Selected work</h2>
      <FadeIn>
        <p className="mb-20 max-w-2xl text-[15px] leading-[1.75] text-[#a3a098] text-pretty">
          Nine systems built. Five documented here — from first frontend role
          to technical lead. Real constraints, honest tradeoffs, what they
          taught me. No screenshots, no client logos — engineering decisions
          speak louder than design covers.
        </p>
      </FadeIn>

      <div className="border-t border-white/[0.06]">
        {caseStudies.map((cs, i) => (
          <CaseStudyRow
            key={cs.id}
            caseStudy={cs}
            index={i}
            isOpen={openId === cs.id}
            onToggle={() => setOpenId(openId === cs.id ? null : cs.id)}
          />
        ))}
      </div>
    </Section>
  );
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: i * 0.08,
      ease: EASE,
    },
  }),
};

function CaseStudyRow({
  caseStudy: cs,
  index,
  isOpen,
  onToggle,
}: {
  caseStudy: CaseStudy;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const depth = useSectionDepth("work");

  return (
    <motion.div
      className="glow-border group relative border-b border-white/[0.06] transition-colors duration-500 hover:bg-white/[0.012]"
      custom={index}
      variants={rowVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {/* amber accent that traces when row is hovered or open */}
      <motion.span
        aria-hidden
        animate={{ scaleY: isOpen ? 1 : 0 }}
        whileHover={{ scaleY: 0.6 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[#c8a96e]"
      />

      {/* hover background — radial soft glow following the row */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 20% 50%, rgba(200,169,110,0.05), transparent 70%)",
        }}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${cs.id}-detail`}
        className="grid w-full grid-cols-1 items-baseline gap-y-3 py-10 text-left transition-colors md:grid-cols-12 md:gap-x-10 md:py-12"
      >
        <div className="md:col-span-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8a8780]">
            {cs.index}
          </span>
        </div>

        <div className="md:col-span-5">
          <h3 className="font-display text-[22px] font-medium leading-tight tracking-[-0.01em] text-[#f0ece4] sm:text-[26px] md:text-[28px]">
            {cs.title}
          </h3>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#c8a96e]">
            {cs.category}
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="text-[14px] leading-[1.7] text-[#a3a098]">
            <span className="text-[#c8a96e]/80">{cs.role}</span>
            <span className="text-[#3a3a3a]"> · </span>
            <span>{cs.region}</span>
            {cs.duration ? (
              <>
                <span className="text-[#3a3a3a]"> · </span>
                <span>{cs.duration}</span>
              </>
            ) : null}
          </p>
        </div>

        <div className="flex items-center justify-start md:col-span-2 md:justify-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b6b2aa] transition-colors group-hover:text-[#f0ece4]">
            {isOpen ? "Close" : "Read"}{" "}
            <span
              className={`ml-2 inline-block transition-transform duration-500 ${
                isOpen ? "rotate-90" : ""
              }`}
            >
              →
            </span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${cs.id}-detail`}
            role="region"
            aria-label={`${cs.title} case study`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.6, ease: EASE },
              opacity: { duration: 0.5, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <CaseStudyDetail cs={cs} depth={depth} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CaseStudyDetail({ cs, depth }: { cs: CaseStudy; depth: 0 | 1 | 2 }) {
  return (
    <div className="pb-16 md:pl-[8.33%]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-10">
        {/* Narrative */}
        <div className="space-y-7 md:col-span-6">
          <DetailRow label="Context" text={cs.context} />
          <DetailRow label="Constraint" text={cs.constraint} accent />
          <DetailRow label="Decision" text={cs.decision} />
          <DetailRow label="Tradeoff" text={cs.tradeoff} />
          {cs.metric && !cs.metric.startsWith("[") && (
            <div className="border-l-2 border-[#c8a96e]/70 pl-5">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]">
                Measurable outcome
              </div>
              <p className="text-[14.5px] leading-[1.75] text-[#f0ece4] text-pretty">
                {cs.metric}
              </p>
            </div>
          )}
          <DetailRow label="Result" text={cs.result} />
          {depth >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="mt-10 border-l border-[#c8a96e]/30 pl-5">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                  What it taught me
                </div>
                <p className="text-[14px] leading-[1.75] text-[#bab7b0] italic text-pretty">
                  {cs.lesson}
                </p>
              </div>
            </motion.div>
          )}

          {/* tech stack */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8780]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture Unfold */}
        <div className="md:col-span-6">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
            Architecture
          </div>
          <ArchitectureUnfold nodes={cs.architecture} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
        {label}
      </div>
      <p
        className={`text-[14.5px] leading-[1.75] text-pretty ${
          accent ? "text-[#f0ece4]" : "text-[#bab7b0]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function ArchitectureUnfold({
  nodes,
}: {
  nodes: ReadonlyArray<{ label: string; note: string }>;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="space-y-0">
        {nodes.map((node, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.15,
              }}
              className="group relative pl-6"
            >
              {/* connector line down */}
              {i < nodes.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.15,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "top" }}
                  aria-hidden
                  className={`pointer-events-none absolute left-[7px] top-7 h-[calc(100%-12px)] w-px transition-colors duration-300 ${
                    active === i || active === i + 1
                      ? "bg-[#c8a96e]/40"
                      : "bg-white/10"
                  }`}
                />
              )}
              {/* node dot */}
              <span
                aria-hidden
                className={`absolute left-0 top-3 h-[14px] w-[14px] rounded-sm border transition-all duration-300 ${
                  isActive
                    ? "border-[#c8a96e] bg-[#c8a96e]/20"
                    : "border-white/20 bg-[#111111]"
                }`}
              />
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() =>
                  setActive((curr) => (curr === i ? null : curr))
                }
                aria-expanded={isActive}
                aria-controls={`${node.label}-note`}
                className="block w-full cursor-pointer py-3 text-left"
              >
                <div
                  className={`font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? "text-[#f0ece4]" : "text-[#a3a098]"
                  }`}
                >
                  {node.label}
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      id={`${node.label}-note`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 max-w-md overflow-hidden text-[13px] leading-[1.7] text-[#bab7b0] text-pretty"
                    >
                      {node.note}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
