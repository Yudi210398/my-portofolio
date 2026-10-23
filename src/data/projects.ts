import type { Project, PublishedProject } from "@/types/project";

// Keep unapproved project details out of application data and exported assets.
export const projects: readonly Project[] = [
  {
    slug: "whatsapp-notification-service",
    title: "WhatsApp Notification Service",
    role: "Backend Developer",
    status: "in-progress",
    visibility: "published",
    summary:
      "A NestJS-based WhatsApp notification service for a tailoring business, designed to handle fitting reminders and order-completion notifications.",
    milestones: [
      {
        title: "Core Backend Implementation",
        status: "completed",
        detail: "Local automated testing completed.",
      },
      {
        title: "Legacy PHP Integration",
        status: "completed",
        detail:
          "Integration with the existing PHP application remains unfinished.",
      },
      {
        title: "Production Deployment",
        status: "pending",
        detail: "Not deployed to production.",
      },
    ],
    stack: ["NestJS", "TypeScript", "MySQL", "Prisma", "Fonnte API", "Docker"],
  },
];

const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getPublishedProjects(
  source: readonly Project[] = projects,
): PublishedProject[] {
  const published = source.filter(
    (project): project is PublishedProject =>
      project.visibility === "published",
  );
  const slugs = new Set<string>();

  for (const project of published) {
    if (!validSlug.test(project.slug) || slugs.has(project.slug)) {
      throw new Error(
        `Invalid or duplicate published project slug: ${project.slug}`,
      );
    }
    slugs.add(project.slug);

    for (const link of project.links ?? []) {
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        throw new Error(`Invalid project URL for ${project.slug}`);
      }
      if (url.protocol !== "https:" || !url.hostname || !link.label.trim()) {
        throw new Error(`Invalid project URL or label for ${project.slug}`);
      }
    }
  }

  return published;
}
