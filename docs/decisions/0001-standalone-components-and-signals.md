# 0001 · Standalone components and Signals

**Status:** accepted

## Context

The library must be easy to consume in modern Angular apps and must update live values (vital signs) efficiently.

## Decision

Every component is a standalone component with `ChangeDetectionStrategy.OnPush`, using signal-based `input()`, `output()` and `model()`, and `computed()` for derived state. No NgModules.

## Consequences

- Consumers import only the components they use; better tree-shaking.
- Fine-grained change detection fits live dashboards that update every second.
- Requires a recent Angular version in consuming apps.
