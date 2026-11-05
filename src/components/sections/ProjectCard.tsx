import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { technologyLogos } from "@/data/technology-logos";
import type { PublishedProject } from "@/types/project";

type ProjectCardProps = {
  project: PublishedProject;
};

function CakeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M4 13h16v8H4zM7 13V9h10v4M12 9V6M12 2c-2 2-2 3 0 4 2-1 2-2 0-4Z" />
      <path d="M4 16c2 2 3-2 5 0s3-2 5 0 4-2 6 0" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M5 4.5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-15a2 2 0 0 1 1-2Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function MilestoneIcon({ completed }: { completed: boolean }) {
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
      <circle cx="12" cy="12" r="9" />
      {completed && <path d="m8.5 12 2.5 2.5 4.5-5" />}
    </svg>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasProgress = Boolean(project.milestones?.length || project.progress);
  const isDinaCake = project.slug === "dina-cake";
  const statusLabels = {
    "in-progress": "In Progress",
    "pre-release": "Pre-release",
    completed: "Completed",
  };

  return (
    <article
      className={`h-full rounded-2xl border border-border bg-surface p-5 sm:p-8 lg:p-10 ${isDinaCake ? "bg-linear-to-br from-accent-blue/5 via-surface to-background/30" : ""}`}
    >
      {project.thumbnail && (
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={project.thumbnail.width}
          height={project.thumbnail.height}
          unoptimized
          className="mb-8 h-auto w-full rounded-md"
        />
      )}
      <div
        className={
          hasProgress
            ? "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10"
            : "grid"
        }
      >
        <ScrollReveal className="min-w-0">
          <div className="flex flex-wrap items-center gap-4">
            <span
              aria-hidden="true"
              className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background/60 ${isDinaCake ? "text-amber-300" : "text-accent-blue"}`}
            >
              {isDinaCake ? <CakeIcon /> : <MessageIcon />}
            </span>
            <p className="text-sm font-medium text-muted">{project.role}</p>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${isDinaCake ? "border-amber-400/50 bg-amber-400/10 text-amber-200" : "border-accent-blue/40 bg-accent-blue/10 text-foreground"}`}
            >
              {statusLabels[project.status]}
            </span>
          </div>
          <h3 className="mt-7 max-w-[22ch] text-3xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>
          <ul
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Technology stack"
          >
            {project.stack.map((technology) => {
              const logo = technologyLogos[technology];

              return (
                <li
                  key={technology}
                  className={`inline-flex min-h-9 items-center gap-2 border border-border bg-background/60 px-3 py-1.5 text-sm font-medium text-foreground ${isDinaCake ? "rounded-full" : "rounded-md"}`}
                >
                  {logo && (
                    <Image
                      src={logo}
                      alt=""
                      width={18}
                      height={18}
                      unoptimized
                      className="h-[18px] w-[18px] object-contain"
                    />
                  )}
                  {technology}
                </li>
              );
            })}
          </ul>
          {project.caseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="mt-8 inline-flex min-h-11 items-center rounded-md border border-accent-blue/50 px-5 py-2 font-medium text-foreground hover:border-accent-blue hover:bg-accent-blue/10"
            >
              View Case Study
            </Link>
          )}
          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-medium text-foreground underline decoration-accent-blue underline-offset-4 hover:text-accent-blue"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </ScrollReveal>
        {hasProgress && (
          <div className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <ScrollReveal>
              <h4 className="text-sm font-semibold tracking-[0.08em] text-foreground uppercase">
                Project progress
              </h4>
            </ScrollReveal>
            {project.milestones?.length ? (
              <ol className="mt-7 space-y-7">
                {project.milestones.map((milestone, index) => {
                  const completed = milestone.status === "completed";

                  return (
                    <ScrollReveal
                      as="li"
                      key={milestone.title}
                      className="flex gap-3"
                      delay={index * 0.05}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${completed ? "border-accent-blue/50 text-accent-blue" : "border-border text-muted"}`}
                      >
                        <MilestoneIcon completed={completed} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug text-foreground">
                          {milestone.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {milestone.statusLabel ??
                            (completed ? "Completed" : "Pending")}{" "}
                          — {milestone.detail}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </ol>
            ) : (
              <ScrollReveal>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {project.progress}
                </p>
              </ScrollReveal>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
