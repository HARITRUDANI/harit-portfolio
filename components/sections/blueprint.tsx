"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/section-wrapper";

const NODES = [
  { id: "event", x: 9, y: 14.8, label: "Event", sub: "user action" },
  { id: "async", x: 28, y: 15.4, label: "Async", sub: "network · queue" },
  { id: "state", x: 51, y: 14.6, label: "State", sub: "invariants" },
  { id: "derive", x: 73, y: 15.2, label: "Derive", sub: "selectors" },
  { id: "view", x: 91, y: 15.1, label: "View", sub: "render layer" },
] as const;

const REVEAL_DELAY = 1.2;

/**
 * Blueprint — a single restrained schematic of how a state change moves
 * through a real system. Sits between Notes and the first Pause as a
 * quiet interlude, not a numbered chapter.
 *
 * Two layouts: a horizontal SVG on sm+ and a vertical HTML stack on mobile.
 * Motion settles; nothing loops. The signal dot fades to a near-forgotten
 * glow at the final node — the visual equivalent of a thought trailing off.
 */
export function Blueprint() {
  return (
    <Section
      id="blueprint"
      domain="state"
      className="py-2 sm:py-6 md:py-8"
    >
      <div className="hidden sm:grid sm:grid-cols-12 sm:items-center sm:gap-x-8">
        <div className="sm:col-span-9">
          <BlueprintSVG />
        </div>
        <div className="sm:col-span-3">
          <p className="max-w-xs text-[13px] leading-[1.75] text-[#8a8780] italic text-pretty">
            Every visible change is the tail of an invisible flow.
          </p>
        </div>
      </div>

      <div className="sm:hidden">
        <BlueprintStack />
        <p className="mx-auto mt-8 max-w-[22ch] text-center text-[13.5px] leading-[1.75] text-[#8a8780] italic text-pretty">
          Every visible change is the tail of an invisible flow.
        </p>
      </div>
    </Section>
  );
}

function BlueprintSVG() {
  const lastIdx = NODES.length - 1;
  const lastNode = NODES[lastIdx];

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="aspect-[5/1.5] w-full"
      role="img"
      aria-label="A diagram of how a state change flows through a system: event, async boundary, state, derivation, view."
    >
      {NODES.slice(0, -1).map((node, i) => {
        const next = NODES[i + 1];
        if (!next) return null;
        return (
          <motion.line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={next.x}
            y2={next.y}
            stroke="rgba(255,255,255,0.24)"
            strokeWidth={0.35}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: 0.7,
              delay: REVEAL_DELAY + i * 0.15,
              ease: EASE,
            }}
          />
        );
      })}

      {NODES.map((node, i) => (
        <motion.g
          key={`node-${node.id}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 0.5,
            delay: REVEAL_DELAY + 0.4 + i * 0.15,
            ease: "easeOut",
          }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={1.8}
            fill="none"
            stroke="rgba(200,169,110,0.7)"
            strokeWidth={0.24}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={node.x}
            y={node.y - 4.2}
            textAnchor="middle"
            className="font-mono"
            fontSize="2.4"
            fill="#a3a098"
            style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={node.y + 5.8}
            textAnchor="middle"
            className="font-mono"
            fontSize="1.8"
            fill="#6f6c64"
            style={{ letterSpacing: "0.05em" }}
          >
            {node.sub}
          </text>
        </motion.g>
      ))}

      {lastNode && (
        <motion.circle
          r={0.9}
          fill="rgb(200,169,110)"
          initial={{ cx: NODES[0]?.x ?? 0, cy: NODES[0]?.y ?? 15, opacity: 0 }}
          whileInView={{
            cx: [...NODES.map((n) => n.x), lastNode.x],
            cy: [...NODES.map((n) => n.y), lastNode.y],
            opacity: [0, 1, 1, 1, 1, 0.18],
          }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 5,
            delay: REVEAL_DELAY + 1.6,
            times: [0, 0.2, 0.45, 0.7, 0.92, 1],
            ease: "easeInOut",
          }}
        />
      )}
    </svg>
  );
}

function BlueprintStack() {
  return (
    <ol className="relative mx-auto max-w-xs space-y-7">
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.4, delay: REVEAL_DELAY, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="absolute top-3 bottom-3 left-[3.5px] w-px bg-white/[0.08]"
      />

      {NODES.map((node, i) => {
        const isFinal = i === NODES.length - 1;
        return (
          <li key={node.id} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.7,
                delay: REVEAL_DELAY + 0.4 + i * 0.18,
                ease: EASE,
              }}
              className="flex items-baseline gap-4"
            >
              <span
                aria-hidden
                className="relative mt-2 h-2 w-2 shrink-0 rounded-full border border-[#c8a96e]/45"
              >
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{
                    opacity: [0, 1, 1, isFinal ? 0.18 : 0],
                    scale: [1, 1.6, 1.6, 1],
                  }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{
                    duration: 1.4,
                    delay: REVEAL_DELAY + 1.8 + i * 0.55,
                    times: [0, 0.18, 0.7, 1],
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-[#c8a96e]"
                />
              </span>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a3a098]">
                  {node.label}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5a5852]">
                  {node.sub}
                </div>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
