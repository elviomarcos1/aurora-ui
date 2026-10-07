# Button

Triggers an action; one primary button per view.

- **Primary** (`au-btn--primary`): the main action on a screen, on `brand` with `on-brand` text.
- **Secondary**: neutral actions next to a primary; border uses `line-strong` (3:1).
- **Ghost**: low-emphasis actions inside cards and tables.
- **Danger**: destructive actions only (cancel surgery, remove patient). Always ask for confirmation in the page, never in a browser dialog.

Icons: an optional 20px Lucide icon sits before the label (`au-icon`). An icon-only button needs an `aria-label`.

Labels are verbs that say exactly what happens: "Admit patient", not "OK". Focus shows a 2px `focus-ring` with 2px offset. Angular: `<au-button variant="primary">`.
