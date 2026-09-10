/**
 * Race a timer against rAF and let whichever fires first win.
 *
 * requestAnimationFrame stops entirely when a tab is backgrounded. Any
 * sequence that chains its next step off rAF alone will stall there
 * forever, which is how a transition curtain ends up stuck over the page.
 * setTimeout keeps firing (throttled) in a background tab, so it acts as
 * the guarantee while rAF gives us frame-accurate timing when visible.
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") { resolve(); return; }
    let settled = false;
    let raf = 0;
    const start = performance.now();

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      resolve();
    };

    const timer = setTimeout(finish, ms);
    const tick = () => {
      if (performance.now() - start >= ms) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  });
}

/** Resolve on the next paint, with the same background-tab guarantee. */
export function nextPaint(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") { resolve(); return; }
    let settled = false;
    const finish = () => { if (settled) return; settled = true; clearTimeout(t); resolve(); };
    const t = setTimeout(finish, 120);
    requestAnimationFrame(() => requestAnimationFrame(finish));
  });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
