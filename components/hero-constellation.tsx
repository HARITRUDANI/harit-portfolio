"use client";

import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useRef } from "react";

/**
 * Hero — System Relationship Constellation.
 *
 * Six engineering domains as labelled satellite nodes around a central
 * focal point. Connections draw slowly. Signals travel along connections.
 * Outer nodes pulse softly. Whole composition rotates by a few degrees
 * over a long cycle — almost imperceptible.
 *
 * Not a logo. Not a graph. A quiet representation of how a senior engineer
 * thinks about a system. The user should sense it before they read it.
 */

type Node = { id: string; label: string; x: number; y: number; central?: boolean };

const NODES: readonly Node[] = [
  { id: "system", label: "SYSTEM", x: 50, y: 50, central: true },
  { id: "architecture", label: "ARCHITECTURE", x: 20, y: 22 },
  { id: "state", label: "STATE", x: 78, y: 24 },
  { id: "performance", label: "PERFORMANCE", x: 88, y: 56 },
  { id: "scale", label: "SCALE", x: 70, y: 86 },
  { id: "ux", label: "EXPERIENCE", x: 28, y: 86 },
  { id: "communication", label: "COMMUNICATION", x: 12, y: 56 },
];

const EDGES: ReadonlyArray<readonly [string, string]> = [
  ["system", "architecture"],
  ["system", "state"],
  ["system", "performance"],
  ["system", "scale"],
  ["system", "ux"],
  ["system", "communication"],
  ["architecture", "state"],
  ["state", "performance"],
  ["performance", "scale"],
  ["scale", "ux"],
  ["ux", "communication"],
  ["communication", "architecture"],
];

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function HeroConstellation() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  // Pause expensive infinite SVG animations when the constellation is offscreen.
  // Initial render still draws (so first paint matches design); subsequent
  // animation cycles only run when visible.
  const inView = useInView(wrapRef, { margin: "10% 0px" });
  const playState = inView ? "running" : "paused";

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none relative aspect-square w-full max-w-[460px] will-transform"
      style={{ animationPlayState: playState }}
    >
      {/* very soft warm halo behind the whole thing */}
      <motion.div
        className="absolute inset-[14%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.05), rgba(200,169,110,0) 70%)",
        }}
        animate={inView ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.85 }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        animate={inView ? { rotate: [0, 2, 0, -2, 0] } : { rotate: 0 }}
        transition={{ duration: 90, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="hero-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {EDGES.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          const isCentral = from === "system" || to === "system";
          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isCentral ? "rgba(200,169,110,0.18)" : "rgba(255,255,255,0.06)"}
                strokeWidth="0.12"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.2,
                  delay: 0.5 + i * 0.08,
                  ease: EASE,
                }}
              />
              {/* travelling signal — a small dot that moves along the line.
                  cx/cy provided in initial so Framer Motion has valid values
                  before the keyframed animate prop takes over. */}
              {isCentral && inView && (
                <motion.circle
                  r="0.5"
                  fill="#c8a96e"
                  initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                  animate={{
                    cx: [a.x, b.x],
                    cy: [a.y, b.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.4,
                    delay: 3 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Outer nodes */}
        {NODES.filter((n) => !n.central).map((node, i) => (
          <g key={node.id}>
            {/* breathing ring — only while in view */}
            {inView && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="2.5"
                fill="none"
                stroke="rgba(200,169,110,0.18)"
                strokeWidth="0.12"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.6, 2, 2],
                }}
                transition={{
                  duration: 5,
                  delay: 2 + i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
            {/* core dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="0.6"
              fill="#c8a96e"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {/* label */}
            <motion.text
              x={node.x}
              y={node.y + (node.y > 60 ? 6 : -3.5)}
              textAnchor="middle"
              fill="rgba(186,183,176,0.78)"
              fontSize="2.8"
              className="font-mono"
              style={{ letterSpacing: "0.18em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.12 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}

        {/* Central node */}
        <g>
          {/* outer halo */}
          <circle cx="50" cy="50" r="9" fill="url(#hero-node-glow)" />
          {/* breathing ring — only while in view */}
          {inView && (
            <motion.circle
              cx="50"
              cy="50"
              r="4"
              fill="none"
              stroke="rgba(200,169,110,0.45)"
              strokeWidth="0.18"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 6,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "50px 50px" }}
            />
          )}
          {/* core */}
          <motion.circle
            cx="50"
            cy="50"
            r="1.3"
            fill="#c8a96e"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "50px 50px" }}
          />
          {/* gentle pulse on core — gated to in-view */}
          <motion.circle
            cx="50"
            cy="50"
            r="0.7"
            fill="#f0ece4"
            animate={inView ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.85 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </motion.svg>
    </div>
  );
}
