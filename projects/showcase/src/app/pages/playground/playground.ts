import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  AlertBanner,
  BedCard,
  Button,
  Icon,
  OccupancyMeter,
  StatusPill,
  TextField,
  VitalSign,
} from '@aurora-hospital/ui';

import { PropControls } from '../../shared/prop-controls/prop-controls';
import { ShowcaseExample } from '../../shared/showcase-example/showcase-example';
import { SiteFooter } from '../../shared/site-footer/site-footer';
import { SiteHeader } from '../../shared/site-header/site-header';
import {
  createAlertBannerEntry,
  createBedCardEntry,
  createButtonEntry,
  createIconEntry,
  createOccupancyMeterEntry,
  createStatusPillEntry,
  createTextFieldEntry,
  createVitalSignEntry,
  type ExplorerEntry,
} from './explorer-entries';

/**
 * Component playground: search or pick any Aurora UI component, edit its
 * props with real controls, and copy the exact markup for the current
 * state. Every control maps straight to a real `input()` on the real
 * component — there is no separate "demo" version of anything.
 */
@Component({
  selector: 'app-playground',
  imports: [
    AlertBanner,
    BedCard,
    Button,
    Icon,
    OccupancyMeter,
    StatusPill,
    TextField,
    VitalSign,
    PropControls,
    ShowcaseExample,
    SiteFooter,
    SiteHeader,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playground {
  protected readonly buttonEntry = createButtonEntry();
  protected readonly statusPillEntry = createStatusPillEntry();
  protected readonly textFieldEntry = createTextFieldEntry();
  protected readonly alertBannerEntry = createAlertBannerEntry();
  protected readonly occupancyMeterEntry = createOccupancyMeterEntry();
  protected readonly vitalSignEntry = createVitalSignEntry();
  protected readonly bedCardEntry = createBedCardEntry();
  protected readonly iconEntry = createIconEntry();

  protected readonly entries: readonly ExplorerEntry[] = [
    this.buttonEntry,
    this.statusPillEntry,
    this.textFieldEntry,
    this.alertBannerEntry,
    this.occupancyMeterEntry,
    this.vitalSignEntry,
    this.bedCardEntry,
    this.iconEntry,
  ];

  protected readonly searchQuery = signal('');
  protected readonly activeKey = signal(this.entries[0].key);

  protected readonly filteredEntries = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return this.entries;
    return this.entries.filter((entry) => entry.title.toLowerCase().includes(query));
  });

  protected readonly activeEntry = computed(
    () => this.entries.find((entry) => entry.key === this.activeKey()) ?? this.entries[0],
  );

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected selectEntry(key: string): void {
    this.activeKey.set(key);
  }
}
