"use client";

import { create } from "zustand";

export type DepthLevel = 0 | 1 | 2;

type SectionState = {
  visitedAt: number | null;
  totalViewTime: number;
  revisited: boolean;
};

type DepthState = {
  /** Per-section depth based on reading signals. */
  sectionDepth: Record<string, DepthLevel>;
  sectionState: Record<string, SectionState>;
  /** Currently most-visible thought-map domain — null if nothing is centered. */
  activeDomain: string | null;
  /**
   * Highest depth reached across all sections in this session.
   * Drives ambient calming — particles dim as accumulated attention grows.
   */
  maxGlobalDepth: DepthLevel;
  /** Called from the IntersectionObserver hook. */
  enterSection: (id: string) => void;
  exitSection: (id: string) => void;
  /** Reveal depth for a specific section. */
  setDepth: (id: string, depth: DepthLevel) => void;
  /** Called from the DomainTracker to surface the currently-active domain. */
  setActiveDomain: (d: string | null) => void;
};

const SURFACE_TIME = 5000; // 5 seconds in viewport → depth 1
const REVISIT_BONUS_TIME = 3000; // 3 seconds on revisit → depth 2

export const useDepthStore = create<DepthState>((set, get) => ({
  sectionDepth: {},
  sectionState: {},
  activeDomain: null,
  maxGlobalDepth: 0,

  enterSection: (id) => {
    const now = Date.now();
    const state = get().sectionState[id] ?? {
      visitedAt: null,
      totalViewTime: 0,
      revisited: false,
    };

    set((s) => ({
      sectionState: {
        ...s.sectionState,
        [id]: {
          ...state,
          visitedAt: now,
          revisited: state.totalViewTime > 0,
        },
      },
    }));
  },

  exitSection: (id) => {
    const state = get().sectionState[id];
    if (!state?.visitedAt) return;

    const now = Date.now();
    const sessionTime = now - state.visitedAt;
    const newTotal = state.totalViewTime + sessionTime;

    let depth: DepthLevel = 0;
    if (newTotal >= SURFACE_TIME) depth = 1;
    if (newTotal >= SURFACE_TIME + REVISIT_BONUS_TIME && state.revisited) depth = 2;
    if (state.revisited && newTotal >= SURFACE_TIME * 2) depth = 2;

    set((s) => {
      const nextDepth = Math.max(s.sectionDepth[id] ?? 0, depth) as DepthLevel;
      return {
        sectionState: {
          ...s.sectionState,
          [id]: { ...state, visitedAt: null, totalViewTime: newTotal },
        },
        sectionDepth: {
          ...s.sectionDepth,
          [id]: nextDepth,
        },
        maxGlobalDepth: Math.max(s.maxGlobalDepth, nextDepth) as DepthLevel,
      };
    });
  },

  setDepth: (id, depth) =>
    set((s) => {
      const nextDepth = Math.max(s.sectionDepth[id] ?? 0, depth) as DepthLevel;
      return {
        sectionDepth: {
          ...s.sectionDepth,
          [id]: nextDepth,
        },
        maxGlobalDepth: Math.max(s.maxGlobalDepth, nextDepth) as DepthLevel,
      };
    }),

  setActiveDomain: (d) =>
    set((s) => (s.activeDomain === d ? s : { activeDomain: d })),
}));

/** Selector helper — read depth for one section. */
export function useSectionDepth(id: string): DepthLevel {
  return useDepthStore((s) => s.sectionDepth[id] ?? 0);
}

/** Selector helper — read the currently-active thought-map domain. */
export function useActiveDomain(): string | null {
  return useDepthStore((s) => s.activeDomain);
}

/**
 * Selector helper — read the highest depth reached across all sections.
 * Drives ambient calming: the environment quiets as accumulated reading depth grows.
 */
export function useMaxGlobalDepth(): DepthLevel {
  return useDepthStore((s) => s.maxGlobalDepth);
}
