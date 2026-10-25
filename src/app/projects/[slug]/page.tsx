import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getPublishedProjects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function caseStudyProjects() {
  return getPublishedProjects().filter((project) => project.caseStudy);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudyProjects().find((item) => item.slug === slug);

  if (!project) notFound();

  const title = `${project.title} | Case Study | Yudi Runat Masneno`;

  return {
    title,
    description: project.summary,
    openGraph: {
      type: "article",
      siteName: "Yudi Runat Masneno",
      title,
      description: project.summary,
    },
    twitter: {
      card: "summary",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = caseStudyProjects().find((item) => item.slug === slug);

  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;

  return (
    <main id="main-content" className="pb-16 sm:pb-24">
      <Container>
        <nav aria-label="Case study navigation" className="pt-8 sm:pt-10">
          <Link
            href="/#work"
            className="inline-flex min-h-11 items-center rounded-md text-sm font-medium text-muted underline decoration-border underline-offset-8 hover:text-foreground hover:decoration-accent-blue"
          >
            Back to selected work
          </Link>
        </nav>

        <header className="grid gap-10 border-b border-border pb-14 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:gap-20">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
              Project case study
            </p>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
              {project.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-muted sm:text-xl">
              {project.summary}
            </p>
          </div>

          <div className="self-end border-t border-border pt-7 lg:border-t-0 lg:border-l lg:pb-1 lg:pl-8">
            <dl className="grid gap-6">
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  Role
                </dt>
                <dd className="mt-2 font-medium text-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  Status
                </dt>
                <dd className="mt-2 font-medium text-accent-blue">
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                  Stack
                </dt>
                <dd className="mt-2 leading-relaxed text-foreground">
                  {project.stack.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <p className="max-w-[75ch] py-8 text-sm leading-relaxed text-muted sm:py-10">
          Implementation details below are reported by the project owner. The
          separate backend repository has not been independently reviewed for
          this case study.
        </p>

        <CaseStudySection number="01" id="business-problem" title="Business Problem">
          <ScrollReveal>
            <p>{caseStudy.businessProblem}</p>
          </ScrollReveal>
        </CaseStudySection>

        <CaseStudySection
          number="02"
          id="role-responsibilities"
          title="Role & Responsibilities"
        >
          <ScrollReveal>
            <ul className="space-y-4">
              {caseStudy.responsibilities.map((item) => (
                <li key={item} className="border-l border-accent-blue/50 pl-5">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </CaseStudySection>

        <CaseStudySection number="03" id="system-architecture" title="System Architecture">
          <ScrollReveal>
            <ul className="space-y-5">
              {caseStudy.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </CaseStudySection>

        <CaseStudySection
          number="04"
          id="engineering-decisions"
          title="Engineering Decisions & Trade-offs"
        >
          <div className="space-y-8">
            {caseStudy.decisions.map((decision, index) => (
              <ScrollReveal key={decision.title} delay={index * 0.05}>
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {decision.title}
                </h3>
                <p className="mt-2">{decision.detail}</p>
              </ScrollReveal>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          number="05"
          id="failure-testing"
          title="Failure Handling & Testing"
        >
          <ScrollReveal>
            <ul className="space-y-5">
              {caseStudy.failureAndTesting.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </CaseStudySection>

        <CaseStudySection
          number="06"
          id="current-results"
          title="Current Results & Remaining Work"
        >
          {project.milestones?.length ? (
            <ol className="space-y-6">
              {project.milestones.map((milestone, index) => (
                <ScrollReveal as="li" key={milestone.title} delay={index * 0.05}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <span className="text-sm font-medium text-accent-blue">
                      {milestone.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1">{milestone.detail}</p>
                </ScrollReveal>
              ))}
            </ol>
          ) : (
            project.progress && (
              <ScrollReveal>
                <p>{project.progress}</p>
              </ScrollReveal>
            )
          )}
        </CaseStudySection>

        <div className="border-t border-border pt-8">
          <Link
            href="/#work"
            className="inline-flex min-h-11 items-center rounded-md font-medium text-foreground underline decoration-accent-blue underline-offset-8 hover:text-accent-blue"
          >
            Back to selected work
          </Link>
        </div>
      </Container>
    </main>
  );
}
