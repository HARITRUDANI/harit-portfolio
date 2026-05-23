"use client";

import { useEffect, useRef } from "react";
import { useDepthStore, type DepthLevel } from "@/store/depth-store";

/**
 * Watches a section for genuine reading behaviour.
 * Reports enter/exit to the depth store. No mouse tracking, no clever heuristics.
 * Just time-in-viewport + revisit detection.
 *
 * Auto-promotes the section to depth 1 after a 5s timer while in view,
 * so depth reveals happen even without scrolling away.
 */
export function useDepthProtocol(sectionId: string) {
  const ref = useRef<HTMLElement | null>(null);
  const enterSection = useDepthStore((s) => s.enterSection);
  const exitSection = useDepthStore((s) => s.exitSection);
  const setDepth = useDepthStore((s) => s.setDepth);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let inViewTimer: ReturnType<typeof setTimeout> | null = null;
    let depth2Timer: ReturnType<typeof setTimeout> | null = null;
    let isCurrentlyVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const visible = entry.intersectionRatio >= 0.4;
          if (visible && !isCurrentlyVisible) {
            isCurrentlyVisible = true;
            enterSection(sectionId);
            inViewTimer = setTimeout(() => {
              setDepth(sectionId, 1 as DepthLevel);
            }, 5000);
            depth2Timer = setTimeout(() => {
              setDepth(sectionId, 2 as DepthLevel);
            }, 12000);
          } else if (!visible && isCurrentlyVisible) {
            isCurrentlyVisible = false;
            if (inViewTimer) clearTimeout(inViewTimer);
            if (depth2Timer) clearTimeout(depth2Timer);
            exitSection(sectionId);
          }
        }
      },
      { threshold: [0, 0.4, 0.8] }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (inViewTimer) clearTimeout(inViewTimer);
      if (depth2Timer) clearTimeout(depth2Timer);
      if (isCurrentlyVisible) exitSection(sectionId);
    };
  }, [sectionId, enterSection, exitSection, setDepth]);

  return ref;
}
