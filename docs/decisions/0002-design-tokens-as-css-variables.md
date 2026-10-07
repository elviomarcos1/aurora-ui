# 0002 · Design tokens compiled to CSS custom properties

**Status:** accepted

## Context

Colors, type, spacing and radius must be identical in the library, Storybook and the showcase, and switch between light and dark themes without reloading.

## Decision

`design/tokens/` is the single source of truth, written in the [DTCG](https://design-tokens.github.io/community-group/format/) format (`$value`/`$type`/`$description`) and split by theme: `base.json` (theme-independent: spacing, radius, fonts), `light.json` and `dark.json` (color and shadow). [Style Dictionary](https://styledictionary.com) compiles each file into a CSS file (`tokens-base.css`, `tokens-light.css`, `tokens-dark.css`) via `scripts/build-tokens.js` (run with `npm run tokens`): `base` and `light` emit custom properties on `:root`, `dark` emits them on `[data-theme="dark"]`. Components use only `var(--token)` values, never literal colors.

Style Dictionary does not support per-theme values on a single token (no light/dark pair in one file), so theming is modeled as one build per theme, each with its own source file — the tool's documented pattern for multi-brand/multi-theme setups. Token aliasing (e.g. `focus-ring` reusing `brand`) is resolved natively by the tool through DTCG's `{token-name}` reference syntax.

## Consequences

- Theme switching is one attribute change on `<html>`; no component code changes.
- The live theme playground in the showcase can override variables at runtime.
- Token names become part of the public API and must change carefully.
- The generated CSS files are gitignored, not committed — `npm run tokens` runs automatically after `npm install`/`npm ci` (the `prepare` script), so a fresh clone always has them. Editing a token file during a session still requires running `npm run tokens` by hand to see the change, since `prepare` only runs on install.
