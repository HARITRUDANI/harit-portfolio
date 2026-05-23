"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Premium cursor follower.
 *
 * A small amber dot that gently follows the cursor with spring physics.
 * The outer ring grows over interactive elements.
 * Uses motion values + refs to avoid React render churn — no re-renders per
 * mousemove. Hidden on touch devices via CSS @media (pointer: coarse).
 * Respects prefers-reduced-motion by being hidden entirely.
 */
export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const activeMv = useMotionValue(0);
  const hoverMv = useMotionValue(0);

  const cursorX = useSpring(x, { damping: 22, stiffness: 280, mass: 0.4 });
  const cursorY = useSpring(y, { damping: 22, stiffness: 280, mass: 0.4 });
  // Ambient glow: heavier damping, lazy follow, lighting effect
  const glowX = useSpring(x, { damping: 38, stiffness: 80, mass: 1.4 });
  const glowY = useSpring(y, { damping: 38, stiffness: 80, mass: 1.4 });
  const dotOpacity = useSpring(activeMv, { damping: 30, stiffness: 250 });
  const ringScale = useTransform(hoverMv, [0, 1], [1, 1.6]);
  const ringOpacity = useTransform<number, number>(
    [activeMv, hoverMv],
    ([a = 0, h = 0]) => a * (0.4 + h * 0.4),
  );
  const glowOpacity = useTransform<number, number>(
    [activeMv, hoverMv],
    ([a = 0, h = 0]) => a * (0.4 + h * 0.6),
  );
  const glowScale = useTransform(hoverMv, [0, 1], [1, 1.4]);

  const lastOverWasInteractive = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // RAF-throttle: at most one mouse update per animation frame.
    // Saves dozens of redundant motion-value writes per second on fast mice.
    let nextX = -100;
    let nextY = -100;
    let rafId: number | null = null;
    const tick = () => {
      x.set(nextX);
      y.set(nextY);
      if (activeMv.get() !== 1) activeMv.set(1);
      rafId = null;
    };

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };
    const onLeave = () => activeMv.set(0);
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        "a, button, [role='button'], [tabindex]:not([tabindex='-1']), input, label, svg[role='button']",
      );
      if (isInteractive !== lastOverWasInteractive.current) {
        lastOverWasInteractive.current = isInteractive;
        hoverMv.set(isInteractive ? 1 : 0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, activeMv, hoverMv]);

  return (
    <div
      data-ambient="cursor"
      className="contents [@media(pointer:coarse)]:hidden motion-reduce:hidden"
    >
      {/* Ambient glow — lazy follow, soft amber lighting */}
      <motion.div
        aria-hidden
        style={{
          x: glowX,
          y: glowY,
          opacity: glowOpacity,
          scale: glowScale,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[140] -ml-[160px] -mt-[160px] h-[320px] w-[320px] rounded-full will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,110,0.10), rgba(200,169,110,0.02) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Outer interactive ring */}
      <motion.div
        aria-hidden
        style={{
          x: cursorX,
          y: cursorY,
          opacity: ringOpacity,
          scale: ringScale,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[150] -ml-[14px] -mt-[14px] h-7 w-7 rounded-full border border-[#c8a96e]/40"
      />

      {/* Core dot */}
      <motion.div
        aria-hidden
        style={{
          x: cursorX,
          y: cursorY,
          opacity: dotOpacity,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[151] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#c8a96e] mix-blend-difference"
      />
    </div>
  );
}
