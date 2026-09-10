"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/runtime";
import { DESKTOP_POINTER_QUERY, prefersReducedMotion } from "@/lib/utils";

/**
 * Lenis on desktop with a mouse only. Tablets and phones keep native touch scrolling.
 *
 * Guarding against "stuck" scrolling:
 * - Lenis re-measures on every ScrollTrigger refresh, so its scroll limit always matches the page.
 * - The page height is watched: when images, videos or fonts change it, pins and triggers are
 *   re-measured (debounced, and ignoring the height change a refresh itself causes).
 * - It stops while anything locks the body (menu, loader, curtain) and always restarts after.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY);
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || prefersReducedMotion()) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, anchors: { offset: -96 } });
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

    const lockObserver = new MutationObserver(() => {
      if (!lenis) return;
      if (document.body.classList.contains("is-locked")) lenis.stop();
      else lenis.start();
    });
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Re-measure when the document height changes for reasons other than a refresh.
    ScrollTrigger.config({ ignoreMobileResize: true });
    let lastHeight = document.documentElement.scrollHeight;
    let timer = 0;
    const onRefresh = () => {
      getLenis()?.resize();
      lastHeight = document.documentElement.scrollHeight;
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const heightObserver = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const h = document.documentElement.scrollHeight;
        if (Math.abs(h - lastHeight) > 4) ScrollTrigger.refresh();
      }, 250);
    });
    heightObserver.observe(document.body);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad);

    return () => {
      mq.removeEventListener("change", sync);
      lockObserver.disconnect();
      heightObserver.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      stop();
    };
  }, []);

  return null;
}
