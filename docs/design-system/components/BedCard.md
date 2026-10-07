# BedCard

One bed on the occupancy board: bed code, patient, state, and the next thing that will happen.

- The 4px stripe on the left repeats the state colour so a full ward reads at a glance from a distance; the pill gives the shape and word.
- Free beds use `au-bed--free`: sunken `surface-2`, dashed border, no shadow, so occupied beds stand out.
- Show initials and age, never full names, on shared screens.
- Meta line: diagnosis group, day of stay (mono), next visit or discharge time.

Angular: rendered in an `@for` over a Signal of beds, with `track bed.code`.
