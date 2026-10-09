import { DestroyRef, inject, signal, type Signal } from '@angular/core';
import { interval } from 'rxjs';

export interface LiveReadingOptions {
  /** Starting value, and the centre the reading drifts around. */
  readonly baseline: number;
  readonly min: number;
  readonly max: number;
  /** How many past readings to keep for the sparkline. Defaults to 9. */
  readonly historySize?: number;
  /** How often to produce a new reading, in ms. Defaults to 2000. */
  readonly intervalMs?: number;
}

export interface LiveReading {
  readonly value: number;
  readonly history: readonly number[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Demo-only fake data source for the ward board: a value that randomly
 * drifts within `[min, max]`, so the live vitals panel updates on its own.
 * Stops once the calling component's injector is destroyed. Call from a
 * component field initializer, same injection-context requirement as
 * `inject()`.
 */
export function createLiveReading(options: LiveReadingOptions): Signal<LiveReading> {
  const { baseline, min, max, historySize = 9, intervalMs = 2000 } = options;

  const reading = signal<LiveReading>({
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
