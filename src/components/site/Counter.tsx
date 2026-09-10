"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Counts up from zero when scrolled into view. The final value is in the markup, so no-JS and screen readers get it. */
export default function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const state = { n: 0 };
    el.textContent = `0${suffix}`;
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(state, {
          n: value,
          duration: 2,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = `${Math.round(state.n)}${suffix}`;
          },
        }),
    });
  });
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
