# TextField

A labelled single-line input with helper or error text.

- The label is always visible above the field; placeholders never replace labels.
- Error state: `au-field--error`, `aria-invalid="true"` and the message linked with `aria-describedby`. The message says what is wrong and how to fix it.
- Border uses `line-strong` (3:1 against `surface-1`).

Angular: built on Reactive Forms; the error text comes from the control's validators.
