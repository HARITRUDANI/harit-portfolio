"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

/**
 * Soft fade-up on enter. Respects prefers-reduced-motion via MotionConfig.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 12,
  duration = 0.8,
  once = true,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
