import Button from "@/components/site/Button";
import { YouTubeFacade } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { cta, testimonials } from "@/lib/content";

/**
 * Audit finding 03: the person and company lead each card, so the section works at a glance
 * before any video loads. Videos are click-to-load facades, not six live iframes.
 * The live site has no written quotes, so none are shown here.
 */
export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-site flex flex-col gap-14">
        <SectionHead
          eyebrow="Testimonials"
          title={
            <>
              See what <span className="text-grad">our clients say</span>
            </>
          }
          lead="We work with teams of all sizes across the world. Most of our work supports marketing, and our videos are also used by HR and Finance teams."
        />
        <Reveal
          as="ul"
          className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <li key={t.name} data-reveal className="card spotlight flex w-[82vw] max-w-[24rem] shrink-0 snap-start flex-col gap-5 p-4 md:w-auto md:max-w-none">
              <div className="flex flex-col gap-1 px-2 pt-2">
                <span className="text-xs uppercase tracking-[0.25em] text-white/55">{t.company}</span>
                <span className="text-xl font-semibold tracking-tight">{t.name}</span>
                <span className="text-sm text-white/65">{t.role}</span>
              </div>
              <YouTubeFacade id={t.youtube} title={`${t.name}, ${t.role} at ${t.company}, on working with Motion`} />
            </li>
          ))}
        </Reveal>
        <Reveal className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-8">
          <p className="display-3 max-w-[22ch]">Hear enough? Start with a free sample.</p>
          <Button href={cta.sample.href}>{cta.sample.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
