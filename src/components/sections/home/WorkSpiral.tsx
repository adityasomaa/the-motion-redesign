"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/site/Lazy";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { site, work } from "@/lib/content";

const Spiral3DSlider = dynamic(() => import("@/components/ui/spiral-3d-slider").then((m) => m.Spiral3DSlider), { ssr: false });

export default function WorkSpiral() {
  return (
    <section id="work" className="section overflow-hidden">
      <div className="container-site flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <SectionHead
          eyebrow="Our latest work"
          title={
            <>
              Video examples <span className="text-grad">that show our capabilities</span>
            </>
          }
          lead="A selection of recent videos made for clients like HackerRank, Apollo.io, Attio and Venly."
        />
        <Reveal>
          <a href={site.showreel} target="_blank" rel="noopener noreferrer" data-cursor="Play" className="group flex items-center gap-4">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--grad-btn)] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-pink/40 motion-safe:animate-ping" />
              <svg width="16" height="18" viewBox="0 0 14 16" aria-hidden="true" className="relative ml-1">
                <path d="M13 8L1 15V1z" fill="#fff" />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="text-lg font-semibold">Play showreel</span>
              <span className="text-sm text-white/60">Opens on YouTube</span>
            </span>
          </a>
        </Reveal>
      </div>

      <LazyMount
        className="relative mt-10 h-[70svh] min-h-[30rem] w-full md:h-[86svh] md:min-h-[40rem]"
        placeholder={<div className="h-full w-full" />}
      >
        <Spiral3DSlider
          items={work}
          ariaLabel="Recent video work"
          className="h-full min-h-0 bg-transparent dark:bg-transparent"
          radius={300}
          verticalGap={78}
          cardWidth={340}
          cardAspectRatio={16 / 9}
          autoSpeed={0.12}
          blurStrength={1.4}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </LazyMount>
    </section>
  );
}
