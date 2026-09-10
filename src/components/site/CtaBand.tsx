import type { ReactNode } from "react";
import Button from "./Button";
import { Reveal, SplitHeading } from "./Motion";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { cta, guarantees } from "@/lib/content";

/** Closing call to action. Move the pointer across it and the pixel field lights up in the brand gradient. */
export default function CtaBand({ title, lead }: { title: ReactNode; lead?: string }) {
  return (
    <section id="contact" className="section">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,#1a0d3a,#0d0820_60%)]">
          <div className="absolute inset-0 opacity-90">
            <PixelCanvas gap={12} speed={0.025} colors={["#ff13bb", "#e225ff", "#5a55ff", "#581ee3"]} variant="trail" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,19,187,.35), transparent 65%)" }}
          />
          <div className="pointer-events-none relative grid gap-14 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:px-20">
            <div className="flex flex-col gap-7">
              <Reveal>
                <p className="eyebrow">Try it risk-free</p>
              </Reveal>
              <SplitHeading className="display-1 max-w-[14ch] text-balance">{title}</SplitHeading>
              <Reveal delay={0.1}>
                <p className="lead max-w-xl">{lead ?? "Start your first video request risk-free and enjoy our other unique benefits!"}</p>
              </Reveal>
              <Reveal delay={0.2} className="pointer-events-auto flex flex-wrap gap-3">
                <Button href={cta.sample.href}>{cta.sample.label}</Button>
                <Button href={cta.call.href} variant="secondary">
                  {cta.call.label}
                </Button>
              </Reveal>
            </div>
            <Reveal as="ul" className="grid content-end gap-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {guarantees.map((g) => (
                <li key={g.title} data-reveal className="flex flex-col gap-2 bg-[#110a26]/90 p-6">
                  <span className="text-base font-semibold">{g.title}</span>
                  <span className="text-sm leading-relaxed text-white/70">{g.body}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
