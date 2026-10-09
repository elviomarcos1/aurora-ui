import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AlertBanner, BedCard, OccupancyMeter, VitalSign } from '@aurora-hospital/ui';

import { SiteFooter } from '../../shared/site-footer/site-footer';
import { SiteHeader } from '../../shared/site-header/site-header';
import { createLiveReading } from './live-reading';
import { WARD_4B_BEDS } from './ward-data';

/**
 * Demo hospital dashboard: Ward 4B's occupancy board, built only from Aurora
 * UI components. Every bed, name and reading is invented.
 */
@Component({
  selector: 'app-demo',
  imports: [AlertBanner, BedCard, OccupancyMeter, VitalSign, SiteFooter, SiteHeader],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo {
  protected readonly beds = WARD_4B_BEDS;

  protected readonly occupied = computed(() => this.beds.filter((bed) => !bed.free).length);
  protected readonly capacity = this.beds.length;

  /** Tracks the critical-patient alert so its acknowledge action does something visible. */
  protected readonly alertAcknowledged = signal(false);

  protected readonly spo2 = createLiveReading({
    baseline: 87,
    min: 83,
    max: 93,
    intervalMs: 2000,
  });

  protected readonly heartRate = createLiveReading({
    baseline: 112,
    min: 98,
    max: 124,
    intervalMs: 1800,
  });
}
