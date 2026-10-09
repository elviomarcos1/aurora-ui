import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  AlertBanner,
  BedCard,
  Button,
  OccupancyMeter,
  StatusPill,
  ThemeService,
  VitalSign,
} from '@aurora-hospital/ui';

import { SiteFooter } from '../../shared/site-footer/site-footer';
import { SiteHeader } from '../../shared/site-header/site-header';
import { derivePalette, type HexColor } from './color-utils';

/** The default Aurora teal, matching `design/tokens/light.json`. */
const DEFAULT_COLOR: HexColor = '#0B6E69';

type RadiusPreset = 'sharp' | 'default' | 'round';
type DensityPreset = 'comfortable' | 'compact';

const RADIUS_VALUES: Record<RadiusPreset, { sm: string; md: string; lg: string }> = {
  sharp: { sm: '2px', md: '4px', lg: '8px' },
  default: { sm: '6px', md: '10px', lg: '16px' },
  round: { sm: '10px', md: '16px', lg: '24px' },
};

const DENSITY_VALUES: Record<DensityPreset, { space3: string; space4: string }> = {
  comfortable: { space3: '12px', space4: '16px' },
  compact: { space3: '8px', space4: '10px' },
};

/**
 * Live theme playground: adjusts primary color, corner radius and density,
 * on top of the real light/dark theme, by overriding CSS custom properties
 * on the preview wrapper only. Every component inside it is the real Aurora
 * UI component, reading the same tokens it would in production.
 */
@Component({
  selector: 'app-playground',
  imports: [
    AlertBanner,
    BedCard,
    Button,
    OccupancyMeter,
    StatusPill,
    VitalSign,
    SiteFooter,
    SiteHeader,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playground {
  protected readonly themeService = inject(ThemeService);

  protected readonly primaryColor = signal<HexColor>(DEFAULT_COLOR);
  protected readonly radiusPreset = signal<RadiusPreset>('default');
  protected readonly densityPreset = signal<DensityPreset>('comfortable');

  /** Tracks the demo AlertBanner so its acknowledge action does something visible. */
  protected readonly alertAcknowledged = signal(false);

  protected readonly heartRateHistory = [74, 76, 75, 78, 82, 79, 78];

  protected readonly radiusOptions: readonly { value: RadiusPreset; label: string }[] = [
    { value: 'sharp', label: 'Sharp' },
    { value: 'default', label: 'Rounded' },
    { value: 'round', label: 'Round' },
  ];

  protected readonly densityOptions: readonly { value: DensityPreset; label: string }[] = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
  ];

  protected readonly palette = computed(() =>
    derivePalette(this.primaryColor(), this.themeService.theme() === 'dark'),
  );

  protected readonly radiusValues = computed(() => RADIUS_VALUES[this.radiusPreset()]);

  protected readonly densityValues = computed(() => DENSITY_VALUES[this.densityPreset()]);

  protected readonly tokensSnippet = computed(() => {
    const palette = this.palette();
    const radius = this.radiusValues();
    const density = this.densityValues();
    return `--brand: ${palette.brand};
--brand-strong: ${palette.brandStrong};
--brand-soft: ${palette.brandSoft};
--on-brand: ${palette.onBrand};
--radius-sm: ${radius.sm};
--radius-md: ${radius.md};
--radius-lg: ${radius.lg};
--space-3: ${density.space3};
--space-4: ${density.space4};`;
  });

  protected onColorInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.primaryColor.set(value.toUpperCase());
  }

  protected resetColor(): void {
    this.primaryColor.set(DEFAULT_COLOR);
  }
}
