import Button, { ArrowIcon } from "./Button";
import Counter from "./Counter";
import SectionHead from "./SectionHead";
import { Reveal } from "./Motion";
import { calculatorHref, cta, fixedPrice, subscription } from "@/lib/content";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 shrink-0">
    <circle cx="8" cy="8" r="7.25" stroke="url(#pg)" strokeWidth="1.5" fill="none" />
    <path d="M5 8.2l2 2 4-4.4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff13bb" />
        <stop offset="1" stopColor="#5a55ff" />
      </linearGradient>
    </defs>
  </svg>
);

export default function PricingSection({
  title = <>Clear pricing <span className="text-grad">from the start</span></>,
  lead = "We like to keep pricing simple and transparent, with no hidden fees. Fixed-price videos give you upfront pricing based on the duration of your project. The subscription gives you a dedicated team of designers.",
}: {
  title?: React.ReactNode;
  lead?: string;
}) {
  const amount = Number(fixedPrice.from.replace(/[^0-9]/g, ""));
  return (
    <section className="section glow-b" aria-labelledby="pricing-title">
      <div className="container-site flex flex-col gap-14">
        <SectionHead eyebrow="Our pricing" title={title} lead={lead} />

        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <article data-reveal className="card spotlight flex flex-col gap-8 overflow-hidden p-7 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm text-white/65">Starting from</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-[clamp(3rem,2rem+4vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]">
                    $<Counter value={amount} className="tabular-nums" />
                  </span>
                  <span className="text-lg text-white/65">{fixedPrice.unit}</span>
                </p>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">Project based</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 id="pricing-title" className="display-3">
                {fixedPrice.title}
              </h3>
              <p className="max-w-xl leading-relaxed text-white/72">{fixedPrice.body}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {fixedPrice.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[0.95rem]">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={cta.sample.href}>{cta.sample.label}</Button>
              <span className="text-sm text-white/60">{fixedPrice.note}</span>
            </div>
          </article>

          <div data-reveal className="flex flex-col gap-6">
            <article className="card spotlight flex flex-1 flex-col gap-6 p-7 sm:p-10">
              <span className="w-fit rounded-full bg-violet px-3 py-1 text-xs uppercase tracking-[0.2em]">Ongoing</span>
              <h3 className="display-3">{subscription.title}</h3>
              <p className="leading-relaxed text-white/72">{subscription.body}</p>
              <ul className="flex flex-col gap-3">
                {subscription.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.95rem]">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button href={cta.call.href} variant="secondary">
                  {cta.call.label}
                </Button>
              </div>
            </article>
            <a
              href={calculatorHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card spotlight group flex items-center gap-5 p-5 transition-colors hover:bg-white/[0.06]"
            >
              <img src="/img/misc/67af361b-cost-cal-graph-p-1080.png" alt="" loading="lazy" className="h-20 w-20 shrink-0 object-contain" />
              <span className="flex flex-col gap-1">
                <span className="font-semibold">Want to know the cost of your next video?</span>
                <span className="text-sm text-white/65">Answer a few quick questions and get an instant estimate.</span>
              </span>
              <span className="ml-auto text-white/70 transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
