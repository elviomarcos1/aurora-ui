# @aurora-hospital/ui

Accessible Angular component library for real-time hospital dashboards: bed occupancy, patient status and vital signs, built to be readable at a glance.

> **Portfolio project.** Aurora Hospital is a fictional brand created by Elvio Marcos Faria Junior, inspired by real-time dashboards he designed and built for a hospital in Brazil. All names, patients and data shown in the docs and demos are invented.

Source, Storybook and the live showcase: [github.com/elviomarcos1/aurora-ui](https://github.com/elviomarcos1/aurora-ui)

## Install

```bash
npm install @aurora-hospital/ui
```

Requires Angular 22 or later, with these peer dependencies already in any Angular app: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser`.

## Setup

Import the design tokens once, globally, in your app's styles:

```scss
@use '@aurora-hospital/ui/styles/tokens-base.css';
@use '@aurora-hospital/ui/styles/tokens-light.css';
@use '@aurora-hospital/ui/styles/tokens-dark.css';
```

Every component reads these as CSS custom properties, so colors switch when `<html>` gets `data-theme="dark"`. `ThemeService` does that for you and remembers the choice:

```ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '@aurora-hospital/ui';

@Component({ /* ... */ })
export class AppComponent {
  // Injected so its effect runs and keeps `data-theme` in sync from app start.
  private readonly theme = inject(ThemeService);
}
```

## Usage

Every component is standalone — import only what you use:

```ts
import { Component } from '@angular/core';
import { BedCard } from '@aurora-hospital/ui';

@Component({
  selector: 'app-ward',
  imports: [BedCard],
  template: `
    <au-bed-card
      code="4B-12"
      name="M. Oliveira, 67"
      status="critical"
      statusLabel="Critical"
      diagnosis="Post-op cardiac"
      dayOfStay="Day 2"
      nextEvent="Visit due 15:00"
    />
  `,
})
export class Ward {}
```

## What's inside

| Component | What it does |
| --- | --- |
| `Icon` | 39 curated Lucide icons, inlined — no `lucide-angular` dependency |
| `Button` | primary, secondary, ghost, danger, icon-only, disabled |
| `StatusPill` | critical, warning, stable, info — color, icon shape and word, never color alone |
| `TextField` | labelled input, `ControlValueAccessor`, drops into Reactive Forms |
| `AlertBanner` | critical and info alerts with an optional acknowledge action |
| `OccupancyMeter` | ward occupancy as a count and a bar, `role="meter"` |
| `VitalSign` | a live vital with a trend sparkline, tabular numerals so digits never jump |
| `BedCard` | one bed on the occupancy board, with a free-bed state |
| `ThemeService` | a signal-backed light/dark theme switch |

Every component is standalone, `OnPush`, keyboard-accessible, and documented in Storybook with an accessibility (a11y) check.

## License

MIT © Elvio Marcos Faria Junior
