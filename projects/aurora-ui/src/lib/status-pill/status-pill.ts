import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Clinical state the pill represents. Shape (not just colour) carries the
 * meaning: triangle for critical, diamond for warning, circle for stable,
 * square for info — readable even without colour.
 */
export type StatusPillVariant = 'critical' | 'warning' | 'stable' | 'info';

/**
 * Shows a patient's clinical state with colour, an icon shape and a word, so
 * the state reads without relying on colour alone. Always project a short
 * label (one or two words) — a pill is never icon-only.
 */
@Component({
  selector: 'au-status-pill',
  templateUrl: './status-pill.html',
  styleUrl: './status-pill.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPill {
  /** Which clinical state this pill represents. */
  readonly status = input.required<StatusPillVariant>();
}
