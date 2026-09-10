"use client";

import { useRef, useState } from "react";
import SectionHead from "@/components/site/SectionHead";
import { WheelCarousel } from "@/components/ui/wheel-carousel";
import { sizzle } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * On desktop the page scroll turns the wheel (pinned), so the mouse wheel is never trapped.
 * On touch screens it's drag, arrow buttons or keyboard.
 */
export default function Types() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = sizzle.types.length;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${n * 55}%`,
            pin: true,
            scrub: true,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-20 lg:flex lg:h-svh lg:items-center lg:py-0">
      <div className="container-site grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:pt-[var(--header-h)]">
        <div className="flex flex-col gap-8">
          <SectionHead
            eyebrow="Sizzle reel examples"
            title={
              <>
                Different types <span className="text-grad">of sizzle reel</span>
              </>
            }
            lead="Diverse formats, each tailored to showcase a different side of your business and engage your audience."
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous type"
              onClick={() => setActive((a) => (a - 1 + n) % n)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/60"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next type"
              onClick={() => setActive((a) => (a + 1) % n)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/60"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <span className="ml-3 font-mono text-sm tabular-nums text-white/60">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="h-[24rem] overflow-hidden rounded-[1.75rem] border border-white/10 sm:h-[30rem] lg:h-[34rem]">
          <WheelCarousel
            items={sizzle.types}
            mode="custom"
            background="#0d0a1c"
            panelColor="#130a29"
            textColor="rgba(255,255,255,0.32)"
            selectedColor="#ffffff"
            markerColor="#ff0a96"
            photoSide="left"
            photoWidth={46}
            photoAspect="4/3"
            photoRadius={18}
            contentWidth={1200}
            gap={8}
            radius={340}
            spacing={15}
            visibleItems={5}
            apexInset={22}
            scrollSpeed={0}
            activeIndex={active}
            onActiveChange={(_, i) => setActive(i)}
            itemClassName="text-[clamp(1rem,0.8rem+1.2vw,2rem)] font-semibold"
            className="h-full min-h-0"
          />
        </div>
      </div>
    </section>
  );
}
