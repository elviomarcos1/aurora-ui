import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertBanner, BedCard, Button, OccupancyMeter, StatusPill, VitalSign } from '@aurora-hospital/ui';

import { ShowcaseExample } from '../../shared/showcase-example/showcase-example';
import { SiteFooter } from '../../shared/site-footer/site-footer';
import { SiteHeader } from '../../shared/site-header/site-header';

/** Number of component demos in the "Built from these components" carousel. */
const COMPONENT_SLIDE_COUNT = 6;

/** How long each slide stays on screen before autoplay advances, in milliseconds. */
const SLIDE_DWELL_MS = 6000;

/** How often the progress bar updates while a slide is on screen, in milliseconds. */
const SLIDE_TICK_MS = 100;

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
    RouterLink,
    ShowcaseExample,
    SiteFooter,
    SiteHeader,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  /** Tracks the demo AlertBanner so its acknowledge action does something visible. */
  protected readonly alertAcknowledged = signal(false);

  protected readonly heartRateHistory = [74, 76, 75, 78, 82, 79, 78];

  // --- "Built from these components" fan ---------------------------------
  // One panel is expanded at a time; the rest collapse to a labeled tab.
  // A plain index-driven state local to this page: it only ever shows the
  // six demos below, so it does not need to be a reusable component.

  protected readonly activeSlide = signal(0);

  /** How far through the current slide's dwell time autoplay is, from 0 to 1. */
  protected readonly progress = signal(0);

  private readonly slideHovered = signal(false);
  private readonly slideFocused = signal(false);
  private readonly prefersReducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  protected readonly isCarouselPlaying = computed(
    () => !this.slideHovered() && !this.slideFocused() && !this.prefersReducedMotion,
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const timer = setInterval(() => {
        if (!this.isCarouselPlaying()) return;

        const nextProgress = this.progress() + SLIDE_TICK_MS / SLIDE_DWELL_MS;
        if (nextProgress >= 1) {
          this.setActiveSlide((this.activeSlide() + 1) % COMPONENT_SLIDE_COUNT);
        } else {
          this.progress.set(nextProgress);
        }
      }, SLIDE_TICK_MS);

      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected goToSlide(index: number): void {
    this.setActiveSlide(index);
  }

  protected setSlideHovered(hovered: boolean): void {
    this.slideHovered.set(hovered);
  }

  protected setSlideFocused(focused: boolean): void {
    this.slideFocused.set(focused);
  }

  private setActiveSlide(index: number): void {
    this.activeSlide.set(index);
    this.progress.set(0);
  }

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
