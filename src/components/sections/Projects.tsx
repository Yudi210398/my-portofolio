import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getPublishedProjects } from "@/data/projects";

export function Projects() {
  const publishedProjects = getPublishedProjects();

  return (
    <Section
      id="work"
      aria-labelledby="work-title"
      className="border-t border-border"
    >
      <Container>
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase sm:text-sm">
            04 / Selected work
          </p>
          <h2
            id="work-title"
            className="mt-7 text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Selected work.
          </h2>
        </ScrollReveal>
        {publishedProjects.length === 0 ? (
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">
            No projects are approved for publication yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6">
            {publishedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
