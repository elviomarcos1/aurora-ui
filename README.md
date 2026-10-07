<p align="center"><img src="design/aurora-wordmark.svg" alt="Aurora Hospital" width="260"></p>

# Aurora UI

An accessible Angular design system for real-time hospital dashboards: bed occupancy, patient status, vital signs and surgical schedules, readable at a glance.

> **Portfolio project.** Aurora Hospital is a fictional brand. It is inspired by the real-time dashboards I designed and built for a hospital in Brazil, used by staff across the entire organization. All names, patients and data are invented.

## Status

🚧 Work in progress. The design system is specified; the Angular implementation is being built in phases. See the [plan](docs/PLAN.md).

| | |
| --- | --- |
| Library | `@aurora-hospital/ui` (coming soon) |
| Storybook | coming soon |
| Showcase | coming soon |

## What's inside

- **Design tokens** in light and dark themes, every text color pair WCAG AA: [`design/tokens.json`](design/tokens.json)
- **Brand book**: principles, voice, color meaning, typography, iconography: [`docs/design-system`](docs/design-system/README.md)
- **Component specs**: Button, StatusPill, VitalSign, BedCard, AlertBanner, OccupancyMeter, TextField, Icon: [`docs/design-system/components`](docs/design-system/components)
- **Architecture decisions**: [`docs/decisions`](docs/decisions)

## Stack

Angular (standalone components, Signals, OnPush) · TypeScript · SCSS with CSS custom properties · Lucide icons · Jest + Testing Library · Storybook with a11y addon · GitHub Actions

## Design principles

1. **Glanceable first.** A screen answers "does anything need me right now?" in under three seconds.
2. **State is never color alone.** Every status has a color, an icon shape and a word.
3. **Calm by default, loud only when it matters.** Red appears only for critical states.
4. **Numbers you can trust.** Live values use tabular numerals, so digits never jump.

## Author

**Elvio Marcos Faria Junior**, Frontend Engineer · [LinkedIn](https://www.linkedin.com/in/elviomarcos1) · [GitHub](https://github.com/elviomarcos1)

## License

[MIT](LICENSE)
