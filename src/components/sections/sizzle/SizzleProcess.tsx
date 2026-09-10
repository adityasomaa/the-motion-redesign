"use client";

import Button from "@/components/site/Button";
import { ScaledBox } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { CircuitBoard } from "@/components/ui/circuit-board";
import { cta, sizzle } from "@/lib/content";

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons = ["M8 1.5v9M4.5 7L8 10.5 11.5 7M2.5 14.5h11", "M5 6.5a2 2 0 100-4 2 2 0 000 4zM11 6.5a2 2 0 100-4 2 2 0 000 4zM1.5 13.5c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5M7.5 13.5c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5", "M2 8.5l3.5 3.5L14 3.5"];

export default function SizzleProcess() {
  const nodes = sizzle.process.map((p, i) => ({ id: p.id, x: 90 + i * 250, y: 110, label: p.title, size: "lg" as const, icon: <Icon d={icons[i]!} /> }));
  const connections = [
    { from: "sample", to: "production" },
    { from: "production", to: "review" },
  ];

  return (
    <section className="section">
      <div className="container-site flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Our process"
            title={
              <>
                Our sizzle reel <span className="text-grad">production process</span>
              </>
            }
            lead="From concept to captivating final product, a streamlined process built for maximum impact."
          />
          <Reveal>
            <Button href={cta.sample.href}>{cta.sample.label}</Button>
          </Reveal>
        </div>

        <Reveal>
          <div className="card overflow-hidden px-4 py-8 sm:px-10">
            <ScaledBox width={680} height={200} maxScale={1.6}>
              <CircuitBoard
                nodes={nodes}
                connections={connections}
                width={680}
                height={200}
                variant="dark"
                gridSize={20}
                traceWidth={2}
                pulseSpeed={1.8}
                traceColor="rgba(255,255,255,0.14)"
                pulseColor="#ff13bb"
                nodeColor="rgba(255,255,255,0.85)"
              />
            </ScaledBox>
          </div>
        </Reveal>

        <Reveal as="ol" className="grid gap-5 md:grid-cols-3">
          {sizzle.process.map((p, i) => (
            <li key={p.id} data-reveal className="card spotlight flex flex-col gap-4 p-7">
              <span className="text-5xl font-extrabold leading-none tracking-[-0.05em] text-grad">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="leading-relaxed text-white/70">{p.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
