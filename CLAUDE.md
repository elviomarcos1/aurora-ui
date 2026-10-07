# Aurora UI — project context

Portfolio project by Elvio Marcos Faria Junior (frontend engineer, Angular + TypeScript + UI/UX), built to apply for frontend roles in Europe, the US and Canada.

**Aurora Hospital is a fictional brand.** It is inspired by real-time hospital dashboards Elvio designed and built at a hospital in Brazil. Never use real hospital names, logos or patient data. All data is invented.

## Language

- Talk to Elvio in **Brazilian Portuguese**.
- Write code, comments, JSDoc, commit messages, PR descriptions, README and UI copy in **English**.
- Elvio is improving his English: when you write English text for him (README, PR, commit), keep it simple and clear.

## What we are building

1. `projects/aurora-ui`: an Angular component library, published to npm (e.g. `@aurora-hospital/ui`).
2. Storybook: public docs for every component, with the a11y addon.
3. `projects/showcase`: a showcase site with a live theme playground, a demo hospital dashboard and a case study page.

Full plan with phases and tasks: `docs/PLAN.md`. Before starting work, check which phase/task Elvio wants and follow that phase.

## Source of truth for design

- Tokens: `design/tokens/` (DTCG format — `base.json`, `light.json`, `dark.json`). Generate CSS variables from it with `npm run tokens`; never hard-code colors.
- Brand book (principles, voice, color meaning, typography, iconography): `docs/design-system/README.md`
- Component specs: `docs/design-system/components/<Name>.md`
- Visual reference markup: `docs/design-system/components/<Name>.preview.html` + `docs/design-system/reference.css` (class prefix `au-`). These are HTML/CSS references, not Angular code: port their look and behavior faithfully into Angular components.
- Icons: Lucide via `lucide-angular`. Curated set in `docs/design-system/icons.txt`. Status icons are reserved: `triangle-alert` critical, `circle-alert` observation, `circle-check` stable, `info` info.
- Fonts (Google Fonts): Bricolage Grotesque (display), Figtree (text), IBM Plex Mono (numbers, with `font-variant-numeric: tabular-nums`).

## Tech stack

- Angular (current stable), standalone components only, no NgModules.
- Signals: `input()`, `output()`, `model()`, `computed()`. `ChangeDetectionStrategy.OnPush` everywhere.
- New control flow (`@if`, `@for` with `track`).
- SCSS per component, using token CSS variables only.
- Reactive Forms; form controls implement `ControlValueAccessor`.
- Jest + Angular Testing Library for tests.
- Storybook with `@storybook/addon-a11y`.
- ESLint + Prettier. GitHub Actions runs lint, test and build.

## Definition of Done (every component)

1. Standalone, OnPush, signal inputs/outputs, selector prefix `au-` (e.g. `<au-button>`).
2. Styles from tokens only. Works in light and dark theme (`data-theme` on `<html>`).
3. Jest tests: variants, states, keyboard interaction, accessible names.
4. Storybook story with every variant and both themes.
5. Zero a11y addon violations. Visible focus ring (`--focus-ring`, 2px, offset 2px). Color is never the only signal of state.
6. JSDoc in English on public inputs/outputs.
7. Exported from the library's `public-api.ts`.

## Conventions

- Conventional Commits: `feat(button): add danger variant`, `test(status-pill): cover keyboard focus`.
- One branch + one PR per task; nothing merges to `main` with red CI.
- Small, focused changes. Explain non-obvious decisions briefly in Portuguese so Elvio can defend them in interviews.

## How to work with Elvio

- Elvio reviews and understands every change before committing. When you introduce a pattern or API he may not know, explain it in 2-3 lines in Portuguese.
- Do not add dependencies without saying why.
- After finishing a task, tell him which checkbox in `docs/PLAN.md` to tick and suggest the commit message.
