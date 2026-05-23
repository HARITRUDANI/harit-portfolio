"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMaxGlobalDepth } from "@/store/depth-store";

/**
 * Ambient atmosphere — dots, signal traces, and architectural echoes.
 *
 * Most of the field is faint amber dots drifting upward. Every fifth element
 * is rendered as a thin horizontal line segment (a "signal trace"), giving the
 * atmosphere a systemic rather than decorative character.
 *
 * Three "echo" elements sit at fixed x-positions that mirror the Blueprint
 * section's EVENT / STATE / VIEW nodes. They flicker for ~2s once every
 * ~135s — barely there. The architecture leaves traces in the ambient layer.
 *
 * The entire field dims subtly as accumulated reading depth grows
 * (maxGlobalDepth from the depth store). The depth protocol becomes the
 * invisible philosophy of attention: the environment calms as the reader
 * stays.
 *
 * Sits behind all content (z-0 with pointer-events-none). Hidden on touch
 * devices + reduced motion to save battery.
 */
const PARTICLE_COUNT = 28;

type Particle = {
  x: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  blur: number;
  opacity: number;
  trace: boolean;
};

/**
 * Architectural memory echoes. x-positions mirror the Blueprint schematic's
 * EVENT, STATE, VIEW nodes. Visible for ~2s out of every ~135s. Discovered,
 * not presented.
 */
const ECHO_POSITIONS = [
  { x: 9, delay: 14, duration: 128 },
  { x: 51, delay: 74, duration: 142 },
  { x: 91, delay: 134, duration: 135 },
] as const;

function generateParticles(): Particle[] {
  // Pre-computed deterministic table — keeps SSR markup byte-identical to client.
  // Generated once with a fixed PRNG; rounded to 3 decimals to avoid FP drift.
  const table = [
    [0.42, 0.12, 0.71, 0.34, 0.58, 0.27, 0.62],
    [0.19, 0.83, 0.45, 0.92, 0.31, 0.66, 0.18],
    [0.74, 0.05, 0.91, 0.28, 0.49, 0.83, 0.51],
    [0.36, 0.68, 0.22, 0.79, 0.04, 0.41, 0.95],
    [0.88, 0.51, 0.13, 0.62, 0.74, 0.07, 0.28],
    [0.55, 0.94, 0.39, 0.18, 0.85, 0.62, 0.71],
    [0.09, 0.31, 0.77, 0.46, 0.21, 0.94, 0.04],
    [0.61, 0.86, 0.24, 0.93, 0.57, 0.32, 0.83],
    [0.27, 0.18, 0.95, 0.71, 0.42, 0.59, 0.36],
    [0.83, 0.59, 0.06, 0.34, 0.78, 0.21, 0.65],
    [0.14, 0.42, 0.81, 0.57, 0.93, 0.48, 0.12],
    [0.71, 0.04, 0.36, 0.85, 0.19, 0.74, 0.92],
    [0.46, 0.78, 0.62, 0.09, 0.51, 0.86, 0.27],
    [0.92, 0.27, 0.51, 0.74, 0.31, 0.16, 0.58],
    [0.38, 0.65, 0.18, 0.42, 0.88, 0.59, 0.04],
    [0.05, 0.51, 0.94, 0.81, 0.26, 0.71, 0.42],
    [0.79, 0.32, 0.46, 0.13, 0.62, 0.95, 0.71],
    [0.31, 0.85, 0.71, 0.58, 0.04, 0.27, 0.86],
    [0.65, 0.18, 0.27, 0.91, 0.42, 0.51, 0.34],
    [0.17, 0.73, 0.59, 0.36, 0.81, 0.13, 0.94],
    [0.84, 0.46, 0.05, 0.71, 0.27, 0.65, 0.38],
    [0.52, 0.94, 0.81, 0.18, 0.59, 0.42, 0.71],
    [0.08, 0.31, 0.42, 0.85, 0.71, 0.24, 0.16],
    [0.69, 0.62, 0.18, 0.49, 0.34, 0.81, 0.55],
    [0.41, 0.27, 0.75, 0.62, 0.93, 0.06, 0.48],
    [0.86, 0.08, 0.31, 0.95, 0.46, 0.71, 0.29],
    [0.23, 0.71, 0.85, 0.42, 0.62, 0.34, 0.78],
    [0.57, 0.34, 0.49, 0.21, 0.85, 0.92, 0.13],
  ];
  return table.slice(0, PARTICLE_COUNT).map(
    ([x = 0, d = 0, dur = 0, s = 0, dr = 0.5, b = 0, o = 0], i) => ({
      x: x * 100,
      delay: d * 20,
      duration: 22 + dur * 18,
      size: 1.5 + s * 2.5,
      drift: (dr - 0.5) * 60,
      blur: 0.5 + b * 1.5,
      opacity: 0.12 + o * 0.16,
      trace: i % 5 === 0,
    }),
  );
}

export function FloatingParticles() {
  const allParticles = useMemo(() => generateParticles(), []);
  const [count, setCount] = useState(allParticles.length);
  const [opacityScale, setOpacityScale] = useState(1);
  const globalDepth = useMaxGlobalDepth();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      setCount(mq.matches ? 12 : allParticles.length);
      setOpacityScale(mq.matches ? 0.55 : 1);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [allParticles.length]);

  const particles = allParticles.slice(0, count);

  // Ambient calming: as accumulated reading depth grows, the field quiets.
  const ambientOpacity =
    globalDepth >= 2 ? 0.7 : globalDepth >= 1 ? 0.85 : 1;

  return (
    <motion.div
      aria-hidden
      data-ambient="particles"
      animate={{ opacity: ambientOpacity }}
      transition={{ duration: 6, ease: "easeInOut" }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden [@media(pointer:coarse)]:hidden motion-reduce:hidden"
    >
      {particles.map((p, i) => {
        const finalOpacity = p.opacity * opacityScale;
        return (
          <motion.span
            key={i}
            className={p.trace ? "absolute bg-[#c8a96e]" : "absolute rounded-full bg-[#c8a96e]"}
            style={{
              left: `${p.x}%`,
              bottom: -10,
              width: p.trace ? p.size * 4 : p.size,
              height: p.trace ? 0.6 : p.size,
              filter: `blur(${p.blur}px)`,
              opacity: finalOpacity,
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: [0, p.drift, -p.drift, 0],
              opacity: [0, finalOpacity, finalOpacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
            }}
          />
        );
      })}

      {/* Architectural memory echoes — mirror the Blueprint schematic. */}
      {ECHO_POSITIONS.map((echo, i) => (
        <motion.span
          key={`echo-${i}`}
          className="absolute bg-[#c8a96e]"
          style={{
            left: `${echo.x}%`,
            bottom: "48%",
            width: 1.2,
            height: 1.2,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0, 0.07, 0.07, 0],
          }}
          transition={{
            duration: echo.duration,
            delay: echo.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.955, 0.965, 0.985, 1],
          }}
        />
      ))}
    </motion.div>
  );
}
