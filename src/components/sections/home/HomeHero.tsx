"use client";

import { useRef } from "react";
import Button from "@/components/site/Button";
import { LogoMarquee } from "@/components/site/Media";
import { DitheredLogo } from "@/components/ui/dithered-logo";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { cta, heroLogos } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { onRevealed } from "@/lib/runtime";
import { prefersReducedMotion } from "@/lib/utils";

const lead =
  "A specialist team of motion designers, animators and UI designers. Modern, fast-turnaround video and design content, on a simple fixed price or as a full creative team.";

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(q("[data-hero=eyebrow]"), { y: 20, opacity: 0, duration: 1 })
        .from(q("[data-hero=word]"), { yPercent: 125, rotate: 7, duration: 1.4, stagger: 0.055 }, 0.05)
        .from(q("[data-hero=swap]"), { y: 40, opacity: 0, duration: 1.3 }, 0.45)
        .from(q("[data-hero=lead]"), { y: 30, opacity: 0, duration: 1.2 }, 0.55)
        .from(q("[data-hero=cta] > *"), { y: 24, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.65)
        .from(q("[data-hero=visual]"), { scale: 0.7, opacity: 0, rotate: -8, duration: 2 }, 0.15)
        .from(q("[data-hero=proof]"), { y: 24, opacity: 0, duration: 1.1 }, 0.9);
      const off = onRevealed(() => tl.play());

      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("[data-hero=content]"), { yPercent: -10, opacity: 0.2, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-hero=parallax]"), { yPercent: 22, ease: "none", scrollTrigger: scrub });
      return off;
    },
    { scope: root },
  );

  const words = "High-quality video, animation & design that".split(" ");

  return (
    <section ref={root} className="relative flex min-h-svh flex-col overflow-hidden pt-[calc(var(--bar-h)+var(--header-h))]">
      <div aria-hidden="true" className="absolute inset-0 opacity-60">
        <PixelCanvas gap={14} speed={0.03} colors={["#ff13bb", "#e225ff", "#5a55ff"]} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50rem 36rem at 78% 40%, rgba(226,37,255,.2), transparent 65%), radial-gradient(40rem 30rem at 0% 100%, rgba(88,30,227,.3), transparent 70%)",
        }}
      />

      <div className="container-site pointer-events-none relative grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:py-16">
        <div data-hero="content" className="flex flex-col gap-7">
          <p data-hero="eyebrow" className="eyebrow">
            Motion graphics &amp; design agency
          </p>
          <h1 className="display-1 max-w-[15ch]">
            <span className="sr-only">High-quality video, animation and design that stands out</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <span data-hero="word" className="inline-block">
                    {w}
                  </span>
                  {" "}
                </span>
              ))}
              <span data-hero="swap" className="pointer-events-auto inline-block">
                <FlippingWordSwap
                  decorative
                  word1="stands out"
                  word2="moves brands"
                  interval={3200}
                  duration={480}
                  stagger={38}
                  className="text-[#ff4fbd]"
                  toClassName="text-[#9d8cff]"
                />
              </span>
            </span>
          </h1>
          <p data-hero="lead" className="lead max-w-xl">
            {lead}
          </p>
          <div data-hero="cta" className="pointer-events-auto flex flex-wrap items-center gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </div>
        </div>

        <div data-hero="parallax" className="relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[36rem]">
          <div data-hero="visual" className="pointer-events-auto relative aspect-square w-full">
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,10,150,.35), rgba(90,85,255,.18) 55%, transparent 70%)" }}
            />
            <div aria-hidden="true" className="absolute inset-0 rounded-full border border-white/[0.06]" />
            <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-white/[0.08] motion-safe:animate-[spin_40s_linear_infinite]" />
            <DitheredLogo
              imageSrc="/brand/motion-mark.png"
              className="absolute inset-0 h-full w-full text-[#ff3db0]"
              gridSize={170}
              scale={0.62}
              dotScale={1.05}
              invert={false}
              blur={1.2}
              threshold={200}
            />
            <span className="absolute bottom-[6%] left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-void/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/60 backdrop-blur">
              Touch the mark
            </span>
          </div>
        </div>
      </div>

      <div data-hero="proof" className="relative flex flex-col gap-5 border-t border-white/[0.06] py-7">
        <p className="container-site text-sm text-white/70">
          <span className="font-semibold text-white">500+</span> motion graphics videos made for clients in 2025
        </p>
        <LogoMarquee logos={heroLogos} />
      </div>
    </section>
  );
}
