import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import PricingSection from "@/components/site/PricingSection";
import SectionHead from "@/components/site/SectionHead";
import VelocityBand from "@/components/site/VelocityBand";
import TrustedBy from "@/components/sections/services/TrustedBy";
import Benefits from "@/components/sections/sizzle/Benefits";
import Reasons from "@/components/sections/sizzle/Reasons";
import SizzleHero from "@/components/sections/sizzle/SizzleHero";
import SizzleProcess from "@/components/sections/sizzle/SizzleProcess";
import SizzleWork from "@/components/sections/sizzle/SizzleWork";
import Tips from "@/components/sections/sizzle/Tips";
import Types from "@/components/sections/sizzle/Types";
import WhatIs from "@/components/sections/sizzle/WhatIs";
import { sizzle } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sizzle reel services",
  description:
    "Sizzle reel production for brands, startups and agencies. Brand launches, product demos and event highlights built with 2D and 3D animation, starting with a free sample.",
};

export default function SizzleReelsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sizzle.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SizzleHero />
      <TrustedBy />
      <WhatIs />
      <Reasons />
      <Benefits />
      <VelocityBand text="Brand launch ✦ Product launch ✦ Event highlight ✦ Product demo ✦" />
      <Types />
      <Tips />
      <SizzleProcess />
      <SizzleWork />
      <PricingSection />
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHead
            eyebrow="Frequently asked questions"
            title={
              <>
                Got questions? <span className="text-grad">We&apos;ve got answers</span>
              </>
            }
            lead="If you have a more specific question, get in touch with a member of the team."
            className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start"
          />
          <Faq items={sizzle.faq} />
        </div>
      </section>
      <CtaBand
        title={
          <>
            Ready for your free <span className="text-grad">sizzle reel sample?</span>
          </>
        }
        lead="Send us your toughest concept and we'll show you how we'd bring it to life. No credit card, no commitment."
      />
    </>
  );
}
