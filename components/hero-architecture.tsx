"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

/**
 * Hero — observed production topology.
 *
 * Not a logo, not a contained orb, not an evenly arranged node map. A quiet
 * engineering drawing that implies a system already operating: load-bearing
 * nodes, an off-white anchor (Communication, the philosophy's equilibrium),
 * one strained component arriving late, a faintly degraded relationship, and
 * a ghost trace of an old routing path that was never cleaned up.
 *
 * Asymmetric positions, sloped lines, and uneven reveal timing carry the
 * signal that this topology accumulated over time — it wasn't placed.
 *
 * Motion philosophy: a single confident reveal, then stillness.
 * Cursor proximity gently illuminates the nearest node. That's it.
 * No infinite loops. No breathing rings. No signal pulses.
 */

type Weight = "heavy" | "anchor" | "normal" | "light" | "strained";

type Node = {
  /** 0..1 across the canvas */
  x: number;
  /** 0..1 down the canvas */
  y: number;
  label: string;
  weight: Weight;
};

type Line = {
  y1: number;
  y2: number;
  fromX: number;
  toX: number;
  /** quieter top/bottom lines, white-tinted gradient */
  dim?: boolean;
  /** aged amber gradient — the relationship is not broken, just under load */
  faded?: boolean;
};

// Asymmetric positions — no node shares a y with another.
// Communication is the off-white anchor at near-center; State arrives late.
const NODES: Node[] = [
  { x: 0.30, y: 0.30, label: "Architecture", weight: "heavy" },
  { x: 0.73, y: 0.35, label: "State", weight: "strained" },
  { x: 0.47, y: 0.52, label: "Communication", weight: "anchor" },
  { x: 0.16, y: 0.67, label: "Experience", weight: "light" },
  { x: 0.61, y: 0.71, label: "Performance", weight: "normal" },
];

// Reveal delays in seconds, indexed to NODES order above.
// State (index 1) arrives ~1.1s after the first node — operational unevenness.
const REVEAL_DELAYS = [1.7, 2.88, 1.82, 2.06, 1.96];

// Five lines with tiny slopes; the Architecture↔State line is faded (aged).
const LINES: Line[] = [
  { y1: 0.15, y2: 0.156, fromX: 0.4, toX: 1.2, dim: true },
  { y1: 0.32, y2: 0.317, fromX: -0.06, toX: 1.1, faded: true },
  { y1: 0.5, y2: 0.506, fromX: 0.24, toX: 0.92 },
  { y1: 0.685, y2: 0.679, fromX: -0.06, toX: 1.06 },
  { y1: 0.87, y2: 0.876, fromX: 0.47, toX: 1.18, dim: true },
];

// Memory residue — a pre-existing trace at very low opacity that does not
// animate in. Implies a deprecated routing path the system never cleaned up.
const GHOST_LINE = {
  y1: 0.422,
  y2: 0.42,
  fromX: 0.09,
  toX: 0.79,
} as const;

type WeightConfig = {
  dot: number;
  ringStroke: string;
  fill: string;
  labelOpacity: number;
  labelSize: number;
  labelOffset: number;
};

const W: Record<Weight, WeightConfig> = {
  heavy: {
    dot: 0.68,
    ringStroke: "rgba(200,169,110,0.50)",
    fill: "#c8a96e",
    labelOpacity: 0.82,
    labelSize: 2.4,
    labelOffset: 2.7,
  },
  anchor: {
    dot: 0.64,
    ringStroke: "rgba(200,169,110,0.35)",
    fill: "rgba(240,236,228,0.80)",
    labelOpacity: 0.88,
    labelSize: 2.2,
    labelOffset: 2.5,
  },
  normal: {
    dot: 0.54,
    ringStroke: "rgba(200,169,110,0.40)",
    fill: "rgba(200,169,110,0.75)",
    labelOpacity: 0.62,
    labelSize: 2.1,
    labelOffset: 2.4,
  },
  light: {
    dot: 0.44,
    ringStroke: "rgba(200,169,110,0.32)",
    fill: "rgba(200,169,110,0.62)",
    labelOpacity: 0.46,
    labelSize: 1.9,
    labelOffset: 2.1,
  },
  strained: {
    dot: 0.5,
    ringStroke: "rgba(200,169,110,0.28)",
    fill: "rgba(200,169,110,0.6)",
    labelOpacity: 0.35,
    labelSize: 2,
    labelOffset: 2.2,
  },
};

