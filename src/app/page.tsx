import CtaBand from "@/components/site/CtaBand";
import PricingSection from "@/components/site/PricingSection";
import VelocityBand from "@/components/site/VelocityBand";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeIntro from "@/components/sections/home/HomeIntro";
import HomeServices from "@/components/sections/home/HomeServices";
import Process from "@/components/sections/home/Process";
import Testimonials from "@/components/sections/home/Testimonials";
import WhyUs from "@/components/sections/home/WhyUs";
import WorkSpiral from "@/components/sections/home/WorkSpiral";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <VelocityBand text="2D animation ✦ 3D animation ✦ Sizzle reels ✦ UI animation ✦ Branded motion ✦" />
      <HomeIntro />
      <WorkSpiral />
      <HomeServices />
      <WhyUs />
      <Process />
      <Testimonials />
      <PricingSection />
      <CtaBand
        title={
          <>
            Make your brand <span className="text-grad">move!</span>
          </>
        }
      />
    </>
  );
}
