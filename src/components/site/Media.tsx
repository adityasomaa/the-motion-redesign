"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

/**
 * Poster first, video only when it's near the viewport. Plays while visible, pauses when not,
 * never loads on reduced motion or data saver. The poster is the real content; the video is decoration.
 */
export function VideoTile({ src, poster, className, children }: { src?: string; poster: string; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || prefersReducedMotion()) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!v.getAttribute("src")) v.setAttribute("src", src);
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "150px 0px", threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-panel", className)}>
      <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {src ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", playing ? "opacity-100" : "opacity-0")}
        />
      ) : null}
      {children}
    </div>
  );
}

/** YouTube facade: a thumbnail and a play button, the iframe only loads after a click. */
export function YouTubeFacade({ id, title, className }: { id: string; title: string; className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-panel", className)}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} data-cursor="Play" aria-label={`Play video: ${title}`} className="group absolute inset-0 h-full w-full">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full scale-[1.02] object-cover opacity-80 transition duration-700 ease-[var(--ease-expo)] group-hover:scale-110 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--grad-btn)] shadow-lg transition-transform duration-500 group-hover:scale-110">
            <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
              <path d="M13 8L1 15V1z" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export function LogoMarquee({ logos, className, duration = 36 }: { logos: { src: string; alt: string }[]; className?: string; duration?: number }) {
  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20" aria-hidden={copy > 0 ? true : undefined}>
      {logos.map((l) => (
        <li key={l.src + copy} className="shrink-0">
          <img
            src={l.src}
            alt={copy === 0 ? l.alt : ""}
            loading="lazy"
            className="h-7 w-auto max-w-[9.5rem] object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 sm:h-9"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee mask-fade-x flex overflow-hidden", className)}>
      <div className="marquee-track flex" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}

/** Scales a fixed-size child (like the circuit board) to the available width. */
export function ScaledBox({ width, height, children, className, maxScale = 1.25 }: { width: number; height: number; children: ReactNode; className?: string; maxScale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(maxScale, (entry?.contentRect.width ?? width) / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, maxScale]);
  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height: height * scale }}>
      <div className="absolute left-1/2 top-0" style={{ width, height, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}>
        {children}
      </div>
    </div>
  );
}
