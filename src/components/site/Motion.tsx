"use client";

import React, { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { onRevealed } from "@/lib/runtime";
import { cn, prefersReducedMotion } from "@/lib/utils";

/**
 * Heading that rises word by word from a mask when it scrolls into view.
 * `intro` headings wait for the loader or curtain to open instead of a scroll trigger.
 * Gradient spans stay one continuous gradient: each word gets the parent's gradient, offset to its position.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  intro = false,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  intro?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let split: SplitText | null = null;
      let off = () => {};
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = SplitText.create(el, { type: "words", mask: "words", wordsClass: "split-word" });

        el.querySelectorAll<HTMLElement>(".text-grad").forEach((g) => {
          const width = g.offsetWidth;
          const left = g.getBoundingClientRect().left;
          g.classList.remove("text-grad");
          g.querySelectorAll<HTMLElement>(".split-word").forEach((w) => {
            w.classList.add("text-grad");
            w.style.backgroundSize = `${width}px 100%`;
            w.style.backgroundPosition = `${left - w.getBoundingClientRect().left}px 0`;
          });
        });

        const tween = gsap.from(split.words, {
          yPercent: 118,
          rotate: 5,
          duration: 1.25,
          stagger: 0.045,
          delay,
          ease: "expo.out",
          paused: true,
        });
        if (intro) off = onRevealed(() => tween.play());
        else ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => tween.play() });
      });

      return () => {
        cancelled = true;
        off();
        split?.revert();
      };
    },
    { scope: ref },
  );

  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

/** Children marked data-reveal fade and rise in sequence when the group enters the viewport. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 44,
  stagger = 0.09,
  intro = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  stagger?: number;
  intro?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const items = el.querySelectorAll("[data-reveal]");
      const targets = items.length ? items : [el];
      const tween = gsap.from(targets, { y, opacity: 0, duration: 1.2, stagger, delay, ease: "expo.out", paused: true });
      if (intro) return onRevealed(() => tween.play());
      ScrollTrigger.create({ trigger: el, start: "top 86%", once: true, onEnter: () => tween.play() });
    },
    { scope: ref },
  );
  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

/** Media that is uncovered by a clip-path wipe while the image inside settles from a zoom. */
export function ImageReveal({ children, className, from = "bottom" }: { children: ReactNode; className?: string; from?: "bottom" | "left" }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const inner = el.firstElementChild;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.from(el, { clipPath: from === "bottom" ? "inset(100% 0% 0% 0% round 1.25rem)" : "inset(0% 100% 0% 0% round 1.25rem)", duration: 1.4, ease: "expo.inOut" });
      if (inner) tl.from(inner, { scale: 1.35, duration: 1.8, ease: "expo.out" }, 0.1);
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("overflow-hidden [clip-path:inset(0%_0%_0%_0%_round_1.25rem)]", className)}>
      {children}
    </div>
  );
}

/** Moves its child against the scroll. Desktop and tablet only; phones stay still. */
export function Parallax({ children, className, speed = 12 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(el, { yPercent: -speed }, { yPercent: speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
