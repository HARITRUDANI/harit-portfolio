"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, person } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const ids = ["top", ...navItems.map((n) => n.href.replace("#", ""))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080808]/70 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10 md:px-16">
          <a
            href="#top"
            className="group font-mono text-[12px] tracking-[0.25em] text-[#f0ece4] uppercase"
          >
            <span className="text-[#c8a96e] transition-colors group-hover:text-[#f0ece4]">
              HR
            </span>
            <span className="ml-2 hidden text-[#8a8780] sm:inline">
              · {person.name.split(" ")[0]} {person.name.split(" ")[1]}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = `#${activeId}` === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "group relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                        isActive
                          ? "text-[#f0ece4]"
                          : "text-[#a3a098] hover:text-[#f0ece4]",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px bg-[#c8a96e] transition-all duration-500",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a96e]/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8a96e]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3a098]">
              Available
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3a098] lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#080808] lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-mono text-[12px] tracking-[0.25em] text-[#c8a96e] uppercase">
                HR
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f0ece4]"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <nav className="px-6 pt-16">
              <ul className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl font-light text-[#f0ece4]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-16 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8a96e]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3a098]">
                  Available for opportunities
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
