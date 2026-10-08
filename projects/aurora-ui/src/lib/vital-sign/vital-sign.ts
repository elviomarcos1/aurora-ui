import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { StatusPill } from '../status-pill/status-pill';
import { buildSparkline } from './sparkline';

/** Clinical state of this reading. `critical` also switches the value, border and sparkline to `critical`. */
export type VitalSignStatus = 'stable' | 'warning' | 'critical';

const DEFAULT_STATUS_LABEL: Record<VitalSignStatus, string> = {
  stable: 'Stable',
  warning: 'Observation',
  critical: 'Critical',
};

/**
 * One live vital sign: label, value with unit, status pill, a short trend
 * and the reference range (or the reason it is out of range).
 *
 * Feed `value` from a Signal so updates flow straight through; the mono,
 * tabular-numeral value never shifts digits while it updates.
 */
@Component({
  selector: 'au-vital-sign',
  imports: [StatusPill],
  templateUrl: './vital-sign.html',
  styleUrl: './vital-sign.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VitalSign {
  /** Vital name, e.g. "Heart rate", "SpO2". */
  readonly label = input.required<string>();

  /** Current reading. A plain number for most vitals, a string for composite ones like "142/91". */
  readonly value = input.required<string | number>();

  /** Unit shown next to the value, e.g. "bpm", "%", "mmHg". */
  readonly unit = input<string>();

  /** Clinical state: drives the pill, and the critical border/colour when `critical`. */
  readonly status = input.required<VitalSignStatus>();

  /** Pill label override. Defaults to "Stable" / "Observation" / "Critical" per `status`. */
  readonly statusLabel = input<string>();

  /** Reference range, e.g. `[60, 100]`. Renders as "Range 60-100" unless `rangeText` is set. */
  readonly range = input<readonly [number, number]>();

  /** Free-form reason shown instead of the formatted range, e.g. "Below 90% for 2 min". */
  readonly rangeText = input<string>();

  /** Recent readings (oldest first) to draw as the trend sparkline. Omit to hide it. */
  readonly history = input<readonly number[]>([]);

  protected readonly isCritical = computed(() => this.status() === 'critical');

  protected readonly resolvedStatusLabel = computed(
    () => this.statusLabel() ?? DEFAULT_STATUS_LABEL[this.status()],
  );

  protected readonly resolvedRangeText = computed(() => {
    const explicit = this.rangeText();
    if (explicit) {
      return explicit;
    }
    const range = this.range();
    return range ? `Range ${range[0]}-${range[1]}` : undefined;
  });

  protected readonly sparkline = computed(() => buildSparkline(this.history()));
}
