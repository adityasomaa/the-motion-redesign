"use client";

import Link from "next/link";
import { HoverTransition, type HoverTransitionEffect } from "@/components/ui/hover-transition";
import { VideoTile } from "./Media";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Poster and looping clip at rest; the description wipes in on hover or keyboard focus. */
export default function ServiceCard({ service, index, effect = "strips", className }: { service: Service; index: number; effect?: HoverTransitionEffect; className?: string }) {
  const directions = ["right", "bottom", "left", "top"] as const;
  return (
    <HoverTransition
      label={service.title}
      effect={effect}
      direction={directions[index % directions.length]}
      duration={0.8}
      className={cn("aspect-[4/5] w-full rounded-[1.25rem] border border-white/10 sm:aspect-[5/6]", className)}
      defaultComponent={
        <VideoTile src={service.video} poster={service.poster} className="h-full w-full">
          <span className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-xs text-white/70">{String(index + 1).padStart(2, "0")}</span>
          <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <h3 className="text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-semibold leading-tight tracking-tight">{service.title}</h3>
            <span className="rounded-full border border-white/20 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/70">{service.group}</span>
          </span>
        </VideoTile>
      }
      hoverComponent={
        <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(150deg,#ff0a96_0%,#8a1fd6_55%,#4b3bf0_100%)] p-6">
          <span className="font-mono text-xs text-white/80">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex flex-col gap-4">
            <p className="text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-semibold leading-tight tracking-tight">{service.title}</p>
            <p className="text-[0.95rem] leading-relaxed text-white/90">{service.body}</p>
            {service.href ? (
              <Link href={service.href} className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-void">
                Explore sizzle reels
              </Link>
            ) : null}
          </div>
        </div>
      }
    />
  );
}
