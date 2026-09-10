"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onVisible } from "@/lib/runtime";
import { prefersReducedMotion } from "@/lib/utils";

const fmt = new Intl.NumberFormat("en-US");

/** Counts up from zero when it becomes visible. The final value is in the markup, so no-JS and screen readers get it. */
export default function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const state = { n: 0 };
    el.textContent = `0${suffix}`;
    return onVisible(el, () =>
      gsap.to(state, {
        n: value,
        duration: 2,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = `${fmt.format(Math.round(state.n))}${suffix}`;
        },
      }),
    );
  });
  return (
    <span ref={ref} className={className}>
      {fmt.format(value)}
      {suffix}
    </span>
  );
}
