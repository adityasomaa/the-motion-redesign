import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { sizzle } from "@/lib/content";

const icons = [
  "M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11",
  "M4 12l5 5L20 6",
  "M3 17l6-6 4 4 8-8M15 7h6v6",
  "M13 2L4 14h7l-1 8 9-12h-7z",
  "M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z",
  "M12 21a9 9 0 100-18 9 9 0 000 18zM8 12l3 3 5-6",
];

export default function Reasons() {
  return (
    <section className="section">
      <div className="container-site flex flex-col gap-14">
        <SectionHead
          eyebrow="Why choose us"
          title={
            <>
              Excellence in <span className="text-grad">risk-free sizzle reel services</span>
            </>
          }
          lead="Working with a design agency can feel daunting, with the fear that they simply won't get it. So every sizzle reel project comes with the following."
        />
        <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {sizzle.reasons.map((r, i) => (
            <li key={r.title} data-reveal className="card spotlight group flex flex-col gap-5 p-7 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-1.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(255,19,187,.25),rgba(90,85,255,.25))] text-white transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-[20deg] group-hover:scale-110">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={icons[i]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{r.title}</h3>
              <p className="leading-relaxed text-white/70">{r.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
