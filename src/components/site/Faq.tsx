"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="border-t border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/10">
            <h3>
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1.1rem,1rem+0.5vw,1.45rem)] font-medium"
              >
                <span className="transition-colors group-hover:text-white">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-expo)]",
                    isOpen ? "rotate-45 border-transparent bg-[image:var(--grad-btn)]" : "border-white/20",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-white" />
                  <span className="absolute h-3.5 w-px bg-white" />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-a${i}`}
              role="region"
              aria-labelledby={`${base}-q${i}`}
              className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-3xl pb-7 leading-relaxed text-white/72">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
