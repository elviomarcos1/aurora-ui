import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * How full a ward is, as an exact count and a bar. The count is the source
 * of truth (`18/24`); the bar is just a summary.
 *
 * Colour band: under 85% is `brand`, 85-99% is `warning`, full is `critical`.
 */
@Component({
  selector: 'au-occupancy-meter',
  templateUrl: './occupancy-meter.html',
  styleUrl: './occupancy-meter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccupancyMeter {
  /** Ward or unit name shown above the bar, e.g. "Ward 4B · Cardiology". */
  readonly label = input.required<string>();

  /** Beds currently occupied. */
  readonly occupied = input.required<number>();

  /** Total beds in the ward. */
  readonly capacity = input.required<number>();

  /** Accessible name for the meter. Defaults to "`label` occupancy". */
  readonly ariaLabel = input<string>();

  protected readonly percent = computed(() =>
    Math.round((this.occupied() / this.capacity()) * 100),
  );

  protected readonly band = computed<'warning' | 'critical' | null>(() => {
    if (this.occupied() >= this.capacity()) {
      return 'critical';
    }
    if (this.percent() >= 85) {
      return 'warning';
    }
    return null;
  });

  protected readonly accessibleLabel = computed(
    () => this.ariaLabel() ?? `${this.label()} occupancy`,
  );
}
