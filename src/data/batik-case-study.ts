import type { CaseStudy } from "@/types/project";

export const batikCaseStudy: CaseStudy = {
  sourceNote:
    "This case study is based on project-owner reporting. The private repository and operational environment were outside the scope of the portfolio review.",
  engineeringShowcase: {
    subtitle: "Inventory Management & Supplier Traceability System",
    summary:
      "A full-stack inventory management and supplier traceability system built to manage stock movements, enforce FIFO allocation, and maintain transactional data integrity in daily business operations.",
    role: "Independent Full-Stack Developer · Backend Engineering Focus",
    lifecycle: "Deployed, in operational use, and under maintenance.",
    repository: "Private. Source code is available for review upon request, subject to owner approval.",
    closingSummary:
      "Batik App has completed its core development scope and is cloud-hosted for daily operational work. Its inventory management, FIFO allocation, supplier traceability, access control, and transactional integrity features are implemented.",
  },
  businessProblem:
    "Manual inventory records are vulnerable to entry errors and can diverge from physical stock. Incomplete stock-in and stock-out histories make movements harder to reconcile and supplier origins harder to trace. Repeated submissions can create duplicate transactions, while inconsistent validation and access controls can allow invalid or unauthorized operations. Batik App was built to improve record accuracy, transaction consistency, and day-to-day workflows for business owners, inventory administrators, warehouse staff, and operational staff.",
  responsibilities: [
    "Analyzed business requirements and designed the inventory rules, modular NestJS backend, relational data model, and database constraints.",
    "Implemented REST APIs, authentication, authorization, session management, FIFO allocation, supplier traceability, inventory transactions, and idempotency.",
    "Integrated the frontend with the API and handled testing, debugging, code review, version control, CI/CD, and cloud deployment.",
    "Used AI to accelerate implementation, testing, documentation, and technical evaluation. I retained responsibility for requirements, engineering decisions, verification, and system ownership.",
  ],
  architecture: [
    "The frontend uses Next.js, React, TypeScript, and Tailwind CSS to present inventory data and workflows, handle browser interactions, and call the REST API.",
    "The backend runs NestJS on Node.js with TypeScript. It enforces access controls and inventory rules, coordinates stock transactions, and documents its REST API with Swagger/OpenAPI.",
    "Prisma manages data access and queries against Neon-hosted PostgreSQL, which stores the application’s relational data.",
    "Authentication uses JWT access tokens, refresh token rotation, Argon2id password hashing, and HttpOnly cookies. RBAC controls permissions, and migration and runtime database access use separate privileges.",
    "Git and GitHub support version control, and GitHub Actions is part of the development workflow. The frontend and backend are hosted on Vercel, with PostgreSQL hosted on Neon.",
  ],
  decisions: [
    { title: "FIFO inventory allocation", detail: "Allocating older eligible stock first gives inventory movements a consistent order and supports traceability. This requires more business logic than updating an aggregate quantity." },
    { title: "Supplier traceability", detail: "Retaining the relationship between supplier origins and stock movements supports later reconciliation. It requires keeping additional history and preserving those relationships over time." },
    { title: "Database transactions", detail: "Related inventory changes can commit together or roll back together. Atomicity depends on choosing appropriate transaction boundaries, and concurrent operations still require separate consideration." },
    { title: "Idempotency", detail: "Recognizing repeated operations reduces the chance that retries or repeated submissions create duplicate transactions. It requires reliable operation identification and state management." },
    { title: "Stock validation", detail: "Outgoing inventory must never exceed available stock. The backend enforces that rule at the point where it accepts a movement, which adds validation to the transaction workflow." },
    { title: "Authentication and authorization", detail: "Identity verification establishes who is making a request. RBAC separately determines which actions they can perform, which requires maintaining and testing an explicit set of permissions." },
    { title: "Least-privilege database access", detail: "Migration and runtime responsibilities use separate database privileges. This limits runtime access and requires managing distinct permissions across deployment workflows." },
    { title: "Modular backend architecture", detail: "Separating business responsibilities in NestJS makes them easier to maintain and test. The module boundaries and the dependencies between them still need to be kept clear." },
  ],
  failureAndTesting: [
    "Stock validation rejects outgoing movements when inventory is insufficient. Idempotency reduces duplicate transaction risk, while atomic transactions protect related stock updates from partial writes.",
    "Authentication, RBAC, and refresh token rotation protect access and session workflows. Transaction history and audit logs support review and reconciliation when operational questions arise.",
    "The owner reports unit, integration, end-to-end, and frontend testing. GitHub Actions is part of the development workflow.",
  ],
  results: [
    "Core development is complete. The owner uses the cloud-hosted application for operational work, with ongoing evaluation and maintenance. The application link uses a staging URL.",
    "Implemented capabilities include authentication and RBAC, master data management, incoming and outgoing inventory, FIFO allocation, supplier traceability, and stock validation.",
    "The project also includes idempotency, database transactions, transaction history and audit logs, a responsive frontend, Swagger API documentation, automated testing, and cloud deployment.",
  ],
};
