"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import { announcement, cta, nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const BarIcon = ({ i }: { i: number }) => {
  const paths = [
    "M4 8.5l2.5 2.5L12 5.5M8 1.5l5 2v4c0 3-2.2 5.4-5 6-2.8-.6-5-3-5-6v-4l5-2z",
    "M9 1.5L3.5 9H8l-1 5.5L12.5 7H8l1-5.5z",
    "M8 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM1.5 8h13M8 1.5c1.8 1.8 2.7 4 2.7 6.5S9.8 12.7 8 14.5C6.2 12.7 5.3 10.5 5.3 8S6.2 3.3 8 1.5z",
  ];
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={paths[i]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const megaId = useId();
  const menuId = useId();

  // Close both menus when the route changes (adjusting state during render, not in an effect)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMegaOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > lastY + 4 && y > 520) setHidden(true);
        else if (y < lastY - 4 || y < 520) setHidden(false);
        lastY = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", menuOpen);
    if (menuOpen) {
      document.body.classList.add("is-locked");
      closeRef.current?.focus({ preventScroll: true });
    } else {
      document.body.classList.remove("is-locked");
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      setMenuOpen((open) => {
        if (open) burgerRef.current?.focus();
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const onServices = pathname.startsWith("/services");
  const offset = hidden && !megaOpen ? "translate3d(0,-100%,0)" : scrolled ? "translate3d(0,calc(-1 * var(--bar-h)),0)" : "translate3d(0,0,0)";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0"
        style={{ zIndex: "var(--z-header)", transform: offset, transition: "transform .7s var(--ease-expo)" }}
      >
        {/* Announcement bar, as on the live site */}
        <div className="relative flex h-[var(--bar-h)] items-center overflow-hidden bg-[linear-gradient(90deg,#581ee3,#7446f0_55%,#6a5cff)] text-[0.78rem] font-medium text-white">
          <div className="container-site hidden items-center justify-between lg:flex">
            <ul className="flex items-center gap-7">
              {announcement.map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  <BarIcon i={i} />
                  {item}
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:underline">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3.5h12v9H2zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {site.email}
            </a>
          </div>
          <div className="marquee flex w-full lg:hidden" aria-label={announcement.join(", ")}>
            <div className="marquee-track flex shrink-0 gap-10 pr-10 [--marquee-duration:22s]" aria-hidden="true">
              {[...announcement, site.email, ...announcement, site.email].map((item, i) => (
                <span key={i} className="whitespace-nowrap">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 border-b border-white/[0.06] bg-void/70 backdrop-blur-xl transition-opacity duration-500"
            style={{ opacity: scrolled || megaOpen ? 1 : 0 }}
          />
          <nav aria-label="Main" className="container-site relative flex h-[var(--header-h)] items-center justify-between gap-6">
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              <li>
                <Link
                  href={nav.home.href}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="group relative inline-flex h-10 items-center px-4 text-[0.95rem] text-white/85 transition-colors hover:text-white"
                >
                  {nav.home.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-px origin-left bg-[image:var(--grad)] transition-transform duration-500 ease-[var(--ease-expo)]",
                      pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
              <li onMouseEnter={openMega} onMouseLeave={scheduleClose} className="relative">
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls={megaId}
                  onClick={() => setMegaOpen((o) => !o)}
                  className={cn(
                    "group relative inline-flex h-10 items-center gap-1.5 px-4 text-[0.95rem] transition-colors hover:text-white",
                    onServices ? "text-white" : "text-white/85",
                  )}
                >
                  {nav.services.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={cn("transition-transform duration-500", megaOpen && "rotate-180")}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-px origin-left bg-[image:var(--grad)] transition-transform duration-500 ease-[var(--ease-expo)]",
                      onServices ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </button>
              </li>
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Button href={cta.call.href} variant="secondary" size="sm">
                {cta.call.label}
              </Button>
              <Button href={cta.sample.href} size="sm">
                {cta.sample.label}
              </Button>
            </div>

            <button
              ref={burgerRef}
              type="button"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-white" />
                <span className="h-[1.5px] w-2/3 self-end bg-[image:var(--grad)]" />
              </span>
            </button>
          </nav>

          {/* Mega menu: the live site's two-pane dropdown, holding only the audited pages */}
          <div
            id={megaId}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden lg:block"
            style={{ visibility: megaOpen ? "visible" : "hidden", pointerEvents: megaOpen ? "auto" : "none" }}
          >
            <div className="container-site">
              <div
                className="grid grid-cols-[17rem_1fr] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#130a29,#1b0f3d)] shadow-[0_40px_120px_-20px_rgba(0,0,0,.7)]"
                style={{
                  opacity: megaOpen ? 1 : 0,
                  transform: megaOpen ? "translate3d(0,0,0)" : "translate3d(0,-12px,0)",
                  clipPath: megaOpen ? "inset(0 0 0 0 round 1.5rem)" : "inset(0 0 100% 0 round 1.5rem)",
                  transition: "opacity .4s var(--ease-expo), transform .6s var(--ease-expo), clip-path .7s var(--ease-expo)",
                }}
              >
                <div className="flex flex-col justify-between border-r border-white/10 bg-white/[0.02] p-6">
                  <div>
                    <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/60">Our services</p>
                    <ul className="flex flex-col gap-1">
                      {nav.services.items.map((item, i) => (
                        <li key={item.href + item.label}>
                          <Link
                            href={item.href}
                            onMouseEnter={() => setPreview(i)}
                            onFocus={() => setPreview(i)}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] transition-colors",
                              preview === i ? "bg-violet text-white" : "text-white/80 hover:bg-white/5",
                            )}
                          >
                            {item.label}
                            <span aria-hidden="true" className={cn("transition-transform", preview === i ? "translate-x-0" : "-translate-x-1 opacity-0")}>
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/services" className="mt-10 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                    See all services <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-5 p-6">
                  {nav.services.items.map((item, i) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      tabIndex={-1}
                      onMouseEnter={() => setPreview(i)}
                      className={cn(
                        "group flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-[border-color,transform] duration-500",
                        preview === i ? "border-white/25" : "border-white/5",
                      )}
                    >
                      <span className="relative block aspect-[16/8] overflow-hidden">
                        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105" />
                      </span>
                      <span className="flex flex-col gap-1.5 p-5">
                        <span className="text-base font-semibold">{item.label}</span>
                        <span className="text-sm leading-relaxed text-white/65">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-[image:var(--grad)]" />
          </div>
        </div>
      </header>

      {/* Mobile menu. A sibling of <header>, never a child: the header's blur layer would otherwise
          become the containing block for this fixed element. */}
      <div
        id={menuId}
        data-lenis-prevent
        className="fixed inset-0 flex flex-col overflow-y-auto bg-void lg:hidden"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        style={{
          zIndex: "var(--z-menu)",
          clipPath: menuOpen ? "circle(150% at calc(100% - 2.6rem) 4.75rem)" : "circle(0% at calc(100% - 2.6rem) 4.75rem)",
          visibility: menuOpen ? "visible" : "hidden",
          transition: menuOpen ? "clip-path .9s var(--ease-quart)" : "clip-path .6s var(--ease-quart), visibility 0s .6s",
          backgroundImage: "radial-gradient(80vw 50vh at 100% 0%, rgba(226,37,255,.18), transparent 70%), radial-gradient(90vw 60vh at 0% 100%, rgba(88,30,227,.3), transparent 70%)",
        }}
      >
        <div className="container-site flex h-[calc(var(--header-h)+var(--bar-h))] shrink-0 items-end pb-3">
          <div className="flex h-[var(--header-h)] w-full items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setMenuOpen(false);
                burgerRef.current?.focus();
              }}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-pink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-between gap-10 pb-8 pt-6">
          <ul className="flex flex-col">
            {[
              { label: "Home", href: "/", sub: undefined },
              { label: "Services", href: "/services", sub: nav.services.items },
            ].map((item, i) => (
              <li
                key={item.label}
                className="border-b border-white/10 py-4"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translate3d(0,0,0)" : "translate3d(0,2rem,0)",
                  transition: `opacity .6s var(--ease-expo) ${0.25 + i * 0.08}s, transform .8s var(--ease-expo) ${0.25 + i * 0.08}s`,
                }}
              >
                <Link href={item.href} className="display-2 block" aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
                {item.sub ? (
                  <ul className="mt-4 flex flex-col gap-3 pl-1">
                    {item.sub.map((s) => (
                      <li key={s.label}>
                        <Link href={s.href} className="flex items-center gap-3 text-lg text-white/75">
                          <span aria-hidden="true" className="h-px w-5 bg-[image:var(--grad)]" />
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div
            className="flex flex-col gap-6"
            style={{ opacity: menuOpen ? 1 : 0, transition: `opacity .6s var(--ease-expo) ${menuOpen ? 0.45 : 0}s` }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button href={cta.call.href} variant="secondary">
                {cta.call.label}
              </Button>
              <Button href={cta.sample.href}>{cta.sample.label}</Button>
            </div>
            <a href={`mailto:${site.email}`} className="text-sm text-white/65">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
