import Button from "@/components/site/Button";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-[calc(var(--bar-h)+var(--header-h))]">
      <div aria-hidden="true" className="absolute inset-0 opacity-70">
        <PixelCanvas gap={16} speed={0.02} colors={["#ff13bb", "#e225ff", "#5a55ff"]} />
      </div>
      <div className="container-site pointer-events-none relative flex flex-col items-start gap-7 py-20">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-1 max-w-[14ch]">
          This page is <span className="text-grad">still in production</span>
        </h1>
        <p className="lead max-w-xl">This preview covers the Home, Services and Sizzle Reel pages. The rest of the site is on its way.</p>
        <div className="pointer-events-auto flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            See services
          </Button>
        </div>
      </div>
    </section>
  );
}
