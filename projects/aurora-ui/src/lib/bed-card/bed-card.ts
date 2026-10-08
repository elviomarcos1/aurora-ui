import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { StatusPill, type StatusPillVariant } from '../status-pill/status-pill';

/** Clinical state the bed's left stripe and pill reflect. */
export type BedCardStatus = StatusPillVariant;

/**
 * One bed on the occupancy board: bed code, patient, state, and the next
 * thing that will happen. The 4px left stripe repeats the state colour so a
 * full ward reads at a glance from a distance.
 *
 * For a free bed, set `free` and skip `status`/`statusLabel` — no pill is
 * shown, and the card switches to the sunken, dashed "available" look.
 *
 * Usage note: pass initials and age, never full names, on shared screens.
 */
@Component({
  selector: 'au-bed-card',
  imports: [StatusPill],
  templateUrl: './bed-card.html',
  styleUrl: './bed-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedCard {
  /** Bed code, e.g. "4B-12". */
  readonly code = input.required<string>();

  /** Patient initials and age (e.g. "M. Oliveira, 67"), or an availability note for a free bed. */
  readonly name = input.required<string>();

  /** Marks the bed as free: sunken surface, dashed border, no status pill. */
  readonly free = input(false);

  /** Clinical state. Ignored when `free` is set. */
  readonly status = input<BedCardStatus>();

  /** Pill label, e.g. "Critical", "Discharge pending". Required whenever `status` is set. */
  readonly statusLabel = input<string>();

  /** Diagnosis group, e.g. "Post-op cardiac". For a free bed, use this slot for e.g. "Ready for admission". */
  readonly diagnosis = input<string>();

  /** Day of stay, e.g. "Day 2". Rendered in the mono numeral style. */
  readonly dayOfStay = input<string>();

  /** What happens next, e.g. "Visit due 15:00" or "Discharge 16:30". */
  readonly nextEvent = input<string>();

  protected readonly variantClass = computed(() => {
    if (this.free()) {
      return 'au-bed--free';
    }
    const status = this.status();
    return status ? `au-bed--${status}` : null;
  });
}
