import { LogoMarquee } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import { clutchBadges, heroLogos } from "@/lib/content";

export default function TrustedBy() {
  return (
    <section className="border-y border-white/[0.06] py-14 md:py-20">
      <div className="flex flex-col gap-12">
        <Reveal className="container-site flex flex-col items-center gap-3 text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">Trusted by industry leaders</h2>
        </Reveal>
        <LogoMarquee logos={heroLogos} duration={40} />
        <Reveal as="ul" className="container-site flex flex-wrap items-center justify-center gap-4 sm:gap-6" stagger={0.06}>
          {clutchBadges.map((b) => (
            <li key={b.src} data-reveal className="transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-2 hover:rotate-[-3deg]">
              <img src={b.src} alt={b.alt} loading="lazy" width={128} height={138} className="h-24 w-auto sm:h-28" />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
