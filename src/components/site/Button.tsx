"use client";

import Link from "next/link";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn, DESKTOP_POINTER_QUERY } from "@/lib/utils";

type Props = {
  children: string;
  href: string;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  icon?: ReactNode;
  className?: string;
  external?: boolean;
};

/**
 * Two variants only, matching the two actions (primary = Get free sample, secondary = Book a call).
 * Width is always the label plus padding. Hover: letters roll up one by one, and on desktop the
 * button leans toward the cursor.
 */
export default function Button({ children, href, variant = "primary", size = "md", icon, className, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !window.matchMedia(DESKTOP_POINTER_QUERY).matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const classes = cn(
    "group relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap",
    "transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-expo)] will-change-transform",
    size === "md" ? "h-12 px-6 text-[0.95rem]" : "h-10 px-5 text-sm",
    variant === "primary"
      ? "bg-[image:var(--grad-btn)] text-white shadow-[0_12px_40px_-12px_rgba(255,10,150,0.7)] hover:shadow-[0_18px_50px_-10px_rgba(255,10,150,0.85)]"
      : "border border-white/25 bg-white/[0.03] text-white hover:border-white/60 hover:bg-white/[0.07]",
    className,
  );

  const letters = Array.from(children);
  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-y-full rounded-full bg-[linear-gradient(100deg,#ff13bb,#a31bd6)] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0"
        />
      )}
      <span aria-hidden="true" className="relative inline-flex overflow-hidden leading-[1.25]">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="relative inline-block transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            {ch === " " ? " " : ch}
            <span className="absolute left-0 top-full">{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </span>
      {icon ? (
        <span aria-hidden="true" className="relative transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        aria-label={children}
        className={classes}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} aria-label={children} className={classes} onPointerMove={onMove} onPointerLeave={onLeave}>
      {inner}
    </Link>
  );
}

export const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
