"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import SectionHead from "@/components/site/SectionHead";
import ServiceCard from "@/components/site/ServiceCard";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const filters = ["All", "Video", "Animation", "Design"] as const;
// Only effects that render the default layer once, so each card decodes its video once.
const effects = ["strips", "ripple", "wipe", "morph"] as const;

export default function ServicesGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? services : services.filter((s) => s.group === filter);

  return (
    <section className="section" id="services">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Our services"
            title={
              <>
                What we can <span className="text-grad">do for you</span>
              </>
            }
            lead="From explainer videos to company branding and full website design, we help you create marketing materials that make your brand stand out in a crowded market."
          />
          <LayoutGroup>
            <div role="group" aria-label="Filter services" className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn("relative h-10 rounded-full px-5 text-sm transition-colors", filter === f ? "text-white" : "text-white/65 hover:text-white")}
                >
                  {filter === f && (
                    <motion.span layoutId="service-filter" className="absolute inset-0 rounded-full bg-[image:var(--grad-btn)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s) => {
              const index = services.indexOf(s);
              return (
                <motion.li
                  key={s.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ServiceCard service={s} index={index} effect={effects[index % effects.length]} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
