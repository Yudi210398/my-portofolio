# Deployment Runbook (DRAFT)

1. Owner confirms repository/domain/hosting permissions.
2. Install exact locked dependencies, run lint, typecheck, E2E smoke, production build.
3. Inspect `out/`, static slug pages and all assets; ensure draft projects are not exposed.
4. Trigger Vercel preview deployment only with approval, verify URLs/nav/resume/contact on mobile & desktop.
5. Publish to production with approval; record commit hash, release timestamp and deployment URL.
6. If broken, rollback to previous known-good static deployment; restore content in repository and rebuild.
7. Retest and record incident cause/fix.
