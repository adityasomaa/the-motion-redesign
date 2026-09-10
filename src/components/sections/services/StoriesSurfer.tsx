"use client";

import { CollectionSurfer } from "@/components/ui/collection-surfer";
import { stories } from "@/lib/content";

export default function StoriesSurfer() {
  const items = stories.map((s) => ({ id: s.id, title: s.title, image: s.image, caption: s.tags.join(" · ") }));
  return (
    <section aria-labelledby="stories-title" className="relative">
      <CollectionSurfer
        items={items}
        variant="magnetic"
        scrollPerItem={0.32}
        overlay={
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[calc(var(--header-h)+2rem)]">
            <div className="container-site flex items-start justify-between gap-6">
              <div className="flex max-w-xl flex-col gap-4">
                <p className="eyebrow">Customer stories</p>
                <h2 id="stories-title" className="display-2 text-balance">
                  See the full scope <span className="text-grad">of our services</span>
                </h2>
                <p className="hidden max-w-md text-white/70 md:block">
                  Many of these are partnerships that lasted months and helped clients launch, raise investment or completely pivot.
                </p>
              </div>
              <span className="mt-2 hidden shrink-0 rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/60 sm:block">
                Scroll to surf
              </span>
            </div>
          </div>
        }
      />
    </section>
  );
}
