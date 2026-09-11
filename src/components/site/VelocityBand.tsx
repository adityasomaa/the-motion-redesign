"use client";

import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { cn } from "@/lib/utils";

/**
 * Two rows that drift in opposite directions and speed up with scroll velocity. The second row is outlined.
 * Each row clips horizontally, so the line height has to hold the full glyph box (descenders included).
 */
export default function VelocityBand({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/[0.06] py-5 md:py-8",
        "[&>div>div:last-of-type_span]:text-transparent [&>div>div:last-of-type_span]:[-webkit-text-stroke:1px_rgba(255,255,255,0.38)]",
        className,
      )}
    >
      <ScrollBasedVelocity
        text={text}
        default_velocity={0.9}
        className="text-[clamp(2.75rem,1.5rem+6vw,7.5rem)] font-semibold leading-[1.34] tracking-[-0.045em]"
      />
    </div>
  );
}
