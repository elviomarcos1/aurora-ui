# 0004 · Inline the curated Lucide SVGs instead of depending on `lucide-angular`

**Status:** accepted

## Context

[0001](0003-lucide-icons.md) picked Lucide as the icon source, consumed through the `lucide-angular` npm package. When implementing the `Icon` component, `lucide-angular@1.0.0` (the latest release) declares `@angular/core`/`@angular/common` peer ranges of `13.x - 21.x`. This project is on Angular 22, so installing it would need `--legacy-peer-deps` or an `overrides` hack, carried indefinitely until the package catches up.

The curated set is fixed at 39 icons (`docs/design-system/icons.txt`), and `lucide-angular`'s own tree-shaking (`LucideAngularModule.pick({...})`) only ever ships the icons you import by name — so depending on the package was never going to add bundle weight beyond those 39 icons either way. The real trade-off is the peer-dependency risk versus one extra Angular component instance per icon at render time.

## Decision

Inline the inner SVG markup (`<path>`, `<circle>`, …) for the 39 curated icons as a TypeScript constant (`projects/aurora-ui/src/lib/icon/icon-data.ts`), copied from the already-curated reference markup in `docs/design-system/components/Icon.preview.html`. The `Icon` component (`au-icon`) renders them into a single `<svg>` via `[innerHTML]`, bound through `DomSanitizer.bypassSecurityTrustHtml` (safe here: the source is a fixed, compile-time constant we author ourselves, never user input).

No npm dependency on `lucide-angular` or `lucide-static` is added.

## Consequences

- No Angular peer-dependency conflict, now or when upgrading Angular again.
- One fewer component instance per icon (just our own `<svg>`, no nested `<lucide-icon>`).
- Adding an icon outside the curated 39 means copying its path data from [lucide.dev](https://lucide.dev) by hand into `icon-data.ts`, instead of a one-line import. Acceptable: the set is intentionally curated and rarely grows.
- `docs/design-system/components/Icon.md` still documents the `lucide-angular` route as a valid option for teams that don't hit this peer-dependency wall; this ADR records why Aurora UI itself took the inline route instead.
