# Test Plan and Release Gates

## Focus
- Home render/nav/contact links, no fake controls, no broken CV links
- Project cards for 0, 1, >=3 published projects; draft hidden
- Case study static paths under /projects/[slug], missing slug => not published
- 320/360/768/1024/1440 viewport screenshots, text overflow, keyboard focus, mobile nav
- prefers-reduced-motion, contrast, semantic headings, accessible alt
- npm lint/typecheck/build; output `out/` exists; browser smoke and Lighthouse with recorded device/config

## Gate: ready to delegate
Scope and AC clear, docs approved, known unknowns enumerated, no surprise paid actions.

## Gate: ready to accept
Changed files reviewed, actual lint/tests/build evidence, relevant screenshots, docs updated, regressions assessed.

## Gate: ready to publish
All public facts verified, PII removed, intended URL/domain set, production smoke test, rollback plan, explicit approval.

Important: performance/a11y detector scores are useful signals, not complete evidence.
