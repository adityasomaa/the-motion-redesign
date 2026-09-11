import { LogoMarquee } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import { clutchBadges, heroLogos } from "@/lib/content";

export default function TrustedBy() {
  return (
    // bottom padding equals the 3rem gap above the badges, so the badges sit with equal space above and below
    <section className="border-y border-white/[0.06] pb-12 pt-14 md:pt-20">
      <div className="flex flex-col gap-12">
        <Reveal className="container-site flex flex-col items-center gap-3 text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">Trusted by industry leaders</h2>
        </Reveal>
        <LogoMarquee logos={heroLogos} duration={40} />
        <Reveal as="ul" className="container-site flex flex-wrap items-center justify-center gap-4 sm:gap-6" stagger={0.06}>
          {clutchBadges.map((b) => (
            // The reveal animates the <li>; the hover lift lives on the image. A CSS transform transition on the
            // same element GSAP moves made the badges settle lower than their box, crowding the section's bottom edge.
            <li key={b.src} data-reveal className="flex">
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                width={128}
                height={138}
                className="block h-24 w-auto transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-2 hover:rotate-[-3deg] sm:h-28"
              />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
