# 0003 · Lucide as the icon library

**Status:** accepted

## Context

Hospital dashboards need medical and logistics icons (heart pulse, bed, ambulance, syringe) plus interface icons, with a consistent style that matches the Figtree typeface.

## Decision

Use [Lucide](https://lucide.dev) (ISC licence) through `lucide-angular`, importing only the icons used. A curated set of 39 icons is listed in `docs/design-system/icons.txt`. Status icons are reserved for status.

## Consequences

- Outline icons on a 24px grid with 2px rounded strokes, inheriting `currentColor`, so they follow text color and both themes.
- Small bundles thanks to per-icon imports.
- Icons outside the curated set are added to the list first, so the product keeps one vocabulary.
