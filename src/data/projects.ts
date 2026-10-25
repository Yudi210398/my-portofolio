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
        status: "pending",
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
    caseStudy: {
      businessProblem:
        "A tailoring business needs fitting reminders and order-completion notifications while retaining its existing PHP application.",
      responsibilities: [
        "Backend development of a separate, modular NestJS notification service.",
        "Core implementation of scheduled fitting reminders and an internal API for order notifications.",
        "Implementation of database-backed idempotency, notification logging, error handling, and safeguards against unsafe automatic retries.",
      ],
      architecture: [
        "The owner reports a modular NestJS backend written in TypeScript, with scheduled reminders and an internal notification API.",
        "MySQL, Prisma, Docker, and Fonnte API are part of the reported project stack; the service has read-only access to legacy business data.",
        "Integration with the existing PHP application has not been completed.",
      ],
      decisions: [
        {
          title: "Preserve the existing application",
          detail:
            "The notification backend is separate from the legacy PHP application. Access to legacy business data is read-only; application integration remains pending.",
        },
        {
          title: "Guard notification behavior",
          detail:
            "Database-backed idempotency and safeguards against unsafe automatic retries are part of the reported core implementation. Exact transaction and retry rules are not published.",
        },
      ],
      failureAndTesting: [
        "Notification logging and error handling are part of the reported backend implementation.",
        "Safeguards are in place against unsafe automatic retries; specific retry algorithms and failure outcomes are not claimed here.",
        "Local automated testing of the core backend is complete according to the owner. Test coverage and specific scenarios have not been independently reviewed for this portfolio.",
      ],
    },
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
