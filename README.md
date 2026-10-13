<p align="center"><img src="design/aurora-wordmark.svg" alt="Aurora Hospital" width="260"></p>

# Aurora UI

An accessible Angular design system for real-time hospital dashboards: bed occupancy, patient status, vital signs and surgical schedules, readable at a glance.

> **Portfolio project.** Aurora Hospital is a fictional brand. It is inspired by the real-time dashboards I designed and built for a hospital in Brazil, used by staff across the entire organization. All names, patients and data are invented.

## Links

| | |
| --- | --- |
| Library | [`@aurora-hospital/ui`](https://www.npmjs.com/package/@aurora-hospital/ui) on npm |
| Showcase | [elviomarcos1.github.io/aurora-ui](https://elviomarcos1.github.io/aurora-ui/) — theme playground, ward demo, case study |
| Storybook | [elviomarcos1.github.io/aurora-ui/storybook](https://elviomarcos1.github.io/aurora-ui/storybook/) — every component, every variant, both themes |
| Case study | [elviomarcos1.github.io/aurora-ui/case-study](https://elviomarcos1.github.io/aurora-ui/case-study) — problem, design decisions, architecture, results |

## Install

```bash
npm install @aurora-hospital/ui
```

Requires Angular 22+ with `@angular/core`, `@angular/common`, `@angular/forms` and `@angular/platform-browser` as peer dependencies. See the [package README](projects/aurora-ui/README.md) for setup (tokens, theme) and usage.

## Run locally

```bash
git clone https://github.com/elviomarcos1/aurora-ui.git
cd aurora-ui
npm install

npm start            # showcase at http://localhost:4200
npm run storybook    # Storybook at http://localhost:6006

npm test             # Jest, both projects
npm run lint         # ESLint, both projects
npm run build:lib    # builds the library into dist/aurora-ui
```

## What's inside

- **Design tokens** in light and dark themes, every text color pair WCAG AA: [`design/tokens/`](design/tokens)
- **Brand book**: principles, voice, color meaning, typography, iconography: [`docs/design-system`](docs/design-system/README.md)
- **Component specs**: Button, StatusPill, VitalSign, BedCard, AlertBanner, OccupancyMeter, TextField, Icon: [`docs/design-system/components`](docs/design-system/components)
- **Architecture decisions**: [`docs/decisions`](docs/decisions)

## Stack

Angular (standalone components, Signals, OnPush) · TypeScript · SCSS with CSS custom properties · Lucide icons · Jest + Testing Library · Storybook with a11y addon · GitHub Actions

## Architecture decisions

A few choices worth explaining in an interview:

- [**Standalone components and Signals**](docs/decisions/0001-standalone-components-and-signals.md) — no NgModules; inputs, outputs and state as Signals (`input()`, `model()`, `computed()`), `OnPush` everywhere.
- [**Design tokens compiled to CSS custom properties**](docs/decisions/0002-design-tokens-as-css-variables.md) — tokens live once in DTCG JSON (`design/tokens/`) and compile to CSS variables, so a component never hard-codes a color and themes switch by swapping a `data-theme` attribute.
- [**Lucide as the icon library**](docs/decisions/0003-lucide-icons.md) and [**inlining the curated SVGs**](docs/decisions/0004-inline-icon-svgs.md) — a 39-icon curated set, inlined as Angular templates instead of depending on `lucide-angular`, so the published package has one fewer runtime dependency.

## Design principles

1. **Glanceable first.** A screen answers "does anything need me right now?" in under three seconds.
2. **State is never color alone.** Every status has a color, an icon shape and a word.
3. **Calm by default, loud only when it matters.** Red appears only for critical states.
4. **Numbers you can trust.** Live values use tabular numerals, so digits never jump.

## Author

**Elvio Marcos Faria Junior**, Frontend Engineer · [LinkedIn](https://www.linkedin.com/in/elviomarcos1) · [GitHub](https://github.com/elviomarcos1)

## License

[MIT](LICENSE)
