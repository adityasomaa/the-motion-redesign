import Button, { ArrowIcon } from "@/components/site/Button";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import ServiceCard from "@/components/site/ServiceCard";
import { homeServices } from "@/lib/content";

// Only effects that render the default layer once, so each card decodes its video once.
const effects = ["strips", "ripple", "wipe", "morph", "strips", "ripple"] as const;

export default function HomeServices() {
  return (
    <section className="section">
      <div className="container-site flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Services"
            title={
              <>
                Our animation <span className="text-grad">and design services</span>
              </>
            }
            lead="Motion graphics, animation and video, each one shaped around your brand and your audience."
          />
          <Reveal>
            <Button href="/services" variant="secondary" icon={<ArrowIcon />}>
              See all services
            </Button>
          </Reveal>
        </div>
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {homeServices.map((s, i) => (
            <div key={s.title} data-reveal>
              <ServiceCard service={s} index={i} effect={effects[i % effects.length]} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
