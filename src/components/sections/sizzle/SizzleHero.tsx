"use client";

import Button from "@/components/site/Button";
import LazyMount from "@/components/site/Lazy";
import { Reveal, SplitHeading } from "@/components/site/Motion";
import { AsciiEffect } from "@/components/ui/ascii-effect";
import { cta } from "@/lib/content";

/** One screen tall on every device; the ASCII artwork takes the space left on stacked layouts. */
export default function SizzleHero() {
  return (
    <section className="relative flex h-svh min-h-[34rem] flex-col overflow-hidden pt-[calc(var(--bar-h)+var(--header-h))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50rem 36rem at 80% 30%, rgba(255,19,187,.16), transparent 65%), radial-gradient(44rem 30rem at 0% 90%, rgba(90,85,255,.22), transparent 70%)" }}
      />
      <div className="container-site relative flex min-h-0 flex-1 flex-col gap-5 py-5 wide:grid wide:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] wide:items-center wide:gap-14 wide:py-8">
        <div className="flex shrink-0 flex-col gap-4 sm:gap-5 wide:gap-6">
          <Reveal intro>
            <p className="eyebrow">Sizzle reel services</p>
          </Reveal>
          <SplitHeading as="h1" intro className="display-hero max-w-[13ch] text-balance">
            Sizzle reels that <span className="text-grad">showcase your brand</span>
          </SplitHeading>
          <Reveal intro delay={0.2}>
            <p className="lead-hero max-w-xl">
              We work with brands, marketing managers, startups and marketing agencies to produce memorable and unexpected video ads that get results.
            </p>
          </Reveal>
          <Reveal intro delay={0.3} className="flex flex-wrap gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </Reveal>
        </div>

        <Reveal intro delay={0.15} className="hero-media">
          <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-void shadow-[0_40px_120px_-30px_rgba(226,37,255,.45)]">
            <LazyMount className="absolute inset-0" rootMargin="0px">
              <AsciiEffect
                imageSrc="/img/posters/superodd-boundless-reel.webp"
                alt="ASCII rendering of a frame from the Superodd sizzle reel"
                variant="glitch"
                colors={["#ff5cc0", "#e27bff", "#9d8cff"]}
                backgroundColor="#080610"
                fontSize={7}
                scale={1.08}
                brightnessBoost={3.2}
                contrast={1.35}
                threshold={0.02}
                glitchIntensity={0.45}
                mouseStrength={30}
                className="h-full w-full"
              />
            </LazyMount>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
