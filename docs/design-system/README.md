# Aurora Hospital

A design system for real-time hospital operations: bed occupancy, patient status, vital signs and surgical schedules, read at a glance by nurses, doctors and coordinators on wall screens, desktops and tablets.

> **Portfolio project.** Aurora Hospital is a fictional brand created by Elvio Marcos Faria Junior. It is inspired by the real-time dashboards he designed and built for a hospital in Brazil, used by staff across the entire organization. All names, patients and data shown here are invented.

## Principles

1. **Glanceable first.** A screen should answer "does anything need me right now?" in under three seconds. Summary before detail, state before numbers.
2. **State is never colour alone.** Every status carries a colour, an icon shape and a word. A colour-blind charge nurse reading a wall screen from four metres away must get the same answer.
3. **Calm by default, loud only when it matters.** Most of the screen is quiet teal and neutral. Red appears only for critical states, so it keeps its meaning.
4. **Numbers you can trust.** Vital signs and counts use a monospaced face with tabular numerals, so digits never jump while values update live.

## Voice

Clinical, short and specific. Write what happened and what to do.

- Do: "SpO₂ below 90% for 2 min · Bed 12"; "3 beds free in Ward 4B".
- Don't: exclamation marks, emoji, vague words such as "issue" or "problem", jokes near patient data.
- Times in 24h (`14:32`), dates as `07 Oct`, units always shown (`bpm`, `mmHg`, `%`).

## Colour

Aurora teal (`brand`) is the identity and the only colour for primary actions. `dawn`, the warm first light of the logo, is reserved for brand moments and never used for status or text.

Clinical states map to four semantic families, each with a strong tone for text and icons and a `-soft` tone for backgrounds:

| State | Tokens | Icon shape | Use |
|---|---|---|---|
| Critical | `critical`, `critical-soft` | triangle | Needs action now |
| Observation | `warning`, `warning-soft` | diamond | Approaching limits |
| Stable | `stable`, `stable-soft` | circle | In range |
| Info | `info`, `info-soft` | square | Scheduled, pending, transfers |

Every text/background pair in this system passes WCAG AA (4.5:1) in both light and dark themes. Text on a brand fill is `on-brand`, never hard-coded white.

## Typography

- **Bricolage Grotesque** (`display`) for screen titles and heroes. Used sparingly.
- **Figtree** (`sans`) for everything people read.
- **IBM Plex Mono** (`mono`) for every live number: vitals, bed codes, times. Always with `font-variant-numeric: tabular-nums`.

All three are loaded from Google Fonts.

## Layout

A 4px grid. Cards use `radius-lg` (the same corner as the logo mark) and `space-6` padding; dense wall-screen layouts drop to `space-4`. Borders come from `line`; elevation from `shadow-card`. Keyboard focus is always visible: a 2px `focus-ring` with a 2px offset.

## Iconography

Icons come from **Lucide** (open source, ISC licence): outline icons on a 24px grid with 2px rounded strokes, which match Figtree's open, friendly shapes. A curated set of 39 icons covers vitals, beds, logistics, people, status and interface. Icons inherit `currentColor`; size them 16, 20, 24 or 32px. Every status icon pairs with a word, and the four status shapes (triangle, diamond, circle, square in pills; `triangle-alert`, `circle-alert`, `circle-check`, `info` at larger sizes) are reserved for status. In Angular, use `lucide-angular` and import only the icons a screen needs.

## Components

Built for Angular (standalone components, Signals), documented here as framework-agnostic HTML and CSS classes (`components/bundle.css`, prefix `au-`):

- **Icon**: the Lucide icon set, sizes and colour rules.
- **Button**: primary, secondary, ghost and danger actions.
- **StatusPill**: patient state with colour, shape and label.
- **VitalSign**: a live vital with value, unit, range and trend.
- **BedCard**: one bed on the occupancy board.
- **AlertBanner**: critical and informational alerts.
- **OccupancyMeter**: how full a ward is.
- **TextField**: labelled input with helper and error states.

## Logos

`assets/Logos` holds the mark (a rising sun over the horizon, with a medical cross) and the wordmark. Keep clear space equal to a quarter of the mark's width. Do not recolour the sun.
