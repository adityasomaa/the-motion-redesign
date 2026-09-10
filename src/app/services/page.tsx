import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import PricingSection from "@/components/site/PricingSection";
import VelocityBand from "@/components/site/VelocityBand";
import ServicesGrid from "@/components/sections/services/ServicesGrid";
import ServicesHero from "@/components/sections/services/ServicesHero";
import StoriesSurfer from "@/components/sections/services/StoriesSurfer";
import TrustedBy from "@/components/sections/services/TrustedBy";

export const metadata: Metadata = {
  title: "Video, animation and design services",
  description:
    "Explainer videos, 2D and 3D animation, sizzle reels, product and corporate videos, Lottie, UI and brand design. One team, fixed prices or a subscription.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <TrustedBy />
      <ServicesGrid />
      <VelocityBand text="Explainer videos ✦ Product videos ✦ Lottie ✦ Brand design ✦ Corporate videos ✦" />
      <StoriesSurfer />
      <PricingSection
        title={
          <>
            Transparent pricing <span className="text-grad">for every project</span>
          </>
        }
        lead="Every project is unique, so we offer flexible pricing options to suit different needs and budgets, with no hidden fees."
      />
      <CtaBand
        title={
          <>
            Ready to animate <span className="text-grad">your vision?</span>
          </>
        }
        lead="Contact us for your free animation video sample."
      />
    </>
  );
}
