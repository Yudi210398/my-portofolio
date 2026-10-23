# AGENTS.md — Portfolio Repository Instructions

## Objective
Create and maintain an English-first Backend Engineer portfolio using the approved Option 3 design direction. Human developer owns product and architecture decisions; Codex accelerates implementation.

## Stack and constraints
- Next.js App Router + TypeScript + Tailwind CSS v4, `output: 'export'`.
- Static local content; no custom backend, database, ORM, authentication, CMS, or server actions.
- Motion only when visually justified; Lucide React is the approved icon choice. Impeccable is frontend design guidance, not an authority over product decisions or a test substitute.
- Respect existing styling, prefer semantic HTML and accessible components, avoid dependency sprawl.

## Sources of truth
- `docs/project-brief.md`: product truth and unresolved decisions.
- `docs/content-policy.md`: publication status, factual claims, and asset/link approval.
- `docs/requirements.md`: behavior, publication rules, acceptance criteria.
- `docs/design-spec.md`: chosen visual direction and design tokens.
- `docs/architecture.md` and `docs/adr/`: architecture and why.
- `tasks/P-XXX.md`: the currently approved scope, no work beyond it.

Approved direction is recorded in the P-000 brief. A PROPOSED implementation detail or ADR is not an additional owner decision. Keep one canonical rule per document and reference it elsewhere.

## Process for EVERY implementation task
1. Read this file, the specific task, and only the docs/code needed for that scope.
2. Inspect repo state before edits; summarize expected changed files and risks in <= 8 lines.
3. Implement only that task. Do not self-start the next task.
4. Run the relevant verification; distinguish PASS, FAIL, NOT RUN with evidence.
5. Report changed files, brief rationale, commands/results, remaining risks and next human decision.
6. Trace each MVP requirement to its owning task and a concrete verification method; do not claim a planned check has run.

## Safety / truthfulness
- Never invent personal facts, employer experience, awards, completion counts, screenshots, customer names or performance claims.
- Hide unapproved draft projects and missing CV/social links from public production.
- Never expose secrets, private data or client/production records. Never modify unrelated files.
- No commit, push, cloud deploy, external connection, hook approval, data deletion or paid resource creation without explicit human permission.
- Do not install dependencies or tooling outside the approved task scope. Major architecture, content-publication, or design-direction changes require owner approval.
- Never ignore a failing build/test merely to report success; label unverified behavior honestly.

## Quality bar
Correctness -> clarity -> accessible responsiveness -> measured performance -> deliberate visual polish. No unnecessary abstractions, nested card overload, gimmick parallax or gratuitous animation. Keep UI content-driven and static-export compatible.
