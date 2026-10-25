import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type CaseStudySectionProps = {
  number: string;
  title: string;
  id: string;
  children: ReactNode;
};

export function CaseStudySection({
  number,
  title,
  id,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16"
    >
      <ScrollReveal>
        <p className="mb-5 font-mono text-xs font-medium tracking-[0.14em] text-accent-blue">
          {number}
        </p>
        <h2
          id={id}
          className="max-w-[15ch] text-balance text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-foreground"
        >
          {title}
        </h2>
      </ScrollReveal>
      <div className="min-w-0 max-w-[65ch] text-base leading-[1.8] text-muted sm:text-lg">
        {children}
      </div>
    </section>
  );
}
