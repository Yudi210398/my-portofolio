import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Understand",
    icon: "search",
    description:
      "Clarify the problem, constraints, and expected behavior before implementation.",
  },
  {
    number: "02",
    title: "Design",
    icon: "layers",
    description:
      "Define clear responsibilities and data flow with a focus on data integrity.",
  },
  {
    number: "03",
    title: "Build",
    icon: "code",
    description:
      "Implement a simple, maintainable solution while considering security and correctness.",
  },
  {
    number: "04",
    title: "Verify",
    icon: "check",
    description:
      "Test important behavior and validate the result against the requirements.",
  },
] as const;

type StepIconName = (typeof steps)[number]["icon"];

function StepIcon({ name }: { name: StepIconName }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {name === "search" && (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </>
      )}
      {name === "layers" && (
        <>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </>
      )}
      {name === "code" && (
        <>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
          <path d="m14 4-4 16" />
        </>
      )}
      {name === "check" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="m8 12 3 3 5-6" />
        </>
      )}
    </svg>
  );
}

export function EngineeringApproach() {
  return (
    <Section
      id="focus"
      aria-labelledby="focus-title"
      className="border-t border-border"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <ScrollReveal className="max-w-[56ch]">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
              02 / Engineering approach
            </p>
            <h2
              id="focus-title"
              className="mt-7 max-w-[15ch] text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              From problem to a{" "}
              <span className="text-accent-blue">verified solution.</span>
            </h2>
            <p className="mt-7 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">
              I follow a structured approach to backend engineering, from
              understanding requirements to designing clear boundaries,
              implementing solutions, and verifying expected behavior.
            </p>
          </ScrollReveal>
          <ol className="space-y-9">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 pl-9 before:absolute before:top-5 before:-bottom-14 before:left-[5px] before:w-px before:bg-accent-blue/45 last:before:hidden sm:pl-11"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3.5 left-0 z-10 h-3 w-3 rounded-full border-2 border-accent-blue bg-background"
                />
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-accent-blue"
                >
                  <StepIcon name={step.icon} />
                </span>
                <ScrollReveal className="min-w-0 flex-1" delay={index * 0.04}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-semibold tracking-[0.12em] text-accent-blue">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
