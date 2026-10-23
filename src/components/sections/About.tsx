import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const identityDetails = [
  {
    label: "Primary focus",
    title: "Backend Systems",
    description: "Clear responsibilities and reliable behavior.",
  },
  {
    label: "Core stack",
    title: "NestJS / TypeScript",
    description: "Backend application development.",
  },
  {
    label: "Current project",
    title: "WhatsApp Notification Service",
    description: "Backend implementation in progress for a tailoring business.",
  },
] as const;

export function About() {
  return (
    <Section aria-labelledby="about-title" className="border-t border-border">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)_minmax(0,0.95fr)] lg:gap-6 xl:gap-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
              01 / About me
            </p>
            <h2
              id="about-title"
              className="mt-7 max-w-[14ch] text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              Building backend systems that{" "}
              <span className="text-accent-blue">just work.</span>
            </h2>
            <p className="mt-7 max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m Yudi Runat Masneno, a Backend Engineer focused on NestJS
              and TypeScript. I start with the problem and design for clear
              responsibilities, data integrity, and verifiable behavior.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden min-h-80 self-center lg:block"
          >
            <div className="absolute inset-x-8 top-7 h-56 -rotate-6 rounded-xl border border-border bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.24)]" />
            <div className="absolute inset-x-5 top-12 h-56 rotate-6 rounded-xl border border-accent-violet/35 bg-[#151b34] shadow-[0_16px_40px_rgba(0,0,0,0.24)]" />
            <div className="absolute inset-x-6 top-16 h-52 rounded-xl border border-accent-blue/40 bg-linear-to-br from-[#16264b] via-surface to-[#21183d] shadow-[0_20px_44px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-5 rounded-md border border-foreground/10" />
              <div className="absolute top-9 left-8 h-px w-20 bg-accent-blue/55" />
              <div className="absolute top-9 right-8 h-14 w-px bg-accent-violet/40" />
              <div className="absolute bottom-10 left-8 h-px w-24 bg-accent-violet/45" />
              <div
                className="absolute right-8 bottom-7 h-14 w-14 opacity-45"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--color-accent-blue) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
            </div>
          </div>

          <div className="min-w-0 border-t border-border">
            {identityDetails.map((detail) => (
              <div
                key={detail.label}
                className="border-b border-border py-5 first:pt-0 last:pb-0"
              >
                <br />
                <p className="text-xs font-semibold tracking-[0.14em] text-accent-blue uppercase">
                  {detail.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {detail.description}
                </p>
              </div>
            ))}
            <br />
          </div>
        </div>
      </Container>
    </Section>
  );
}
