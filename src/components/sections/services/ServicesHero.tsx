"use client";

import Button from "@/components/site/Button";
import Counter from "@/components/site/Counter";
import { ImageReveal, Reveal, SplitHeading } from "@/components/site/Motion";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { cta, stats } from "@/lib/content";

/** Audit finding 09: the H1 now says what the page offers instead of the lone word "Services". */
export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-[calc(var(--bar-h)+var(--header-h)+3rem)] md:pb-24 lg:pt-[calc(var(--bar-h)+var(--header-h)+5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(48rem 34rem at 90% 20%, rgba(226,37,255,.2), transparent 65%), radial-gradient(40rem 30rem at 0% 80%, rgba(88,30,227,.28), transparent 70%)" }}
      />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-7">
          <Reveal intro>
            <p className="eyebrow">Services</p>
          </Reveal>
          <SplitHeading as="h1" intro className="display-1 max-w-[14ch] text-balance">
            Video, animation <span className="text-grad">&amp; design services</span>
          </SplitHeading>
          <Reveal intro delay={0.2}>
            <p className="lead max-w-xl">
              We craft visuals and experiences that grab attention, communicate your message clearly and leave a lasting impact. From explainer videos to brand identity and full website design.
            </p>
          </Reveal>
          <Reveal intro delay={0.3} className="flex flex-wrap gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </Reveal>
          <Reveal intro delay={0.4} as="dl" className="mt-4 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-white/65">{s.label}</dt>
                <dd className="order-1 text-[clamp(1.9rem,1.3rem+2vw,3rem)] font-semibold leading-none tracking-[-0.04em]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative">
          <ImageReveal className="aspect-[689/444] w-full rounded-[1.5rem] border border-white/10 bg-panel">
            <img src="/img/misc/67cee409-services-hero.avif" alt="Video player interface showing a Motion project in production" className="h-full w-full object-cover" />
          </ImageReveal>
          <Reveal intro delay={0.6} className="absolute -bottom-8 left-4 right-4 sm:left-auto sm:right-6 sm:w-[21rem]">
            <div className="rounded-2xl border border-white/10 bg-void/80 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">What we make</p>
              <p className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-tight">
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
