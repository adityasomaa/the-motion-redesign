import type { ElementType, ReactNode } from "react";
import { Reveal, SplitHeading } from "./Motion";
import { cn } from "@/lib/utils";

export default function SectionHead({
  eyebrow,
  title,
  lead,
  actions,
  align = "left",
  as = "h2",
  intro,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  intro?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow ? (
        <Reveal intro={intro}>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      ) : null}
      <SplitHeading as={as} intro={intro} className={cn("display-2 max-w-[20ch] text-balance", titleClassName)}>
        {title}
      </SplitHeading>
      {lead ? (
        <Reveal intro={intro} delay={0.15}>
          <p className={cn("lead max-w-2xl text-pretty", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      ) : null}
      {actions ? (
        <Reveal intro={intro} delay={0.25} className={cn("flex flex-wrap gap-3", align === "center" && "justify-center")}>
          {actions}
        </Reveal>
      ) : null}
    </div>
  );
}