export function HeroArchitecture() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(-1);
  const my = useMotionValue(-1);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf: number | null = null;
    let lastE: MouseEvent | null = null;

    const compute = () => {
      raf = null;
      if (!lastE) return;
      const rect = node.getBoundingClientRect();
      const x = (lastE.clientX - rect.left) / rect.width;
      const y = (lastE.clientY - rect.top) / rect.height;
      mx.set(x);
      my.set(y);

      let best: number | null = null;
      let bestD = Infinity;
      NODES.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < 0.16 && d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };

    const onMove = (e: MouseEvent) => {
      lastE = e;
      if (raf === null) raf = requestAnimationFrame(compute);
    };
    const onLeave = () => {
      mx.set(-1);
      my.set(-1);
      setActive(null);
    };

    node.addEventListener("mousemove", onMove, { passive: true });
    node.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-auto relative h-full w-full"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="hero-arch-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(200,169,110,0)" />
            <stop offset="10%" stopColor="rgba(200,169,110,0.35)" />
            <stop offset="90%" stopColor="rgba(200,169,110,0.35)" />
            <stop offset="100%" stopColor="rgba(200,169,110,0)" />
          </linearGradient>
          <linearGradient id="hero-arch-line-dim" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="10%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="90%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient
            id="hero-arch-line-faded"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
          >
            <stop offset="0%" stopColor="rgba(200,169,110,0)" />
            <stop offset="10%" stopColor="rgba(200,169,110,0.20)" />
            <stop offset="90%" stopColor="rgba(200,169,110,0.20)" />
            <stop offset="100%" stopColor="rgba(200,169,110,0)" />
          </linearGradient>
          <radialGradient id="hero-arch-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,169,110,0.55)" />
            <stop offset="100%" stopColor="rgba(200,169,110,0)" />
          </radialGradient>
        </defs>

        {/* Ghost — pre-existing residue, no animation */}
        <line
          x1={GHOST_LINE.fromX * 100}
          y1={GHOST_LINE.y1 * 100}
          x2={GHOST_LINE.toX * 100}
          y2={GHOST_LINE.y2 * 100}
          stroke="rgba(200,169,110,0.05)"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />

        {/* Lines — draw in sequence, then settle */}
        {LINES.map((line, i) => {
          const stroke = line.faded
            ? "url(#hero-arch-line-faded)"
            : line.dim
              ? "url(#hero-arch-line-dim)"
              : "url(#hero-arch-line)";
          return (
            <motion.line
              key={i}
              x1={line.fromX * 100}
              y1={line.y1 * 100}
              x2={line.toX * 100}
              y2={line.y2 * 100}
              stroke={stroke}
              strokeWidth="0.16"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.6,
                delay: 0.5 + i * 0.18,
                ease: EASE,
              }}
            />
          );
        })}

        {/* Nodes — uneven reveal timing per REVEAL_DELAYS */}
        {NODES.map((node, i) => (
          <NodeMark
            key={i}
            node={node}
            delay={REVEAL_DELAYS[i] ?? 1.8 + i * 0.12}
            isActive={active === i}
          />
        ))}
      </svg>
    </div>
  );
}

function NodeMark({
  node,
  delay,
  isActive,
}: {
  node: Node;
  delay: number;
  isActive: boolean;
}) {
  const cx = node.x * 100;
  const cy = node.y * 100;
  const cfg = W[node.weight];
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {/* halo, only when active */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={2.8}
        fill="url(#hero-arch-node-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      {/* outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={cfg.dot + 0.6}
        fill="none"
        stroke={isActive ? "rgba(200,169,110,0.9)" : cfg.ringStroke}
        strokeWidth={0.12}
        vectorEffect="non-scaling-stroke"
      />
      {/* core dot */}
      <circle cx={cx} cy={cy} r={cfg.dot} fill={cfg.fill} />
      {/* label */}
      <motion.text
        x={cx}
        y={cy - cfg.labelOffset}
        textAnchor="middle"
        fontSize={cfg.labelSize}
        fill={
          isActive
            ? "rgba(240,236,228,0.95)"
            : `rgba(186,183,176,${cfg.labelOpacity})`
        }
        className="font-mono"
        style={{ letterSpacing: "0.16em" }}
        animate={{
          fill: isActive
            ? "rgba(240,236,228,0.95)"
            : `rgba(186,183,176,${cfg.labelOpacity})`,
        }}
      >
        {node.label.toUpperCase()}
      </motion.text>
    </motion.g>
  );
}
