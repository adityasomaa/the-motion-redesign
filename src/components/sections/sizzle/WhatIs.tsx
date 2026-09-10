import { VideoTile } from "@/components/site/Media";
import { ImageReveal, Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { sizzle } from "@/lib/content";

/** Audit finding 10: "What are sizzle reel?" becomes "What is a sizzle reel?". */
export default function WhatIs() {
  return (
    <section className="section glow-a">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <ImageReveal className="aspect-[3/2] w-full rounded-[1.5rem] border border-white/10">
            <VideoTile src={sizzle.whatVideo} poster={sizzle.whatPoster} className="h-full w-full" />
          </ImageReveal>
          <div aria-hidden="true" className="absolute -right-6 -top-6 hidden h-28 w-28 items-center justify-center md:flex">
            <svg viewBox="0 0 100 100" className="h-full w-full motion-safe:animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="ring" d="M50 50m-38 0a38 38 0 1176 0a38 38 0 11-76 0" />
              </defs>
              <text fill="rgba(255,255,255,.7)" fontSize="9.5" letterSpacing="3.2">
                <textPath href="#ring">SIZZLE · REEL · MEANING · </textPath>
              </text>
            </svg>
            <span className="absolute h-3 w-3 rounded-full bg-pink" />
          </div>
        </div>
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHead
            eyebrow="Sizzle reel meaning"
            title={
              <>
                What is a <span className="text-grad">sizzle reel?</span>
              </>
            }
          />
          <Reveal className="flex flex-col gap-5">
            {sizzle.what.map((p) => (
              <p key={p} data-reveal className="lead">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
