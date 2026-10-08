import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Button } from '../button/button';

/** `critical` needs action now (`role="alert"`); `info` is planning info only (`role="status"`). */
export type AlertBannerVariant = 'critical' | 'info';

/**
 * Announces something that needs attention across the whole screen.
 *
 * Only one critical banner per screen — stack further alerts into a list.
 * Set `acknowledgeLabel` to show a confirm action (typically only for
 * `critical`); omit it for a banner that needs no response.
 */
@Component({
  selector: 'au-alert-banner',
  imports: [Button],
  templateUrl: './alert-banner.html',
  styleUrl: './alert-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBanner {
  /** `critical` or `info`. Drives colour, icon shape and the ARIA role. */
  readonly variant = input.required<AlertBannerVariant>();

  /** What happened and where, e.g. "SpO2 87% · Bed 4B-12". */
  readonly title = input.required<string>();

  /** Since when and who knows, e.g. "Below 90% for 2 minutes. Nurse on duty notified at 14:32." */
  readonly text = input<string>();

  /** Label for the confirm action. Omit for a banner with no action. */
  readonly acknowledgeLabel = input<string>();

  /** Emits when the acknowledge action is clicked. */
  readonly acknowledge = output<void>();

  protected readonly role = computed(() => (this.variant() === 'critical' ? 'alert' : 'status'));
}
