# OccupancyMeter

How full a ward is, as a count and a bar.

- Under 85%: `brand`. 85–99%: `au-meter--warning`. Full: `au-meter--critical`.
- Always show the exact count (`18/24`) in mono next to the bar; the bar is a summary, the number is the truth.
- Use `role="meter"` with `aria-valuenow` and an accessible name.
