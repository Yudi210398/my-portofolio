# MVP Requirements (P-001 REVIEW PENDING)

The P-000 brief defines approved product facts and scope. `docs/content-policy.md` is the source of truth for project status, claims, assets, and link approval. These requirements describe intended behavior; the task and verification columns below are plans, not completed work.

## Functional requirements
- **FR-01 — Identity:** Home presents the approved public name, headline, and positioning in English. Additional About copy appears only after factual owner approval.
- **FR-02 — Navigation:** Navigation and CTAs point only to rendered sections, generated routes, or approved external destinations.
- **FR-03 — Work visibility:** Only `published` projects appear in public listings. With zero published projects, show a neutral empty state without project cards, counts, or invented work.
- **FR-04 — Case studies:** Generate `/projects/[slug]` only for approved published projects; render only verified fields and working approved links.
- **FR-05 — Contact:** Render each email or social action only when its real destination is approved. If none is available, omit contact actions and the contact section rather than presenting a dead end.
- **FR-06 — CV:** Render a download action only for an owner-supplied, approved public PDF.
- **FR-07 — Metadata:** Page titles, descriptions, and share metadata use only approved, accurate content.

## Non-functional requirements
- **NFR-01 — Responsive:** At 320, 360, 768, 1024, and 1440 px, content and navigation remain usable without unintended horizontal overflow.
- **NFR-02 — Accessibility:** Use semantic landmarks/headings, descriptive links and image text alternatives, keyboard operation, visible focus, and readable contrast.
- **NFR-03 — Motion:** Decorative motion is purposeful and respects `prefers-reduced-motion`; content remains available without animation.
- **NFR-04 — Static delivery:** `next build` produces a usable `out/` export with no runtime server, database, server actions, or unknown dynamic routes.
- **NFR-05 — Performance evidence:** Report measured Lighthouse results with device/network conditions; do not assert an unmeasured score.
- **NFR-06 — Visual direction:** Follow the approved Option 3 Modern Gradient mood and abstract/laptop/geometric hero; treat exact design tokens as proposed until reviewed.

## Acceptance criteria and traceability
| Criterion | Observable result | Owning task(s) | Planned verification |
| --- | --- | --- | --- |
| AC-01 · FR-01, FR-02 | Home shows approved identity; every visible navigation/CTA target exists. | P-005, P-006, P-009 | Content review and browser link check. |
| AC-02 · FR-03 | With zero published projects, Work shows a neutral empty state; candidate/draft cards and routes are absent. | P-007, P-008, P-014 | Test fixture with zero published projects; inspect rendered page and `out/`. |
| AC-03 · FR-03, FR-04 | Given one owner-approved published project, its static case study works; unpublished slugs do not resolve. | P-007, P-008, P-014 | After owner approval of project data, build and inspect generated routes/links. |
| AC-04 · FR-05, FR-06 | With current TODO destinations and CV, no contact or CV actions appear; each appears only after individual approval. | P-009, P-014 | Render checks for missing and approved data; link/PDF review. |
| AC-05 · FR-07 | Metadata and share preview contain only approved text and available assets. | P-009, P-013 | Inspect exported metadata and preview. |
| AC-06 · NFR-01, NFR-02 | Specified widths have no unintended overflow; keyboard, focus, semantics, and contrast pass review. | P-010, P-012 | Responsive browser checks and accessibility audit. |
| AC-07 · NFR-03 | Reduced-motion mode removes decorative movement without hiding content. | P-011, P-012 | Browser emulation of reduced-motion preference. |
| AC-08 · NFR-04, NFR-05 | Export builds and serves statically; measured performance is reported with test conditions. | P-002, P-008, P-012 | `next build`, serve `out/`, route smoke test, Lighthouse report. |
| AC-09 · NFR-06 | Desktop and mobile views follow Option 3 without fabricated factual content or an AI portrait presented as the owner. | P-004, P-005, P-011 | Visual review against the approved reference and owner feedback. |

Current project candidates and unresolved contact/CV data remain governed by the approved brief and content policy. Passing a fixture test never changes a project's publication status.
