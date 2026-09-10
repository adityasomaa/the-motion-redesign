"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { markCovered, markRevealed, scrollToTop } from "@/lib/runtime";
import { nextPaint, prefersReducedMotion, wait } from "@/lib/wait";

const COVER_MS = 750;
const REVEAL_MS = 900;
const LOADER_MIN_MS = 1200;
const LOADER_MAX_MS = 3200;
const NAV_TIMEOUT_MS = 6000;

type Curtain = "idle" | "cover" | "reveal";
type LoaderState = "run" | "exit" | "gone";

const ease = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Order on every route change: cover -> route commits -> scroll to top -> reveal.
 * First visit gets the loader instead of the curtain. Sequencing uses wait(), which races
 * a timer against rAF, so a backgrounded tab can never leave the page covered.
 */
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [curtain, setCurtain] = useState<Curtain>("idle");
  const [loader, setLoader] = useState<LoaderState>("run");
  const [progress, setProgress] = useState(0);
  const busy = useRef(false);
  const navResolve = useRef<(() => void) | null>(null);

  useEffect(() => {
    navResolve.current?.();
    navResolve.current = null;
  }, [pathname]);

  /* ---------- first load ---------- */
  useEffect(() => {
    let cancelled = false;
    const reduced = prefersReducedMotion();
    document.body.classList.add("is-locked");
    const started = performance.now();

    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const ready = Promise.all([loaded, document.fonts?.ready ?? Promise.resolve()]);

    let raf = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - started) / LOADER_MIN_MS);
      setProgress((p) => Math.max(p, Math.round((1 - Math.pow(1 - t, 3)) * 92)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    if (!reduced) raf = requestAnimationFrame(step);

    (async () => {
      await Promise.race([Promise.all([ready, wait(reduced ? 0 : LOADER_MIN_MS)]), wait(LOADER_MAX_MS)]);
      if (cancelled) return;
      setProgress(100);
      await wait(reduced ? 0 : 260);
      if (cancelled) return;
      scrollToTop();
      setLoader("exit");
      document.body.classList.remove("is-locked");
      markRevealed();
      await wait(reduced ? 0 : REVEAL_MS + 100);
      if (cancelled) return;
      setLoader("gone");
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- route changes ---------- */
  const navigate = useCallback(
    async (href: string) => {
      if (busy.current) return;
      busy.current = true;
      const reduced = prefersReducedMotion();

      markCovered();
      document.body.classList.add("is-locked");
      setCurtain("cover");
      await wait(reduced ? 0 : COVER_MS);

      const committed = new Promise<void>((res) => {
        navResolve.current = res;
      });
      router.push(href, { scroll: false });
      await Promise.race([committed, wait(NAV_TIMEOUT_MS)]);
      navResolve.current = null;
      await nextPaint();

      scrollToTop();
      ScrollTrigger.refresh();
      await nextPaint();

      document.body.classList.remove("is-locked");
      setCurtain("reveal");
      markRevealed();
      await wait(reduced ? 0 : REVEAL_MS);
      setCurtain("idle");
      busy.current = false;
    },
    [router],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !href.startsWith("/") || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) {
        if (url.hash) return;
        e.preventDefault();
        return;
      }
      e.preventDefault();
      void navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  useEffect(() => {
    const onPop = () => {
      busy.current = false;
      setCurtain("idle");
      document.body.classList.remove("is-locked");
      markRevealed();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const panelTransform = curtain === "cover" ? "translate3d(0,0,0)" : curtain === "reveal" ? "translate3d(0,-100%,0)" : "translate3d(0,100%,0)";
  const panelRadius =
    curtain === "cover" ? "0 0 0 0 / 0 0 0 0" : curtain === "reveal" ? "0 0 50% 50% / 0 0 14vh 14vh" : "50% 50% 0 0 / 14vh 14vh 0 0";

  return (
    <>
      {children}

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: "var(--z-curtain)" }}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-void"
          style={{
            transform: panelTransform,
            borderRadius: panelRadius,
            transition: curtain === "idle" ? "none" : `transform ${curtain === "cover" ? COVER_MS : REVEAL_MS}ms ${ease}, border-radius ${curtain === "cover" ? COVER_MS : REVEAL_MS}ms ${ease}`,
            backgroundImage:
              "radial-gradient(60vw 50vh at 50% 110%, rgba(88,30,227,.35), transparent 70%), radial-gradient(40vw 30vh at 50% -10%, rgba(255,19,187,.18), transparent 70%)",
          }}
        >
          <img src="/brand/motion-mark.png" alt="" width={368} height={241} className="h-auto w-20 sm:w-24" />
          <span className="text-[0.7rem] uppercase tracking-[0.45em] text-white/60">motion the agency</span>
        </div>
      </div>

      {loader !== "gone" && (
        <div
          role="status"
          aria-live="polite"
          aria-label={loader === "run" ? "Loading" : "Loaded"}
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-void"
          style={{
            zIndex: "var(--z-loader)",
            transform: loader === "exit" ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)",
            borderRadius: loader === "exit" ? "0 0 50% 50% / 0 0 14vh 14vh" : "0 0 0 0 / 0 0 0 0",
            transition: `transform ${REVEAL_MS}ms ${ease}, border-radius ${REVEAL_MS}ms ${ease}`,
            backgroundImage: "radial-gradient(70vw 60vh at 50% 120%, rgba(88,30,227,.4), transparent 70%)",
          }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative">
              <img src="/brand/motion-mark.png" alt="" width={368} height={241} className="relative z-10 h-auto w-28 sm:w-32" />
              <div
                className="absolute inset-0 -z-0 blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(255,10,150,.55), transparent 65%)", opacity: progress / 140 }}
              />
            </div>
            <div className="flex w-56 flex-col items-center gap-3">
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div className="h-full origin-left bg-[image:var(--grad)]" style={{ transform: `scaleX(${progress / 100})`, transition: "transform 200ms linear" }} />
              </div>
              <div className="flex w-full justify-between text-[0.7rem] uppercase tracking-[0.35em] text-white/60">
                <span>motion the agency</span>
                <span className="tabular-nums text-white">{String(progress).padStart(3, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
