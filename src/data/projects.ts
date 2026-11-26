import type { Project, PublishedProject } from "@/types/project";
import { batikCaseStudy } from "@/data/batik-case-study";

// Keep unapproved project details out of application data and exported assets.
export const projects: readonly Project[] = [
  {
    slug: "batik-app",
    title: "Batik App",
    role: "Full-Stack Developer · Backend Focus",
    status: "completed",
    visibility: "published",
    summary:
      "An inventory management and supplier traceability system used in daily business operations, featuring FIFO stock allocation, secure access control, and transactional data integrity.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Next.js", "React"],
    milestones: [
      {
        title: "Core Inventory & Supplier Traceability",
        status: "completed",
        detail: "FIFO allocation, stock management, and supplier tracking.",
      },
      {
        title: "Security & Data Integrity",
        status: "completed",
        detail: "Authentication, RBAC, idempotency, and transactional consistency.",
      },
      {
        title: "Deployment & Operational Use",
        status: "completed",
        detail: "Cloud-hosted and used in daily business operations.",
      },
    ],
    links: [
      { label: "View Application", href: "https://batik-web-staging.vercel.app" },
    ],
    caseStudy: batikCaseStudy,
  },
  {
    slug: "dina-cake",
    title: "Dina Cake",
    role: "Frontend & Product Engineering",
    status: "pre-release",
    visibility: "published",
    summary:
      "A mobile-first website for a homemade cake business, showcasing product catalogs, explaining the ordering process, and connecting customers via WhatsApp.",
    stack: ["HTML5", "CSS3", "JavaScript", "Playwright"],
    milestones: [
      {
        title: "Static Website & Catalog",
        status: "completed",
        statusLabel: "Implemented",
        detail:
          "Landing page, cake catalog, ordering steps, and responsive UI.",
      },
      {
        title: "WhatsApp Contact Integration",
        status: "completed",
        statusLabel: "Implemented",
        detail: "WhatsApp contact integration implemented by the owner. Order confirmation remains manual.",
      },
      {
        title: "Final QA & Production Release",
        status: "pending",
        detail:
          "Asset optimization, final testing (accessibility, SEO, performance), and go-live approval.",
      },
    ],
    caseStudy: {
      sourceNote:
        "Project details and preliminary QA are reported by the project owner. Dina Cake remains pre-release; these checks are not final production certification.",
      catalogShowcase: {
        subtitle: "A Digital Catalog for a Home-Based Cake Business",
        summary:
          "A mobile-first catalog website that helps customers explore homemade cakes, understand the ordering process, and contact Mama Dina through WhatsApp.",
        projectType: "Real-world Small Business Website",
        ownershipRole: "Solo Developer / Product & Technical Decision Owner",
        architecture: "Static Single-Page Website",
        steps: [
          { title: "Contact Mama Dina", description: "Customers initiate contact through WhatsApp." },
          { title: "Share Product Preferences", description: "Customers share cake types, quantities, and their preferred date." },
          { title: "Confirm Availability & Schedule", description: "Mama Dina manually confirms availability, order details, and scheduling." },
          { title: "Order Preparation", description: "Products are prepared according to the confirmed arrangement." },
        ],
      },
      businessProblem:
        "Dina Cake relied primarily on word-of-mouth promotion, local shop consignments, and WhatsApp communication. Without a centralized digital catalog, customers could need to contact the owner just to discover available products. The MVP makes homemade cakes easier to discover and explains how to initiate an order, while keeping business confirmation with Mama Dina.",
      responsibilities: [
        "Understand the business problem, define the MVP scope, and choose an implementation architecture suited to a small business catalog.",
        "Lead visual and responsive design decisions, and specify requirements and acceptance criteria.",
        "Use Codex to accelerate implementation, then review code and visual output. The human owner owns product and technical decisions; implementation is AI-assisted.",
        "Run and review browser tests, manage Git and preview workflows, and evaluate release readiness.",
      ],
      architectureFlow: [
        "Browser", "Static hosting", "HTML / CSS / JavaScript / local assets",
        "Catalog & client-side interactions", "External WhatsApp contact", "Manual business confirmation",
      ],
      architecture: [
        "Dina Cake is a static single-page website. It has no application backend, database, or customer authentication, and stores no customer order data in the website.",
        "Product data is managed through repository content. Content updates require editing that content and publishing a new static version.",
        "Client-side JavaScript handles navigation and UI interactions. Customers leave the catalog to contact Mama Dina through WhatsApp; availability, scheduling, and order confirmation remain manual.",
      ],
      decisions: [
        {
          title: "Vanilla HTML/CSS/JavaScript instead of Next.js",
          detail: "The Dina Cake MVP does not need SSR, complex routing, or application-level server logic. A static implementation keeps delivery simple. The trade-off is more manual maintenance for content updates and component reuse. This portfolio uses Next.js; the Dina Cake project itself does not.",
        },
        {
          title: "No backend or database",
          detail: "WhatsApp supports the existing manual ordering process. Keeping it outside the website avoids unnecessary infrastructure, with no automated order persistence, realtime stock management, checkout, online payments, or transaction processing.",
        },
        {
          title: "Native browser capabilities",
          detail: "CSS transitions, anchor navigation, and IntersectionObserver support navigation and UI behavior where appropriate. This gives up advanced animation control in exchange for fewer dependencies.",
        },
        {
          title: "Responsive and accessible design",
          detail: "Mobile-first layouts, keyboard navigation, visible focus, and reduced-motion support make the catalog usable across devices. Essential content remains visible without JavaScript; final accessibility review is still part of release preparation.",
        },
        {
          title: "AI-assisted implementation, human ownership",
          detail: "Codex accelerates implementation. The human owner defines requirements, reviews code and visual output, runs and reviews tests, and owns product, architecture, and release decisions.",
        },
      ],
      failureAndTesting: [
        "Owner-reported preliminary Playwright browser testing covered seven viewport widths: 320, 360, 390, 768, 1024, 1280, and 1440px.",
        "Preliminary QA covered mobile navigation, scrollspy and anchor behavior, horizontal overflow, keyboard navigation and focus, reduced motion, and no-JavaScript content visibility.",
        "Availability and scheduling are confirmed manually through WhatsApp. The catalog does not accept an order or guarantee stock; contacting Mama Dina starts a conversation rather than an automatic confirmation.",
        "Accessibility review and SEO and performance checks are preliminary. Image optimization and final accessibility, SEO, and performance reviews remain part of release preparation, alongside full regression and UAT.",
        "These checks describe development and preliminary QA, not final production certification. No numerical test coverage, Lighthouse score, or measured performance improvement is claimed.",
      ],
      results: [
        "A working static website prototype exists, with the product catalog and primary content sections implemented.",
        "Responsive navigation and UI interactions have been developed; preliminary browser testing has been performed and a preview version has been available.",
        "WhatsApp contact integration is implemented. Availability, scheduling, and order confirmation remain manual; no automatic order confirmation is provided.",
        "No verified sales growth, conversion uplift, or customer-growth metrics are available. Overall project status: pre-release.",
      ],
      remainingWork: [
        "Pesanan Acara — Draft / Pending Approval: business requirements and content are not final.",
        "Final product image and information approval.",
        "Image asset optimization.",
        "Final accessibility, SEO, and performance reviews.",
        "Full regression and UAT.",
        "Production hosting and release approval.",
      ],
    },
  },
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
