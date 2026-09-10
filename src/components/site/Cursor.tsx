"use client";

import { useEffect, useRef, useState } from "react";
import { DESKTOP_POINTER_QUERY, prefersReducedMotion } from "@/lib/utils";

/**
 * Desktop-only cursor companion. The native cursor stays visible; this adds a trailing ring
 * that grows over links and turns into a labelled disc over anything with data-cursor="Label".
 * It also feeds --mx/--my to .spotlight cards so their border glow follows the pointer.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY);
    const sync = () => setEnabled(mq.matches && !prefersReducedMotion());
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".spotlight");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest?.<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(Boolean(t?.closest?.("a, button, [role='button'], [tabindex='0']")));
    };
    const onLeave = () => {
      tx = -100;
      ty = -100;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 46 : 26;
  return (
    <div ref={ringRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0" style={{ zIndex: "var(--z-cursor)" }}>
      <div
        className="flex items-center justify-center rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          border: label ? "none" : "1px solid rgba(255,255,255,.55)",
          background: label ? "linear-gradient(135deg,#ff13bb,#5a55ff)" : hovering ? "rgba(255,255,255,.08)" : "transparent",
          transition: "width .45s var(--ease-expo), height .45s var(--ease-expo), margin .45s var(--ease-expo), background .3s",
          mixBlendMode: label ? "normal" : "difference",
        }}
      >
        {label}
      </div>
    </div>
  );
}
