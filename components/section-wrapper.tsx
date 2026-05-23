"use client";

import { cn } from "@/lib/utils";
import { useDepthProtocol } from "@/hooks/use-depth-protocol";
import { SectionMarker } from "@/components/section-marker";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index?: string;
  label?: string;
  /** Thought-map domain this section belongs to. Consumed by DomainTracker. */
  domain?: string;
  children: ReactNode;
  className?: string;
  bare?: boolean;
};

export function Section({
  id,
  index,
  label,
  domain,
  children,
  className,
  bare = false,
}: SectionProps) {
  const ref = useDepthProtocol(id);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      aria-label={label}
      data-section-domain={domain}
      className={cn(
        "relative w-full",
        bare ? "py-0" : "py-14 sm:py-16 md:py-20",
        className,
      )}
    >
      {index && <SectionMarker index={index} />}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 md:px-16">
        {(index || label) && (
          <div
            aria-hidden
            className="mb-12 flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a8780] sm:mb-16 md:mb-20"
          >
            {index && <span className="text-[#c8a96e]">{index}</span>}
            {index && label && <span className="text-[#2a2a2a]">/</span>}
            {label && <span>{label}</span>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
