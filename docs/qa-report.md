# P-011 Motion Verification — 2026-10-24

## Scope and result

Verified the existing Option 03 Hero entrance and scroll reveals on the homepage and the published case study. No new library, layout change, or redesign was needed. One keyboard visibility issue was fixed in `src/components/sections/Hero.module.css`.

## Findings and fix

- **Fixed — Hero CTA focus during entrance.** On a fresh load, keyboard focus could reach “Explore my focus” while its parent animation still had opacity `0`. The CTA group now uses a 12px transform-only entrance with the existing 120ms delay and 420ms duration. In the exported page, the same immediate keyboard test showed the CTA focused with opacity `1` and a visible focus indicator. Final position, CTA destinations, and other Hero animation timings are unchanged.
- **No other motion defect confirmed.** Header, case study hero and metadata, Contact, and Footer are static. About reveals the introduction and identity groups; the engineering timeline reveals its introduction and four steps; Tech Stack reveals featured cards and category groups; Selected Work reveals its heading, project information, and milestones separately. The six case study sections reveal content groups in reading order. Scrolling away and back did not replay the inspected Work or case study reveals.
- **Impeccable targeted critique/audit:** The keyboard-hidden CTA was the actionable finding and was polished as above. The mechanical detector returned `[]` for the Hero motion CSS and shared ScrollReveal component. The approved blue-violet identity was preserved.

## Verification evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Responsive motion | PASS | Browser checks at 320, 360, 768, 1024, and 1440px on both pages: no horizontal overflow; Hero CTAs and all six case study sections present. |
| Hero entrance and focus | PASS | Browser measured headline 420ms, description +60ms, CTA group +120ms, image 500ms +160ms; header opacity stayed `1`. Focused CTA opacity changed from `0` before the fix to `1` after it. |
| Scroll reveal completion and replay | PASS (sampled) | All six case study sections showed in-progress opacity on entry; the visible final section reached opacity `1`. Inspected Work and final case study section remained visible on revisit. Case study document scroll height stayed 3339px while reveals ran at the tested viewport. |
| Keyboard access and links | PASS | Focused project link inside a reveal became fully visible; `#focus`, `#work`, and the published case study link resolved in the exported site. |
| Content without JavaScript | PASS (HTML inspection) | Main homepage, case study, and 404 content is present in exported HTML after removing scripts; no inline `opacity:0` found. Browser with JavaScript disabled was NOT RUN. |
| Reduced motion | PASS (source inspection), NOT RUN (browser emulation) | Hero CSS animations apply only under `prefers-reduced-motion: no-preference`; ScrollReveal uses `useReducedMotion` to reveal immediately. The available browser controls did not provide media preference emulation. |
| Layout shift/performance | PASS (scoped observation), NOT RUN (instrumented metrics) | Motion uses opacity and transforms; sampled case study scroll height remained constant. CLS, frame timing, and bundle impact were not instrumented. No dependency was added. |
| Lint / TypeScript / static build | PASS | `npm run lint`, `npx tsc --noEmit`, `npm run build`; export generated homepage, case study, and 404 routes. |

## Remaining checks

- Recheck reduced-motion behavior and JavaScript-disabled rendering in a browser that supports those modes before publication. Instrumented CLS and frame timing can be handled in the later performance/QA task if needed.
- Public contact and CV destinations remain unresolved in the approved product context; P-011 did not change them.

# P-012 E2E and performance verification — 2026-10-24

## Environment and method

- Windows; Node.js 24.13.0, npm 11.6.2, Chrome 155.0.8059.86; local production static export in `out/` served at `127.0.0.1:4173` by `tests/static-server.mjs`.
- Installed `@playwright/test` and `lighthouse` as approved development dependencies. Playwright used installed Chrome; no browser binary was downloaded. Lighthouse used its default mobile preset and `--preset=desktop`. Four final Lighthouse commands exited 0; JSON reports were written to the local temporary directory, outside the repository.
- Lighthouse results are single-run lab measurements with emulated conditions, not field data or deployment-host measurements. Earlier mobile homepage runs varied from 5.5 to 6.6 s LCP.

## Functional verification

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, static build | PASS | `npm run lint`, `npx tsc --noEmit`, `npm run build` exited 0. Export includes `out/index.html`, `out/404.html`, and `out/projects/whatsapp-notification-service.html`. |
| Playwright E2E | PASS | `npx playwright test --workers=1`: 12/12 passed against the exported site. Journey: homepage → `#work` → case study → `/#work` → `#contact`. |
| Responsive and navigation | PASS | Automated checks at 320, 360, 390, 768, 1024, 1280, and 1440px on homepage, case study, and 404: no document-level horizontal overflow; header/footer navigation visible. Internal path and fragment destinations resolved. |
| Keyboard and reduced motion | PASS | Hero CTA was reachable by Tab, had computed focus outline, and activated with Enter. With reduced motion, Hero headline CSS animation computed to `none`. |
| Content without JavaScript | PASS | Browser contexts with JavaScript disabled showed homepage heading, case study link, and case study heading. |
| Publication and 404 | PASS | Unknown route and candidate project slugs returned HTTP 404 with the custom 404 page. Exported homepage and case study HTML excluded Batik Management App and MIFO. Unapproved Contact actions are informational text, not live links. |

## Lighthouse final results

| Page / preset | Performance | Accessibility | Best Practices | SEO | LCP | CLS | FCP | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage / mobile | 77 | 100 | 100 | 100 | 6.62 s | 0.000 | 1.51 s | 52 ms |
| Homepage / desktop | 90 | 100 | 100 | 100 | 2.09 s | 0.000 | 0.33 s | 0 ms |
| Case study / mobile | 80 | 100 | 100 | 100 | 5.54 s | 0.000 | 1.05 s | 44 ms |
| Case study / desktop | 98 | 100 | 100 | 100 | 1.05 s | 0.000 | 0.29 s | 0 ms |

## Confirmed issue and fix

- Before: Lighthouse homepage accessibility 96; the small “In Progress” badge measured 4.21:1 text contrast against its surface, below the 4.5:1 criterion. Changed only its text color from the accent blue to the existing foreground token in `src/components/sections/ProjectCard.tsx`. After rebuild, homepage accessibility scored 100 on both presets; Playwright, lint, TypeScript, and static build all passed. The badge border/background and project status were not changed.

## Remaining risks

- Mobile lab LCP remains 5.54–6.62 s and mobile performance is 77–80. This is a performance follow-up before public launch; no image, font, or approved layout was changed without evidence of a specific safe fix. Recheck on the eventual preview host with repeated runs and real network conditions.
- Contact email, GitHub, LinkedIn, and owner-approved CV remain unavailable for public links. This limits publication readiness but does not create broken actions in the current preview.
- The local static server verifies exported files and 404 behavior; deployment-provider routing and caching remain unverified until preview deployment.

**P-012 status:** Functional and static-export checks PASS; suitable for owner preview review, with mobile LCP and approved contact/CV content still open before publication.
