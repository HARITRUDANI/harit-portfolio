"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after the browser is idle (or 2.5s timeout fallback).
 *
 * Use for decorative, non-critical client mounts (particles, cursor effects)
 * so they never compete with critical interaction or LCP work.
 *
 * Mount is one-shot — once shown, never unmounted.
 */
export function Deferred({
  children,
  timeoutMs = 2500,
}: {
  children: ReactNode;
  timeoutMs?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), 1);
    const cic =
      "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : (id: number) => window.clearTimeout(id);

    const id = ric(() => setReady(true), { timeout: timeoutMs });
    return () => cic(id as number);
  }, [timeoutMs]);

  if (!ready) return null;
  return <>{children}</>;
}
