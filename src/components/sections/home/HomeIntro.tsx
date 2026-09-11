"use client";

import Button, { ArrowIcon } from "@/components/site/Button";
import Counter from "@/components/site/Counter";
import { ScaledBox } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { CircuitBoard } from "@/components/ui/circuit-board";
import { stats } from "@/lib/content";
import { useMedia } from "@/lib/useMedia";

const Icon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* The project journey as described on the live site: brief, free sample, storyboard planning, production, delivery. */
const steps = [
  { id: "brief", label: "Your brief", size: "lg" as const, icon: <Icon d="M4 1.5h5l3 3v10H4zM9 1.5v3h3M6 8h4M6 11h4" /> },
  { id: "sample", label: "Free sample", icon: <Icon d="M8 1.5l1.6 4.2 4.4.3-3.4 2.8 1.1 4.3L8 10.7l-3.7 2.4 1.1-4.3L2 6l4.4-.3z" /> },
  { id: "storyboard", label: "Storyboard", icon: <Icon d="M1.5 3h13v10h-13zM1.5 8h13M6 3v10M10.5 3v10" /> },
  { id: "production", label: "Production", icon: <Icon d="M2 4h12v8H2zM6.5 6v4l3.5-2z" /> },
  { id: "delivery", label: "Final delivery", size: "lg" as const, icon: <Icon d="M3 8.5l3.5 3.5L13 4.5" /> },
];
const connections = steps.slice(1).map((s, i) => ({ from: steps[i]!.id, to: s.id }));

// Laptop and tablet: a zigzag down a central spine. Every trace, and every pulse, runs downward.
const wide = [
  { x: 140, y: 44 },
  { x: 540, y: 138 },
  { x: 140, y: 232 },
  { x: 540, y: 326 },
  { x: 340, y: 412 },
];
// Phone: one straight line top to bottom, labels beside the nodes so the trace never runs through text.
const tall = steps.map((_, i) => ({ x: 44, y: 44 + i * 98 }));

export default function HomeIntro() {
  const compact = useMedia("(max-width: 639px)");
  const layout = compact ? tall : wide;
  const nodes = steps.map((s, i) => ({ ...s, ...layout[i]!, labelSide: compact ? ("right" as const) : ("bottom" as const) }));
  const board = compact ? { width: 300, height: 480 } : { width: 680, height: 480 };

  return (
    <section className="section glow-a">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col gap-10">
          <SectionHead
            eyebrow="Who we are"
            title={
              <>
                We are your outsourced <span className="text-grad">motion and design team</span>
              </>
            }
            lead="Our team communicates your message with animation, motion graphics and 3D renders. Whether you need a new sizzle reel or support with a multi-channel video campaign, we're ready to support your business, marketing department or marketing agency."
            actions={
              <Button href="#work" variant="secondary" icon={<ArrowIcon />}>
                See our work
              </Button>
            }
          />
          <Reveal as="dl" className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label} data-reveal className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-white/65">{s.label}</dt>
                <dd className="order-1 text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">
                  <Counter value={s.value} suffix={s.suffix} className="tabular-nums" />
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal>
          <figure className="card overflow-hidden p-5 sm:p-8">
            <ScaledBox key={board.width} width={board.width} height={board.height} maxScale={compact ? 1.15 : 1.2}>
              <CircuitBoard
                nodes={nodes}
                connections={connections}
                width={board.width}
                height={board.height}
                variant="dark"
                gridSize={22}
                traceWidth={2}
                pulseSpeed={4.2}
                traceColor="rgba(255,255,255,0.14)"
                pulseColor="#ff13bb"
                nodeColor="rgba(255,255,255,0.82)"
              />
            </ScaledBox>
            <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm text-white/65">
              From your brief to final delivery: every project starts with a free sample, then storyboard planning, then production.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
