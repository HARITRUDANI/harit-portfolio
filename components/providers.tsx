"use client";

import { MotionConfig } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";
import { CursorFollower } from "@/components/cursor-follower";
import { FloatingParticles } from "@/components/floating-particles";
import { Deferred } from "@/components/deferred";

/**
 * Global motion governance.
 *
 * `reducedMotion="user"` makes Framer Motion respect prefers-reduced-motion
 * automatically. Atmospheric layers (particles, cursor) mount only after the
 * browser is idle, so they never compete with critical interaction or LCP.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ ease: EASE }}
    >
      <Deferred>
        <FloatingParticles />
        <CursorFollower />
      </Deferred>
      {children}
    </MotionConfig>
  );
}
