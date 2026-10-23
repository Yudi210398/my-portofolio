# Option 3 Design Specification (P-001 REVIEW PENDING)

## Visual reference
- Approved direction image: `assets/option-3-approved-visual-reference.png`. It guides composition and mood, not factual identity or project proof. Names and statistics in the generated mockup are placeholders.

## Direction
**Approved in P-000:** Option 3 Modern Gradient. Use a deep navy/ink background, restrained blue-violet gradients, and an abstract/laptop/geometric hero visual. English-first content, accurate claims, and the frontend-only architecture remain binding. Do not substitute an AI-generated human portrait for the owner's photograph.

## Proposed implementation tokens
These starter values are not separately approved brand constants. Check contrast and visual quality before adopting or adjusting them in the design-system task.

| Token | Starter value | Use |
|---|---|---|
| background | `#090E1C` | main canvas |
| surface | `#10192B` | sections and panels |
| border | `#26324C` | subtle outlines |
| text | `#F5F7FF` | primary copy and headings |
| muted | `#AFBAD1` | secondary copy; verify contrast |
| primary | `#6378FF` | primary CTA/links; verify contrast and focus |
| accent | `#8B5CF6` | restrained gradients |

Proposed typography: Geist with a system sans fallback. Use a restrained type hierarchy. Proposed layout: an 8px spacing rhythm, maximum content width near 1200px, moderate radii, and a two-column desktop hero that becomes one column on mobile. Adjust actual values during P-004/P-005 after responsive and contrast checks.

## Page hierarchy
Proposed Home order: Navbar -> Hero -> Work -> approved About/Approach content -> verified Tech Stack content -> approved Contact actions -> Footer. Work has a neutral empty state while no project is published; omit sections or actions that depend on missing facts or destinations. A case-study page exists only for an approved published project and renders verified fields, not a fixed template of unverified claims.

## Accessibility and interaction
Use readable body text, semantic landmarks, keyboard-visible focus, descriptive controls, and contrast checked on actual backgrounds. Keep touch targets usable at mobile widths. Motion is optional and must respect `prefers-reduced-motion`; avoid heavy parallax or animation that carries essential content. Lucide React is the icon choice where an icon helps comprehension.

## Impeccable workflow
Impeccable may guide frontend design review in its separately approved task; it is not installed by P-001 and cannot approve facts or override the brief. Use its findings as suggestions, then verify against the approved direction, accessibility criteria, and owner feedback.
