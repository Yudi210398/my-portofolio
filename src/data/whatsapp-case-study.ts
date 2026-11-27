import type { CaseStudyArticle } from "@/types/project";

export const whatsappCaseStudy: CaseStudyArticle = {
  subtitle: "Legacy System Integration & Business Process Automation",
  projectType: "Business Automation",
  statusLabel: "Core Development Completed",
  stack: ["NestJS", "TypeScript", "Node.js", "MySQL", "Prisma", "Docker", "Jest", "Fonnte API"],
  sourceNote: "Implementation and local validation details were provided by the project owner.",
  sections: [
    {
      id: "project-overview",
      title: "Project Overview",
      blocks: [{
        paragraphs: [
          "A standalone backend notification service designed to automate customer communication for a tailoring business. It supports scheduled fitting reminders and order-completion notifications through WhatsApp while preserving the existing PHP application and MySQL database.",
          "The engineering focus was reliable notification processing, legacy system integration, data integrity, and duplicate prevention.",
        ],
      }],
    },
    {
      id: "business-problem",
      title: "Business Problem",
      blocks: [{
        paragraphs: [
          "Staff manually contacted customers about fitting appointments and completed orders. This took staff time and introduced the risk of missed or repeated notifications.",
          "The goal was to automate those workflows while keeping the existing application and business data in place.",
        ],
      }],
    },
    {
      id: "requirements-constraints",
      title: "Requirements & Constraints",
      blocks: [{
        points: [
          "Send fitting reminders on the scheduled fitting date within approved business hours.",
          "Notify customers when their clothing orders are completed.",
          "Prevent duplicate notifications for the same business event.",
          "Skip customers without phone numbers.",
          "Keep the existing MySQL database as the source of truth.",
          "Maintain read-only access to legacy business tables.",
          "Record notification outcomes for troubleshooting.",
          "Provide a protected internal API for integration with the existing PHP application.",
        ],
      }],
    },
    {
      id: "system-architecture",
      title: "System Architecture",
      blocks: [
        { paragraphs: ["The modular NestJS service separates triggers, business logic, data access, notification delivery, and provider communication."] },
        { title: "Trigger Layer", paragraphs: ["A scheduled task detects eligible fittings. A protected HTTP endpoint provides an integration point for order-completion events from the existing PHP application."] },
        { title: "Business Logic Layer", paragraphs: ["NotificationService validates fitting dates, order statuses, customer information, and notification eligibility."] },
        { title: "Data Access Layer", paragraphs: ["LegacyReadRepository retrieves customer, order, fitting, and clothing category records from MySQL."] },
        { title: "Delivery Layer", paragraphs: ["NotificationDeliveryService coordinates duplicate prevention, provider communication, and notification status persistence."] },
        { title: "External Integration Layer", paragraphs: ["FonnteWhatsappService handles communication with the WhatsApp notification provider."] },
      ],
    },
    {
      id: "engineering-decisions",
      title: "Key Engineering Decisions",
      blocks: [
        { title: "Preserving the Legacy System", paragraphs: ["NestJS runs as a separate service alongside the existing PHP application. This reduced the integration scope and kept customer and order data in the existing database."] },
        {
          title: "Database-Backed Idempotency",
          paragraphs: ["The service atomically claims a unique business event key in MySQL before calling the provider. A database unique constraint prevents concurrent requests from starting multiple automatic sends for the same key."],
          points: ["FITTING:<fittingId> identifies a fitting reminder.", "ORDER_READY:<orderId> identifies an order-completion notification."],
        },
        {
          title: "Failure Handling",
          points: [
            "PENDING — The service has claimed the notification identity.",
            "SENT — The provider accepted the request.",
            "FAILED — The provider explicitly rejected the request.",
            "SKIPPED — The service intentionally skipped processing.",
            "AMBIGUOUS — The provider outcome could not be confirmed.",
          ],
        },
        { paragraphs: ["Uncertain outcomes require manual reconciliation. The original request may already have been accepted, so the service avoids automatic retries in these cases and prioritizes duplicate prevention over guaranteed delivery."] },
        { title: "Avoiding Unnecessary Complexity", paragraphs: ["MySQL-backed tracking and NestJS scheduling met the project's needs without Redis, message brokers, distributed queues, or additional microservices."] },
      ],
    },
    {
      id: "technical-challenges",
      title: "Technical Challenges",
      blocks: [
        { title: "Concurrent Notification Requests", paragraphs: ["Requests or scheduler instances can process the same event at once. Atomic claims and a unique constraint prevent duplicate automatic sends for that event."] },
        { title: "Legacy Database Integration", paragraphs: ["Explicit repository queries retrieve the necessary records while keeping legacy business tables read-only and preserving the schema."] },
        { title: "External API Uncertainty", paragraphs: ["A timeout or network interruption can occur after provider acceptance. Recording ambiguous outcomes separately avoids unsafe retries."] },
        { title: "Time-Based Business Rules", paragraphs: ["Fitting reminders use the Asia/Jakarta timezone, the current fitting date, approved business hours, and restart catch-up behavior."] },
      ],
    },
    {
      id: "failure-testing",
      title: "Testing & Validation",
      blocks: [
        {
          paragraphs: ["The latest recorded local verification run reported 176 automated tests passed and zero failures."],
          points: ["154 Jest tests passed.", "8 legacy repository mock tests passed.", "14 real MySQL integration tests passed."],
        },
        {
          paragraphs: [
            "The suites covered notification eligibility, duplicate prevention, concurrent database claims, scheduler behavior, internal API authentication, provider failures, and database access permissions.",
            "The integration suite exercised a real MySQL instance. The automated suites mocked external provider communication. Separate controlled local smoke tests verified live Fonnte communication and Docker operation.",
          ],
        },
      ],
    },
    {
      id: "current-results",
      title: "Project Outcomes",
      blocks: [
        {
          points: [
            "Implemented fitting reminders and order-completion notifications.",
            "Established MySQL-backed idempotency, notification status tracking, and failure handling.",
            "Prepared a protected internal API for PHP integration and preserved read-only access to legacy business data.",
            "Completed Docker packaging and local verification.",
          ],
        },
        {
          paragraphs: [
            "Core backend development was completed and locally validated. Production rollout was not pursued due to business considerations.",
            "Live PHP event integration, production environment validation, and remaining pre-production hardening were not completed.",
          ],
        },
      ],
    },
    {
      id: "lessons-learned",
      title: "Lessons Learned",
      blocks: [{
        paragraphs: [
          "Understanding business requirements early helped keep the architecture focused on data integrity and realistic failure cases.",
          "Passing automated tests establishes evidence about the cases exercised. Production readiness also requires validation in the intended environment.",
          "Business correctness, maintainability, and reliability were the criteria for choosing the simplest architecture that met the project's needs.",
        ],
      }],
    },
  ],
};
