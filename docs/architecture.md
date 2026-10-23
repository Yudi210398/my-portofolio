# Architecture and Data Flow (P-001 REVIEW PENDING)

## Approved boundary
Visitor -> static host/CDN -> exported HTML, CSS, and JavaScript. Next.js App Router, TypeScript, Tailwind CSS v4, `output: 'export'`, and local content are approved in the P-000 brief. No runtime backend, database, authentication, CMS, or server actions. Hosting and deployment still require separate approval.

## Proposed implementation details
- Keep project and link content in local typed modules; exact file names and field shape are deferred to the relevant implementation task. Apply the `docs/content-policy.md` publication gate before generating listings, links, or routes.
- For `/projects/[slug]`, enumerate only published slugs at build time with the static-routing mechanism supported by the installed Next.js version. Verify the zero-published-project build and absence of candidate/draft output before relying on this route.
- Use Server Components by default; add Client Components only for interactions that need them. Keep display components separate from content selection and publication filtering.
- Use approved `mailto:` and external destinations only. Missing destinations produce no action; there is no API contact form.
- Choose static-compatible image handling during implementation. Supply useful alt text or mark decorative art as decorative; include image dimensions to limit layout shift. Do not assume runtime Next.js image optimization is available.

## Operational consequences
- Content changes require a new build and approved deployment. Unknown slugs, runtime cookies, ISR, and server-only features are outside the static boundary.
- A generated export must be checked as files served from `out/`, including zero-project behavior and all approved routes. See requirement AC-02, AC-03, and AC-08.
- Vercel is the documented hosting direction, not a prerequisite for local verification. Production deployment, rollback, and external connection require explicit owner approval.

Before application implementation, check the static-export guide for the exact installed Next.js version; version-specific routing and image constraints remain implementation details. The rationale and alternatives are in `docs/adr/001-static-export.md` (PROPOSED pending owner review).
