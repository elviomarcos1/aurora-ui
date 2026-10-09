import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AlertBanner,
  BedCard,
  Button,
  OccupancyMeter,
  StatusPill,
  ThemeService,
  VitalSign,
} from '@aurora-hospital/ui';

import { ShowcaseExample } from '../../shared/showcase-example/showcase-example';

/**
 * The showcase home page: brand identity, a live tour of every Aurora UI
 * component with its template snippet, and links to the real source.
 */
@Component({
  selector: 'app-home',
  imports: [
    AlertBanner,
    BedCard,
    Button,
    OccupancyMeter,
    StatusPill,
    VitalSign,
    ShowcaseExample,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly themeService = inject(ThemeService);

  /** Tracks the demo AlertBanner so its acknowledge action does something visible. */
  protected readonly alertAcknowledged = signal(false);

  protected readonly heartRateHistory = [74, 76, 75, 78, 82, 79, 78];

  protected readonly statusPillCode = `<au-status-pill status="critical">Critical</au-status-pill>
<au-status-pill status="warning">Observation</au-status-pill>
<au-status-pill status="stable">Stable</au-status-pill>
<au-status-pill status="info">Info</au-status-pill>`;

  protected readonly buttonCode = `<au-button variant="primary">Admit patient</au-button>
<au-button variant="secondary">View chart</au-button>
<au-button variant="danger">Discharge</au-button>`;

  protected readonly bedCardCode = `<au-bed-card
  code="4B-12"
  name="M. Oliveira, 67"
  status="critical"
  statusLabel="Critical"
  diagnosis="Post-op cardiac"
  dayOfStay="Day 2"
  nextEvent="Visit due 15:00"
/>

<au-bed-card code="4B-13" name="Ready for admission" [free]="true" />`;

  protected readonly vitalSignCode = `<au-vital-sign
  label="Heart rate"
  [value]="78"
  unit="bpm"
  status="stable"
  [range]="[60, 100]"
  [history]="[74, 76, 75, 78, 82, 79, 78]"
/>`;

  protected readonly alertBannerCode = `<au-alert-banner
  variant="critical"
  title="SpO2 87% · Bed 4B-12"
  text="Below 90% for 2 minutes. Nurse on duty notified at 14:32."
  acknowledgeLabel="Acknowledge"
  (acknowledge)="onAcknowledge()"
/>`;

  protected readonly occupancyMeterCode = `<au-occupancy-meter label="Ward 4B · Cardiology" [occupied]="21" [capacity]="24" />`;
}
