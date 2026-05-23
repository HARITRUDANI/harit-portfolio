"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic wrapper.
 *
 * Wrap any element. When the cursor enters its bounding box (extended by
 * `radius`), the element pulls slightly toward the cursor. On leave, springs
 * back to centre. Restrained — never more than `strength` px.
 *
 * Use sparingly. Best on CTAs and key clickable elements.
 */
export function Magnetic({
  children,
  strength = 18,
  radius = 0,
  className,
}: {
  children: ReactNode;
  /** Max pull in pixels. Keep small for restraint (12–24). */
  strength?: number;
  /** Extra hit-area radius in pixels. */
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 280, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onPointerMove={(e) => {
        const node = ref.current;
        if (!node) return;
        const r = node.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const max = Math.max(r.width, r.height) / 2 + radius;
        if (dist > max) {
          mx.set(0);
          my.set(0);
          return;
        }
        const pull = 1 - dist / max;
        mx.set((dx / max) * strength * pull);
        my.set((dy / max) * strength * pull);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
