# Dina Cake case study — P-008 extension

Approved scope: the owner's pasted implementation brief, 2026-11-05. Implement inline on `feature/p-008`; preserve existing local work. No packages, commit, push, deployment, or homepage redesign.

## Implementation

1. Add focused static-export browser tests in `tests/dina-cake-case-study.spec.ts`; update obsolete Dina 404/hidden-CTA expectations in `tests/project-carousel.spec.ts`. First demonstrate the missing route/CTA failure against a baseline build.
2. Extend `CaseStudy` in `src/types/project.ts` only with optional presentation and engineering-content fields. Populate the existing Dina entry in `src/data/projects.ts` with owner-provided facts, completed WhatsApp milestone, and pending release work. Preserve WhatsApp data.
3. Add `CatalogCaseStudyIntro.tsx` and its CSS module: two-column hero with the owner-approved native catalog-to-confirmation diagram, four manual ordering steps, overview, compact technology/testing strip. Reuse the current route, shared numbered sections, header/footer, tokens and local technology logos. Add a native HTML architecture flow to the shared route.
4. Build and test the generated `out/` using the installed Playwright/Edge setup. Review desktop against `design.png` and mobile captures. Fix scoped issues and report evidence and unavailable assets.

## Requirements and verification

| Owning scope | Requirements | Evidence |
| --- | --- | --- |
| P-008 / FR-02, FR-04, FR-07, AC-03, AC-05, AC-08 | Dina route, static generation, CTA, direct load, refresh, back link, metadata, existing WhatsApp route, unknown-slug 404 | Build output and focused route/navigation tests |
| P-008 / NFR-01–03, AC-06–07 | Seven widths, heading hierarchy, existing logo loading, keyboard focus, reduced motion, no-JS content | Focused Playwright tests and desktop/mobile captures |
| P-008 / NFR-06, AC-09 | Dark navy, approved composition, genuine assets, truthful status and six engineering sections | Visual comparison and content/status assertions |

## Review focus

- Source screenshots are missing: `assets/work-selected-design/dina-cake-design/ss-kue/` does not exist. Owner follow-up explicitly approves a native HTML/CSS adaptation without product screenshots; do not request files again or substitute the design comp for evidence. A second search of assets/public and repository preview references found no authentic screenshots or recorded preview URL.
- Existing carousel tests intentionally expect no Dina CTA and a 404; update them to the new approved behavior.
- Pre-release must never fall through to Completed. Completed WhatsApp contact is not automated ordering or production release.
- Keep all essential content in exported HTML; use genuine existing technology logos and no substitute product screenshots.
- Do not alter pre-existing `next-env.d.ts` changes or the untracked design reference.

## Verification status

All checks below ran locally on the generated static export, 2026-11-05.

| Check | Result | Evidence |
| --- | --- | --- |
| Baseline failing route test | Expected RED | `npx playwright test tests/dina-cake-case-study.spec.ts --grep 'direct export' --workers=1`: expected 200, received 404 before implementation. |
| Lint | PASS | `npm run lint`, exit 0. |
| Typecheck | PASS | `npx tsc --noEmit`, exit 0, including after restoring the workspace's development type references in generated `next-env.d.ts`. |
| Static build | PASS | `npm run build`, exit 0; output enumerates both Dina Cake and WhatsApp case-study routes. |
| Playwright | PASS | `npx playwright test --workers=2`: 43 passed, 34.0s on final run. Served from `out/` through the existing `tests/static-server.mjs` on port 4173. |
| Focused acceptance | PASS | Real CTA click, keyboard Tab/focus, direct navigation, refresh, return link, truthful statuses, six sections, 404, original WhatsApp route, seven widths, loaded logos, no-JS and reduced-motion content. |
| Visual review | PASS with approved adaptation | Compared desktop hero/flow at 1672×941 to `design.png`; inspected mobile at 390px and 320px. No critical clipping or horizontal overflow found. Separate reviewer disposition: SHIP, no P0/P1/P2. |
| Mechanical design detector | PASS | Ran once on changed UI targets: output `[]`. |
| Diff whitespace | PASS | `git diff --check`, exit 0. |
| Product screenshot loading/aspect ratios | NOT RUN / superseded | No original product screenshots or recorded preview URL exist locally. Owner approved native HTML/CSS adaptation; only existing local technology images are used. |

Validated visual evidence: `.impeccable/review/dina-cake/desktop-viewport.png`, `desktop-flow.png`, `mobile.png`, `mobile-flow.png`, `mobile-results.png`, `mobile-milestones.png`, and `mobile-320.png`. `desktop.png` is a duplicate of the validated desktop viewport capture.

The existing navy/Geist system, header/footer, and global files have no changes. Read-only documentation review recorded pre-existing drift: PRODUCT.md still lists one approved project, and design-spec.md still labels implemented tokens as proposed. These were left unchanged because this task does not authorize broader documentation reconciliation.

No dependencies installed, no phone numbers or new external destinations published, and no commit, push, or deployment performed. The initial design reference remains untouched; `next-env.d.ts` retains development type references after build regeneration.

## Changed files

- `src/app/projects/[slug]/page.tsx`: catalog presentation, optional architecture flow/results/remaining-work content, correct pre-release label; existing shared six sections retained.
- `src/types/project.ts`: optional typed presentation and engineering fields.
- `src/data/projects.ts`: complete approved Dina Cake case study and current contact milestone detail; WhatsApp project content unchanged.
- `src/components/case-study/CatalogCaseStudyIntro.tsx` and `.module.css`: responsive native hero diagram, manual ordering cards/connectors, overview and technology/testing panels.
- `src/data/technology-logos.ts` and `src/components/sections/ProjectCard.tsx`: extract the existing unchanged logo mapping for shared reuse; the existing caseStudy gate activates Dina's CTA.
- `tests/dina-cake-case-study.spec.ts`: new focused export/browser coverage.
- `tests/project-carousel.spec.ts`: update Dina's expected CTA and route response.
- This plan/report and `.impeccable/review/dina-cake/*.png`: traceability and visual evidence.

Final Git state: `feature/p-008`, uncommitted. Pre-existing `next-env.d.ts` modification and untracked `assets/work-selected-design/dina-cake-design/Project-case-study/` reference remain present. No branch, index, commit, remote, or deployment changes were made.
