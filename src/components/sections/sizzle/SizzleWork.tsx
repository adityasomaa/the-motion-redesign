import { YouTubeFacade } from "@/components/site/Media";
import { Reveal } from "@/components/site/Motion";
import SectionHead from "@/components/site/SectionHead";
import { sizzle } from "@/lib/content";

export default function SizzleWork() {
  return (
    <section className="section" id="our-work">
      <div className="container-site flex flex-col gap-14">
        <SectionHead
          eyebrow="Our work"
          title={
            <>
              Boosting brand awareness <span className="text-grad">through dynamic sizzle reels</span>
            </>
          }
          lead="Our sizzle reels transform brand narratives, engage audiences and elevate market presence. Here's how we've helped diverse businesses increase visibility."
        />
        <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {sizzle.videos.map((id, i) => (
            <li key={id} data-reveal>
              <YouTubeFacade id={id} title={`Sizzle reel example ${i + 1} by Motion The Agency`} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
