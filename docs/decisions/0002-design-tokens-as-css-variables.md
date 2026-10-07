# 0002 · Design tokens compiled to CSS custom properties

**Status:** accepted

## Context

Colors, type, spacing and radius must be identical in the library, Storybook and the showcase, and switch between light and dark themes without reloading.

## Decision

`design/tokens.json` is the single source of truth. A build script compiles it to `tokens.css`: one block of custom properties for the light theme on `:root` and one for `[data-theme="dark"]`. Components use only `var(--token)` values, never literal colors.

## Consequences

- Theme switching is one attribute change on `<html>`; no component code changes.
- The live theme playground in the showcase can override variables at runtime.
- Token names become part of the public API and must change carefully.
