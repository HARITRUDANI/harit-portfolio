"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Soft reveal. Used when content "arrives" rather than animates in.
 * Slow opacity + tiny y movement. No drama.
 */
export function Reveal({
  show,
  children,
  delay = 0,
}: {
  show: boolean;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
