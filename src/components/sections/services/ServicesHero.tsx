"use client";

import Button from "@/components/site/Button";
import Counter from "@/components/site/Counter";
import { ImageReveal, Reveal, SplitHeading } from "@/components/site/Motion";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { cta, stats } from "@/lib/content";

/** Audit finding 09: the H1 says what the page offers. One screen tall on every device. */
export default function ServicesHero() {
  return (
    <section className="relative flex h-svh min-h-[34rem] flex-col overflow-hidden pt-[calc(var(--bar-h)+var(--header-h))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(48rem 34rem at 90% 20%, rgba(226,37,255,.2), transparent 65%), radial-gradient(40rem 30rem at 0% 80%, rgba(88,30,227,.28), transparent 70%)" }}
      />
      <div className="container-site relative flex min-h-0 flex-1 flex-col gap-5 py-5 wide:grid wide:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] wide:items-center wide:gap-14 wide:py-8">
        <div className="flex shrink-0 flex-col gap-4 sm:gap-5 wide:gap-6">
          <Reveal intro>
            <p className="eyebrow">Services</p>
          </Reveal>
          <SplitHeading as="h1" intro className="display-hero max-w-[14ch] text-balance">
            Video, animation <span className="text-grad">&amp; design services</span>
          </SplitHeading>
          <Reveal intro delay={0.2}>
            <p className="lead-hero max-w-xl">
              We craft visuals and experiences that grab attention, communicate your message clearly and leave a lasting impact. From explainer videos to brand identity and full website design.
            </p>
          </Reveal>
          <Reveal intro delay={0.3} className="flex flex-wrap gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </Reveal>
          <Reveal intro delay={0.4} as="dl" className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-4 wide:mt-2 wide:pt-6">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="flex flex-col gap-1">
                <dt className="order-2 text-xs text-white/65 sm:text-sm">{s.label}</dt>
                <dd className="order-1 text-[clamp(1.5rem,min(3.2vw,4.6svh),3rem)] font-semibold leading-none tracking-[-0.04em]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="hero-media">
          <ImageReveal className="absolute inset-0 rounded-[1.5rem] border border-white/10 bg-panel">
            <img src="/img/misc/67cee409-services-hero.avif" alt="Video player interface showing a Motion project in production" className="h-full w-full object-cover" />
          </ImageReveal>
          <Reveal intro delay={0.6} className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-auto sm:right-5 sm:w-[21rem]">
            <div className="rounded-2xl border border-white/10 bg-void/80 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] backdrop-blur-md sm:p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/55 sm:text-xs">What we make</p>
              <p className="mt-1.5 text-[1.1rem] font-semibold leading-tight tracking-tight sm:text-[1.35rem]">
                Content that earns{" "}
                <FlippingWordSwap decorative word1="attention" word2="real action" interval={2600} className="text-[#ff4fbd]" toClassName="text-[#9d8cff]" />
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
