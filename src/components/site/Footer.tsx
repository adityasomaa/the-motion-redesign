"use client";

import { useRef } from "react";
import Logo from "./Logo";
import { footerColumns, site } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const prompt =
  "Hi, I'm looking into working with a B2B video production company called Motion The Agency (motiontheagency.com). Can you give me a clear and honest picture of who they are, their strongest services, pricing approach, turnaround, quality of work and notable clients?";
const q = encodeURIComponent(prompt);
const askAi = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${q}` },
  { label: "Claude", href: `https://claude.ai/new?q=${q}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
  { label: "Google AI", href: `https://www.google.com/search?udm=50&aep=11&q=${q}` },
  { label: "Grok", href: `https://grok.com/?q=${q}` },
];

const SocialIcon = ({ label }: { label: string }) => {
  if (label === "YouTube")
    return <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z" fill="currentColor" />;
  if (label === "LinkedIn")
    return <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor" />;
  return <path d="M8.2 11.3c.9-.4 1.4-1.1 1.4-2.2C9.6 7 8 6 5.9 6H1v12h5.1c2.3 0 4.3-1.1 4.3-3.6 0-1.6-.8-2.8-2.2-3.1zM3.3 8h2.2c.9 0 1.7.3 1.7 1.3S6.6 10.7 5.7 10.7H3.3zm2.5 8H3.3v-3.3h2.6c1.1 0 1.8.5 1.8 1.7S6.9 16 5.8 16zM19.6 7.1h-5.2V5.8h5.2zM23 13.3c0-2.8-1.6-5.1-4.6-5.1s-4.9 2.2-4.9 5 1.8 5 4.9 5c2.3 0 3.9-1 4.6-3.3h-2.3c-.3.8-1.2 1.3-2.2 1.3-1.5 0-2.3-.9-2.3-2.4H23v-.5zm-6.8-1c.1-1.2.9-2.1 2.2-2.1s1.9.8 2 2.1z" fill="currentColor" />;
};

export default function Footer() {
  const bigRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!bigRef.current || prefersReducedMotion()) return;
    const split = SplitText.create(bigRef.current, { type: "chars", charsClass: "inline-block will-change-transform" });
    gsap.from(split.chars, {
      yPercent: 110,
      rotate: 8,
      opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      scrollTrigger: { trigger: bigRef.current, start: "top 95%", end: "bottom 80%", scrub: 0.8 },
    });
    return () => split.revert();
  });

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[linear-gradient(180deg,#080610,#0d0820)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(88,30,227,.32), transparent 70%)" }}
      />
      <div className="container-site relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-20">
          <div className="flex flex-col gap-7">
            <Logo />
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/75">{site.description}</p>
            <address className="flex flex-col gap-3 text-sm not-italic text-white/85">
              <span className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 shrink-0">
                  <path d="M8 15s5-4.6 5-8.5A5 5 0 003 6.5C3 10.4 8 15 8 15zm0-6.5a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
                </svg>
                {site.address}
              </span>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
                  <path d="M1.5 3h13v10h-13zm.5.6L8 8.5l6-4.9" stroke="currentColor" strokeWidth="1.3" fill="none" />
                </svg>
                {site.email}
              </a>
            </address>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">
                Ask AI about us! <span className="font-normal text-white/60">Get an instant, unbiased summary.</span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {askAi.map((a) => (
                  <li key={a.label}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex h-8 items-center rounded-full border border-white/15 px-3 text-xs text-white/80 transition-colors hover:border-white/50 hover:text-white"
                    >
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Same six columns as the live footer. Lists render as placeholders until their pages exist. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.heading} data-slot="footer-links">
                <p className="mb-5 text-[0.95rem] font-semibold">{col.heading}</p>
                {col.links.length ? (
                  <ul className="flex flex-col gap-3">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="text-sm text-white/65 hover:text-white">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul aria-hidden="true" className="flex flex-col gap-3.5">
                    {[72, 56, 64].map((w, i) => (
                      <li key={i} className="h-2.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <p
          ref={bigRef}
          aria-hidden="true"
          className="mt-24 select-none overflow-hidden whitespace-nowrap text-center text-[clamp(2.75rem,11.5vw,11rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-grad"
        >
          Make your brand move
        </p>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center">
          <p>© 2026 Motion The Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <ul className="flex items-center gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <SocialIcon label={s.label} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
