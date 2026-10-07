# VitalSign

One live vital sign: label, value with unit, state pill, a short trend and the reference range.

- The value uses `data-xl` (IBM Plex Mono, tabular numerals) so digits do not shift while updating.
- Out of range: add `au-vital--critical`; the value, border and sparkline switch to `critical`, and the pill says why.
- The trend shows the last few readings; the endpoint dot marks the current value.
- Always show the unit and the range or reason under the value.

Angular: `<au-vital-sign label="SpO₂" [value]="spo2()" unit="%" [range]="[90,100]">` with a Signal feeding the value.
