import { ImageReveal, Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { sizzle } from "@/lib/content";

const images = [
  "/img/misc/671693ee-image-5.avif",
  "/img/misc/671693ee-image-4.avif",
  "/img/misc/671693ee-image-3.avif",
  "/img/misc/671693ee-image-2.avif",
  "/img/misc/671693ee-image-1.avif",
  "/img/misc/671693ee-image.avif",
];

export default function Tips() {
  return (
    <section className="section glow-b">
      <div className="container-site flex flex-col gap-14">
        <SectionHead
          eyebrow="Crafting excellence"
          title={
            <>
              How to make a <span className="text-grad">successful sizzle reel</span>
            </>
          }
          lead="Six essentials for a reel that captivates your audience and drives results."
        />
        <Reveal as="ol" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {sizzle.tips.map((t, i) => (
            <li key={t.title} data-reveal className="group flex flex-col gap-5">
              <ImageReveal className="aspect-[396/238] w-full rounded-[1.25rem] border border-white/10 bg-panel">
                <img
                  src={images[i]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
                />
              </ImageReveal>
              <div className="flex gap-4">
                <span className="font-mono text-sm text-pink">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                  <p className="leading-relaxed text-white/70">{t.body}</p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
