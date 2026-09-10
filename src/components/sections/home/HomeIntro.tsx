"use client";

import Button, { ArrowIcon } from "@/components/site/Button";
import Counter from "@/components/site/Counter";
import { ScaledBox } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { CircuitBoard } from "@/components/ui/circuit-board";
import { stats } from "@/lib/content";

const Icon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const nodes = [
  { id: "brief", x: 70, y: 190, label: "Your brief", size: "lg" as const, icon: <Icon d="M4 1.5h5l3 3v10H4zM9 1.5v3h3M6 8h4M6 11h4" /> },
  { id: "figma", x: 260, y: 80, label: "Figma", icon: <Icon d="M6 1.5h4a2 2 0 010 4H6a2 2 0 010-4zM6 5.5h4a2 2 0 010 4H6a2 2 0 010-4zM6 9.5a2 2 0 102 2v-2" /> },
  { id: "ae", x: 260, y: 300, label: "After Effects", icon: <Icon d="M2 13l3.5-10h1L10 13M3.3 9.5h4.4M11.5 8.5c0-1 .7-1.8 1.7-1.8S15 7.5 15 8.5H11.5c0 1.2.8 2 1.9 2" /> },
  { id: "blender", x: 450, y: 190, label: "Blender", icon: <Icon d="M8 14.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM8 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.5 10L1 6.5h5.5" /> },
  { id: "video", x: 600, y: 190, label: "Your video", size: "lg" as const, icon: <Icon d="M5 3.5l8 4.5-8 4.5z" /> },
];
const connections = [
  { from: "brief", to: "figma" },
  { from: "brief", to: "ae" },
  { from: "figma", to: "blender" },
  { from: "ae", to: "blender" },
  { from: "blender", to: "video", bidirectional: true },
];

export default function HomeIntro() {
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
            <ScaledBox width={680} height={390}>
              <CircuitBoard
                nodes={nodes}
                connections={connections}
                width={680}
                height={390}
                variant="dark"
                gridSize={22}
                traceWidth={2}
                pulseSpeed={2.4}
                traceColor="rgba(255,255,255,0.14)"
                pulseColor="#ff13bb"
                nodeColor="rgba(255,255,255,0.82)"
              />
            </ScaledBox>
            <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm text-white/65">
              Figma, After Effects and Blender: the tools behind every brief we turn into video.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
