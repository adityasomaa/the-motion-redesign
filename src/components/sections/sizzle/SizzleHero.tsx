"use client";

import Button from "@/components/site/Button";
import LazyMount from "@/components/site/Lazy";
import { Reveal, SplitHeading } from "@/components/site/Motion";
import { AsciiEffect } from "@/components/ui/ascii-effect";
import { cta, sizzle } from "@/lib/content";

export default function SizzleHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-[calc(var(--bar-h)+var(--header-h)+3rem)] md:pb-24 lg:pt-[calc(var(--bar-h)+var(--header-h)+4.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50rem 36rem at 80% 30%, rgba(255,19,187,.16), transparent 65%), radial-gradient(44rem 30rem at 0% 90%, rgba(90,85,255,.22), transparent 70%)" }}
      />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col gap-7">
          <Reveal intro>
            <p className="eyebrow">Sizzle reel services</p>
          </Reveal>
          <SplitHeading as="h1" intro className="display-1 max-w-[13ch] text-balance">
            Sizzle reels that <span className="text-grad">showcase your brand</span>
          </SplitHeading>
          <Reveal intro delay={0.2}>
            <p className="lead max-w-xl">
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

        <Reveal intro delay={0.15}>
          <div className="relative aspect-[689/444] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-void shadow-[0_40px_120px_-30px_rgba(226,37,255,.45)]">
            <LazyMount className="absolute inset-0" rootMargin="0px">
              <AsciiEffect
                imageSrc={sizzle.heroImage}
                alt="ASCII rendering of the sizzle reel artwork"
                variant="glitch"
                colors={["#ff13bb", "#e225ff", "#5a55ff"]}
                backgroundColor="#080610"
                fontSize={8}
                scale={1.05}
                className="h-full w-full"
              />
            </LazyMount>
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/10 bg-void/70 p-2 pr-4 backdrop-blur">
              <img src={sizzle.heroImage} alt="" className="h-10 w-16 rounded-md object-cover" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/65">Move to distort</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
