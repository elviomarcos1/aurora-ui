import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MockVitalsService } from './mock-vitals.service';
import { VitalSign } from './vital-sign';

/**
 * Storybook-only wrapper: feeds `VitalSign` from `MockVitalsService` so the
 * "Live" story updates on its own. Not part of the public API.
 */
@Component({
  selector: 'au-live-vital-sign-demo',
  imports: [VitalSign],
  template: `
    <au-vital-sign
      label="Heart rate"
      [value]="reading().value"
      unit="bpm"
      status="stable"
      [range]="[60, 100]"
      [history]="reading().history"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveVitalSignDemo {
  private readonly vitals = inject(MockVitalsService);

  protected readonly reading = this.vitals.track({
    baseline: 78,
    min: 60,
    max: 100,
    intervalMs: 1500,
  });
}
