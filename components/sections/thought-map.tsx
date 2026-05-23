"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { thoughtMap } from "@/lib/data";
import { useActiveDomain } from "@/store/depth-store";

/**
 * System Thought Map.
 * A minimal node-and-line diagram of how engineering concerns connect.
 * Static by default; hover a node to surface a real thought about that domain.
 *
 * Scroll-aware: as the reader passes through downstream sections, the node
 * that corresponds to the current section subtly sharpens. Hover always wins.
 * The right-side description panel only updates on hover/focus/tap —
 * scroll alone does not swap text (would create a chase-the-mouse feel).
 */
export function ThoughtMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeDomain = useActiveDomain();
  const nodeById = useMemo(
    () => Object.fromEntries(thoughtMap.nodes.map((n) => [n.id, n])),
    [],
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-16">
      <div className="lg:col-span-7">
        <div className="relative aspect-[5/4] w-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="A diagram showing how engineering concerns connect."
          >
            {/* edges */}
            {thoughtMap.edges.map(([from, to], i) => {
              const a = nodeById[from];
              const b = nodeById[to];
              if (!a || !b) return null;
              const isHover = active === from || active === to;
              const isDomain =
                !active &&
                activeDomain != null &&
                (activeDomain === from || activeDomain === to);
              const stroke = isHover
                ? "rgb(200,169,110)"
                : isDomain
                  ? "rgba(200,169,110,0.28)"
                  : "rgba(200,169,110,0.22)";
              const strokeWidth = isHover ? 0.32 : 0.22;
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{
                    duration: 1.4,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {/* nodes */}
            {thoughtMap.nodes.map((node, i) => {
              const isActive = active === node.id;
              const isDomain = !active && activeDomain === node.id;
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.06,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === node.id ? null : node.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(active === node.id ? null : node.id);
                    }
                  }}
                  role="button"
                  aria-label={`${node.label} — show thinking`}
                  aria-pressed={isActive}
                  className="cursor-pointer"
                  tabIndex={0}
                >
                  {/* enlarged hit area for touch */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={9}
                    fill="transparent"
                  />
                  {/* Settling pulse — two slow breaths on first reveal,
                      then stillness. Constitution: motion settles into
                      stillness; no continuous distracting loops. */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="2"
                    fill="none"
                    stroke="rgba(200,169,110,0.4)"
                    strokeWidth={0.15}
                    vectorEffect="non-scaling-stroke"
                    initial={{ r: 2, opacity: 0 }}
                    whileInView={{
                      r: [2, 4.5, 2, 4.5, 2],
                      opacity: [0, 0.55, 0, 0.4, 0],
                    }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{
                      duration: 9,
                      delay: 0.6 + i * 0.35,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                  {/* outer ring */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 3.5 : 2.5}
                    fill={isActive ? "rgba(200,169,110,0.16)" : "transparent"}
                    stroke={
                      isActive
                        ? "rgb(200,169,110)"
                        : isDomain
                          ? "rgba(200,169,110,0.62)"
                          : "rgba(200,169,110,0.5)"
                    }
                    strokeWidth={0.32}
                    vectorEffect="non-scaling-stroke"
                    animate={{ r: isActive ? 3.5 : 2.2 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  {/* inner dot */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={0.9}
                    fill={
                      isActive
                        ? "rgb(200,169,110)"
                        : isDomain
                          ? "rgba(228,212,180,1)"
                          : "rgba(240,236,228,0.95)"
                    }
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  {/* label */}
                  <text
                    x={node.x}
                    y={node.y + (node.y > 70 ? 8 : -4)}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="2.4"
                    fill={
                      isActive
                        ? "rgb(240,236,228)"
                        : isDomain
                          ? "rgba(208,205,198,1)"
                          : "rgba(186,183,176,0.95)"
                    }
                    style={{
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      transition: "fill 500ms",
                    }}
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="mb-10 max-w-md text-[14px] leading-[1.75] text-[#a3a098] text-pretty">
          {thoughtMap.description}
        </p>
        <div className="min-h-[180px]">
          {active ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border-l border-[#c8a96e]/40 pl-5"
            >
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#c8a96e]">
                {nodeById[active]?.label}
              </div>
              <p className="text-[15px] leading-[1.75] text-[#f0ece4] text-pretty">
                {nodeById[active]?.note}
              </p>
            </motion.div>
          ) : (
            <div className="border-l border-white/[0.08] pl-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8780]">
                Tap or hover a node
              </div>
              <p className="text-[14px] leading-[1.7] text-[#8a8780] italic">
                Each one connects to the others. Each one has a thought
                behind it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
