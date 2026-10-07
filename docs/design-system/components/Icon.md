# Icon

Aurora uses **Lucide** (ISC licence): a 24px grid, 2px rounded strokes and `currentColor`, so an icon always takes the colour of the text around it.

- **Angular:** `npm i lucide-angular`, then `<lucide-icon name="heart-pulse" [size]="20" />` inside standalone components (import `LucideAngularModule.pick({ HeartPulse, ... })` to ship only the icons you use).
- **Plain HTML:** inline the SVG from `lucide-static` and add the class `au-icon` (`au-icon--16`, `--24`, `--32` for other sizes).
- **Sizes:** 16px inside pills and dense tables, 20px default (buttons, inputs, nav), 24px for card headers, 32px for empty states (stroke drops to 1.75).
- **Colour:** never set a fill or stroke colour on the icon; set `color` on its parent with a token (`ink`, `ink-muted`, `brand`, or a status tone).
- **Meaning:** an icon next to visible text is decorative (`aria-hidden="true"`). An icon-only button needs an `aria-label` that says the action ("Close alert"), and a tooltip.
- **Status icons are fixed:** `triangle-alert` = critical, `circle-alert` = observation, `circle-check` = stable, `info` = info. Do not use them for anything else.

The curated set lives in `assets/Icons`. Need another icon? Pick it from lucide.dev and add it to the set, so the whole product draws from one vocabulary.
