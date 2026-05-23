"use client";

import { useEffect } from "react";
import { useDepthStore } from "@/store/depth-store";

/**
 * Watches every section that declares `data-section-domain` and writes the
 * most-visible domain into the depth store. The ThoughtMap reads this atom
 * to subtly sharpen the matching node. Subconscious, not interactive.
 *
 * One IntersectionObserver only; rootMargin shrinks the viewport so a
 * section only counts as "active" when it sits near the centre.
 */
export function DomainTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const setActiveDomain = useDepthStore.getState().setActiveDomain;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-domain]"),
    );
    if (nodes.length === 0) return;

    const visible = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target as HTMLElement, entry.intersectionRatio);
          } else {
            visible.delete(entry.target as HTMLElement);
          }
        }

        let winner: HTMLElement | null = null;
        let bestRatio = 0;
        for (const [el, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            winner = el;
          }
        }

        if (winner) {
          const domain = winner.dataset.sectionDomain ?? null;
          setActiveDomain(domain);
        } else {
          setActiveDomain(null);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-30% 0px -30% 0px",
      },
    );

    for (const node of nodes) observer.observe(node);

    return () => {
      observer.disconnect();
      setActiveDomain(null);
    };
  }, []);

  return null;
}
