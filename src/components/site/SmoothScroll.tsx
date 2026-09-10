"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/runtime";
import { DESKTOP_POINTER_QUERY, prefersReducedMotion } from "@/lib/utils";

/**
 * Lenis on desktop with a mouse only. Tablets and phones keep native touch scrolling.
 * It follows the media query live (resizing a window below 1025px turns it off) and
 * pauses while anything has locked the body (mobile menu, loader, curtain).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY);
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || prefersReducedMotion()) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -96 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      document.documentElement.dataset.smooth = "on";
      if (document.body.classList.contains("is-locked")) lenis.stop();
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      setLenis(null);
      delete document.documentElement.dataset.smooth;
    };

    const sync = () => (mq.matches ? start() : stop());
    sync();
    mq.addEventListener("change", sync);

    const observer = new MutationObserver(() => {
      if (!lenis) return;
      if (document.body.classList.contains("is-locked")) lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", sync);
      observer.disconnect();
      stop();
    };
  }, []);

  return null;
}
