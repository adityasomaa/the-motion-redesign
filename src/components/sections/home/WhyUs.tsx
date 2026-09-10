"use client";

import Button from "@/components/site/Button";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { PixelImageTrail } from "@/components/ui/pixel-image-trail";
import { cta, promises, stories } from "@/lib/content";

/** Audit finding 04: the empty half now carries a real client story, revealed by the pointer. */
export default function WhyUs() {
  const story = stories[0]!;
  return (
    <section className="section glow-b">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHead
            eyebrow="Why choose us"
            title={
              <>
                An entire creative team, <span className="text-grad">working like part of yours</span>
              </>
            }
            lead="A team of specialists working together day in, day out to produce exceptional design work. Perfect if you have a tight schedule or a fast-approaching deadline."
          />
          <Reveal as="ol" className="flex flex-col">
            {promises.map((p, i) => (
              <li key={p.title} data-reveal className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 py-6 last:border-b">
                <span className="font-mono text-sm text-white/50 transition-colors group-hover:text-pink">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="leading-relaxed text-white/70">{p.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
            <Button href={cta.call.href} variant="secondary">
              {cta.call.label}
            </Button>
          </Reveal>
        </div>

        <Reveal>
          <figure className="relative m-0 h-[26rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel sm:h-[36rem]">
            <img src={story.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.16] saturate-50" />
            <PixelImageTrail
              src={story.image}
              alt={`${story.title} customer story cover`}
              pixelSize={46}
              maxPixels={140}
              initialPixels={34}
              fadeDuration={1400}
              className="absolute inset-0 flex h-full flex-col justify-end"
            >
              <figcaption className="m-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-void/75 p-6 backdrop-blur-md sm:m-6">
                <span className="w-fit rounded-full bg-violet px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em]">Customer story</span>
                <span className="text-2xl font-semibold tracking-tight">{story.title}</span>
                <span className="leading-relaxed text-white/75">{story.body}</span>
                <span className="flex flex-wrap gap-2">
                  {story.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </span>
              </figcaption>
            </PixelImageTrail>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/10 bg-void/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/60 backdrop-blur">
              Move to reveal
            </span>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
