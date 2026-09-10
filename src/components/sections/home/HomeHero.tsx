"use client";

import { Fragment, useRef } from "react";
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

/**
 * Exactly one screen tall on every device (100svh). Type scales with the shorter of width and height;
 * on stacked layouts the mark takes whatever height is left, as a square that fits it.
 */
export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(q("[data-hero=eyebrow]"), { y: 20, opacity: 0, duration: 1 })
        .from(q("[data-hero=word]"), { yPercent: 145, rotate: 7, duration: 1.4, stagger: 0.055 }, 0.05)
        .from(q("[data-hero=swap]"), { y: 40, opacity: 0, duration: 1.3 }, 0.45)
        .from(q("[data-hero=lead]"), { y: 30, opacity: 0, duration: 1.2 }, 0.55)
        .from(q("[data-hero=cta] > *"), { y: 24, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.65)
        .from(q("[data-hero=visual]"), { opacity: 0, rotate: -8, duration: 2 }, 0.15)
        .from(q("[data-hero=proof]"), { y: 24, opacity: 0, duration: 1.1 }, 0.9);
      const off = onRevealed(() => tl.play());

      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("[data-hero=content]"), { yPercent: -10, opacity: 0.2, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-hero=parallax]"), { yPercent: 18, ease: "none", scrollTrigger: scrub });
      return off;
    },
    { scope: root },
  );

  const words = "High-quality video, animation & design that".split(" ");

  return (
    <section ref={root} className="relative flex h-svh min-h-[34rem] flex-col overflow-hidden pt-[calc(var(--bar-h)+var(--header-h))]">
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

      <div className="container-site pointer-events-none relative flex min-h-0 flex-1 flex-col gap-5 py-5 wide:grid wide:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] wide:items-center wide:gap-10 wide:py-6">
        <div data-hero="content" className="flex shrink-0 flex-col gap-4 sm:gap-5 wide:gap-6">
          <p data-hero="eyebrow" className="eyebrow">
            Motion graphics &amp; design agency
          </p>
          <h1 className="display-hero max-w-[15ch]">
            <span className="sr-only">High-quality video, animation and design that stands out</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                // the space sits outside the clipped box: a trailing space inside an inline-block collapses
                <Fragment key={i}>
                  <span className="-mb-[0.24em] -mt-[0.06em] inline-block overflow-hidden pb-[0.24em] pt-[0.06em] align-bottom">
                    <span data-hero="word" className="inline-block">
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
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
          <p data-hero="lead" className="lead-hero max-w-xl">
            {lead}
          </p>
          <div data-hero="cta" className="pointer-events-auto flex flex-wrap items-center gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </div>
        </div>

        <div data-hero="parallax" className="hero-fit relative w-full">
          <div data-hero="visual" className="hero-fit-item pointer-events-auto relative">
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
          </div>
        </div>
      </div>

      <div data-hero="proof" className="relative flex shrink-0 flex-col gap-3 border-t border-white/[0.06] py-4 wide:py-5">
        <p className="container-site text-sm text-white/70">
          <span className="font-semibold text-white">500+</span> motion graphics videos made for clients in 2025
        </p>
        <LogoMarquee logos={heroLogos} />
      </div>
    </section>
  );
}
