"use client";

import { useRef } from "react";
import SectionHead from "@/components/site/SectionHead";
import { sizzle } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Desktop: the section pins and the cards travel sideways with the scroll, with a progress rail.
 * Tablet and phone: a native horizontal swipe list, no pinning.
 */
export default function Benefits() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-benefit]", el).forEach((card) => {
          gsap.from(card.querySelector("[data-benefit-num]"), {
            yPercent: 60,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-site flex flex-col gap-10 lg:pt-[var(--header-h)]">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Amplify your story"
            title={
              <>
                Why your business <span className="text-grad">needs a sizzle reel</span>
              </>
            }
            lead="Discover how a powerful sizzle reel can transform your marketing strategy and drive business growth."
          />
          <div className="hidden w-64 shrink-0 flex-col gap-2 lg:flex" aria-hidden="true">
            <div className="flex justify-between font-mono text-xs text-white/55">
              <span>01</span>
              <span>{String(sizzle.benefits.length).padStart(2, "0")}</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <div ref={bar} className="h-full origin-left scale-x-0 bg-[image:var(--grad)]" />
            </div>
          </div>
        </div>
      </div>
      <ul
        ref={track}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {sizzle.benefits.map((b, i) => (
          <li
            key={b.title}
            data-benefit
            className="card flex w-[80vw] max-w-[26rem] shrink-0 snap-start flex-col justify-between gap-10 overflow-hidden p-7 sm:w-[24rem] lg:h-[24rem]"
          >
            <span data-benefit-num className="text-[5rem] font-extrabold leading-[1.32] tracking-[-0.06em] text-grad">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">{b.title}</h3>
              <p className="leading-relaxed text-white/70">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
