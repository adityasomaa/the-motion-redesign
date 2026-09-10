"use client";

import { useRef } from "react";
import Button from "@/components/site/Button";
import SectionHead from "@/components/site/SectionHead";
import { cta, process } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Cards stack as you scroll: each one pins, and the one underneath sinks back as the next arrives. */
export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step]", listRef.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.9,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: listRef },
  );

  return (
    <section className="section">
      <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start">
          <SectionHead
            eyebrow="Streamlined process"
            title={
              <>
                Powerful systems <span className="text-grad">for effective workflow</span>
              </>
            }
            lead="Full creative control or a completely hands-off approach, your choice. One thing stays the same: every project starts with a sample, so you know we understand your brand before you commit."
            actions={<Button href={cta.sample.href}>{cta.sample.label}</Button>}
          />
        </div>

        <ol ref={listRef} className="flex flex-col gap-6 lg:gap-[18vh]">
          {process.map((p, i) => (
            <li key={p.step} data-step className="lg:sticky" style={{ top: `calc(var(--header-h) + 4rem + ${i * 1.5}rem)` }}>
              <article className="card origin-top overflow-hidden bg-[linear-gradient(160deg,#1a1036,#0f0a22)] will-change-transform">
                <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="flex flex-col gap-5 p-7 sm:p-9">
                    <span className="text-[4.5rem] font-extrabold leading-none tracking-[-0.06em] text-grad">{p.step}</span>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/55">{p.tag}</span>
                    <h3 className="display-3">{p.title}</h3>
                    <p className="leading-relaxed text-white/72">{p.body}</p>
                  </div>
                  <div className="relative min-h-56 bg-void/40">
                    <img src={p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain p-6" />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
