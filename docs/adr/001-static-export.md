# ADR-001: Static export for the portfolio

- **Status:** ACCEPTED — final owner acceptance granted after P-001 review.
- **Context:** The public portfolio serves locally maintained content. The MVP has no approved need for runtime data, accounts, form persistence, or editorial backend.
- **Decision recorded from P-000:** Next.js App Router, TypeScript, Tailwind CSS v4, `output: 'export'`, and local content. Produce static assets for a static-capable host; do not add a runtime backend, database, authentication, CMS, or server actions.
- **Why:** Static delivery fits a small, content-led portfolio and keeps operations simple. It allows pre-rendered pages and avoids a server solely for content that changes through reviewed builds.
- **Alternatives considered:** Astro could serve content-first pages with less client JavaScript but changes the approved stack. React + Vite would require more decisions for pre-rendered route output. A full Next.js server adds operations and features the MVP does not need.
- **Consequences:** Updates require a build and approved deployment. Case-study slugs must be known at build time; candidate/draft work must be excluded, including when no project is published. Runtime cookies, ISR, server actions, and default server image optimization are unavailable under static export. Version-specific routing and image choices need validation during implementation.
- **Revisit when:** The owner approves requirements for live content, authentication, server-side submissions, or CMS workflows. Any major architecture change requires explicit approval.
