"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import React from "react";

export interface CollectionItem {
    id: number;
    image: string;
    title: string;
    caption?: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

interface CollectionSurferProps {
    items: CollectionItem[];
    variant?: CollectionSurferVariant;
    /** Scroll distance per card, in viewport heights. */
    scrollPerItem?: number;
    /** Rendered in the pinned viewport, above the scene. */
    overlay?: React.ReactNode;
}

/**
 * Adapted from Componentry: the original pinned the whole page (50,000px spacer, position:fixed).
 * Here the section is pinned with position:sticky and progress comes from the section's own scroll,
 * so it sits between other sections and ends when its cards run out.
 */
export function CollectionSurfer({ items, variant = "magnetic", scrollPerItem = 0.45, overlay }: CollectionSurferProps) {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const [compact, setCompact] = React.useState(false);

    React.useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const sync = () => setCompact(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const progress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

    const stepX = compact ? 150 : 240;
    const stepY = compact ? -60 : -84;
    const stepZ = compact ? -220 : -288;
    const travel = Math.max(items.length - 1, 1);

    const x = useTransform(progress, [0, 1], [0, -travel * stepX]);
    const y = useTransform(progress, [0, 1], [0, -travel * stepY]);
    const z = useTransform(progress, [0, 1], [0, -travel * stepZ]);

    const mouseX = useMotionValue(-10000);
    const mouseY = useMotionValue(-10000);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (variant === "simple") return;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
        mouseX.set(-10000);
        mouseY.set(-10000);
    };

    return (
        <div ref={sectionRef} className="relative w-full" style={{ height: `${100 + items.length * scrollPerItem * 100}svh` }}>
            <div
                className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {overlay}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ perspective: "2000px", perspectiveOrigin: compact ? "30% 20%" : "10% 10%" }}
                >
                    <motion.div className="relative h-0 w-0" style={{ x, y, z, transformStyle: "preserve-3d" }}>
                        {items.map((item, i) => (
                            <Card
                                key={item.id}
                                item={item}
                                i={i}
                                total={items.length}
                                stepX={stepX}
                                stepY={stepY}
                                stepZ={stepZ}
                                compact={compact}
                                mouseX={mouseX}
                                mouseY={mouseY}
                                scrollSpring={progress}
                                variant={variant}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Card({
    item,
    i,
    total,
    stepX,
    stepY,
    stepZ,
    compact,
    mouseX,
    mouseY,
    scrollSpring,
    variant,
}: {
    item: CollectionItem;
    i: number;
    total: number;
    stepX: number;
    stepY: number;
    stepZ: number;
    compact: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    scrollSpring: MotionValue<number>;
    variant: CollectionSurferVariant;
}) {
    const ref = React.useRef<HTMLDivElement>(null);

    const distance = useTransform([mouseX, mouseY, scrollSpring], ([x = 0, y = 0]: number[]) => {
        if (!ref.current || variant === "simple") return 400;
        const rect = ref.current.getBoundingClientRect();
        return Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2));
    });

    const springScale = useSpring(useTransform(distance, [0, 400], [1.35, 1]), { mass: 0.5, stiffness: 300, damping: 20 });
    const springUplift = useSpring(useTransform(distance, [0, 400], [-80, 0]), { mass: 0.5, stiffness: 300, damping: 20 });

    const transform = useTransform([springScale, springUplift], ([s, u]: number[]) => {
        const scaleValue = variant === "magnetic" ? Number(s) : 1;
        const upliftValue = variant === "uplift" ? Number(u) : 0;
        return `translate3d(${i * stepX}px, ${i * stepY + upliftValue}px, ${i * stepZ}px) rotateY(-50deg) scale(${scaleValue})`;
    });

    return (
        <motion.figure
            ref={ref}
            className="group absolute m-0 overflow-hidden rounded-2xl bg-panel shadow-[0_40px_120px_rgba(88,30,227,0.35)]"
            style={{ transform, transformStyle: "preserve-3d", width: compact ? 200 : 300, height: compact ? 270 : 400 }}
        >
            <div className="absolute left-3 top-3 z-10 font-mono text-[0.7rem] text-white/70">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <img
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover brightness-75 transition duration-500 group-hover:brightness-100"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-12">
                <span className="block text-lg font-semibold tracking-tight">{item.title}</span>
                {item.caption ? <span className="mt-1 block text-xs text-white/70">{item.caption}</span> : null}
            </figcaption>
        </motion.figure>
    );
}
