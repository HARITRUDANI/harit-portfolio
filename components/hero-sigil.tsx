"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Living signature for the hero's right side.
 *
 * Not a logo — a small orchestra of nodes connected by thin amber arcs
 * that slowly breathe. Suggests a working mind on the page.
 * Framer Motion handles mount-driven entrance via initial/animate.
 */
export function HeroSigil() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative aspect-square w-full max-w-[440px]"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.2"
        strokeLinecap="round"
      >
        <defs>
          <radialGradient id="sigil-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.10" />
            <stop offset="60%" stopColor="#c8a96e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sigil-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c8a96e" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* faint glow halo, breathes */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#sigil-glow)"
          stroke="none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* outer ring — draws on mount */}
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />

        {/* inner orbit ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="22"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.15"
          strokeDasharray="0.6 1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
        />

        {/* connection lines (draw sequentially) */}
        {[
          ["M50 12", "L50 38"],
          ["M88 50", "L62 50"],
          ["M50 88", "L50 62"],
          ["M12 50", "L38 50"],
          ["M28 28", "L42 42"],
          ["M72 28", "L58 42"],
          ["M28 72", "L42 58"],
          ["M72 72", "L58 58"],
        ].map(([start, end], i) => (
          <motion.path
            key={i}
            d={`${start} ${end}`}
            stroke="url(#sigil-line)"
            strokeWidth="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{
              duration: 1.4,
              delay: 0.7 + i * 0.12,
              ease: EASE,
            }}
          />
        ))}

        {/* outer nodes */}
        {[
          { x: 50, y: 12, delay: 0.6 },
          { x: 88, y: 50, delay: 0.7 },
          { x: 50, y: 88, delay: 0.8 },
          { x: 12, y: 50, delay: 0.9 },
          { x: 28, y: 28, delay: 1.0 },
          { x: 72, y: 28, delay: 1.1 },
          { x: 28, y: 72, delay: 1.2 },
          { x: 72, y: 72, delay: 1.3 },
        ].map(({ x, y, delay }, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="0.9"
              fill="#c8a96e"
              stroke="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.6, delay }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="2.5"
              stroke="#c8a96e"
              strokeWidth="0.15"
              strokeOpacity="0.25"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{
                duration: 4,
                delay: delay + 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          </motion.g>
        ))}

        {/* inner ring of small ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 50 + Math.cos(angle) * 22;
          const y1 = 50 + Math.sin(angle) * 22;
          const x2 = 50 + Math.cos(angle) * 25;
          const y2 = 50 + Math.sin(angle) * 25;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.18"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.04 }}
            />
          );
        })}

        {/* central node — gentle pulse */}
        <motion.circle
          cx="50"
          cy="50"
          r="1.6"
          fill="#c8a96e"
          stroke="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
          transition={{
            duration: 4,
            delay: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "50px 50px" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="4.5"
          stroke="#c8a96e"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* slow rotation overlay — almost imperceptible */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 180, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i / 36) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 38;
            const y = 50 + Math.sin(angle) * 38;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="0.18"
                fill="rgba(255,255,255,0.18)"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + i * 0.02, duration: 0.4 }}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
