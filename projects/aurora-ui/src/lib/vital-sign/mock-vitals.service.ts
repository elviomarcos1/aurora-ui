import { DestroyRef, Injectable, inject, signal, type Signal } from '@angular/core';
import { interval } from 'rxjs';

export interface LiveVitalOptions {
  /** Starting value, and the centre the reading drifts around. */
  readonly baseline: number;
  readonly min: number;
  readonly max: number;
  /** How many past readings to keep for the sparkline. Defaults to 9. */
  readonly historySize?: number;
  /** How often to produce a new reading, in ms. Defaults to 2000. */
  readonly intervalMs?: number;
}

export interface LiveVitalReading {
  readonly value: number;
  readonly history: readonly number[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Demo-only fake data source: not part of the library's public API. Feeds
 * `VitalSign` a live-looking reading in Storybook, so reviewers see the
 * value and sparkline update on their own, without the digits jumping
 * (that part comes from `VitalSign`'s tabular-numeral styling).
 *
 * Stops producing readings when the injector that called `track()` is
 * destroyed (a component's `DestroyRef`), so a story doesn't leak timers
 * across re-renders.
 */
@Injectable({ providedIn: 'root' })
export class MockVitalsService {
  /** Starts a fake live reading that randomly drifts within `[min, max]`. */
  track(options: LiveVitalOptions): Signal<LiveVitalReading> {
    const { baseline, min, max, historySize = 9, intervalMs = 2000 } = options;

    const reading = signal<LiveVitalReading>({
      value: baseline,
      history: Array.from({ length: historySize }, () => baseline),
    });

    const subscription = interval(intervalMs).subscribe(() => {
      reading.update(({ value, history }) => {
        const drift = (Math.random() - 0.5) * (max - min) * 0.15;
        const next = Math.round(clamp(value + drift, min, max) * 10) / 10;
        return { value: next, history: [...history.slice(1), next] };
      });
    });

    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());

    return reading.asReadonly();
  }
}
