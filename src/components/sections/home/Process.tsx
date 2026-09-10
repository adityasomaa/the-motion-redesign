"use client";

import { Fragment, useRef } from "react";
import Button from "@/components/site/Button";
import SectionHead from "@/components/site/SectionHead";
import { cta, process } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Cards stack as you scroll: each one sticks, and the one underneath eases back as the next slides over.
 * The scrub is driven by zero-height markers that stay in normal flow. Using the sticky cards themselves
 * as triggers made the positions drift, which is what caused the sudden dark flash.
 */
export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step]", listRef.current);
        const markers = gsap.utils.toArray<HTMLElement>("[data-marker]", listRef.current);
        markers.forEach((marker, i) => {
          const card = cards[i];
          if (!card) return;
          gsap
            .timeline({ scrollTrigger: { trigger: marker, start: "top 90%", end: "top 30%", scrub: 0.6, invalidateOnRefresh: true } })
            .to(card.querySelector("article"), { scale: 0.95, ease: "none" }, 0)
            .to(card.querySelector("[data-shade]"), { opacity: 0.4, ease: "none" }, 0);
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

        <div ref={listRef} role="list" className="flex flex-col">
          {process.map((p, i) => (
            <Fragment key={p.step}>
              {i > 0 ? <div data-marker aria-hidden="true" className="h-0" /> : null}
              <div
                role="listitem"
                data-step
                className="mb-6 last:mb-0 lg:sticky lg:mb-[16vh]"
                style={{ top: `calc(var(--header-h) + 4rem + ${i * 1.25}rem)` }}
              >
                <article className="card relative origin-top overflow-hidden bg-[linear-gradient(160deg,#1a1036,#0f0a22)] will-change-transform">
                  <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
                  <div data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-void opacity-0" />
                </article>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
