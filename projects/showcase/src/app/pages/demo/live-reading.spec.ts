import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { createLiveReading } from './live-reading';

@Component({ selector: 'app-test-host', template: '' })
class HostComponent {
  readonly reading = createLiveReading({
    baseline: 90,
    min: 80,
    max: 100,
    historySize: 3,
    intervalMs: 1000,
  });
}

function createHost() {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('createLiveReading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts at the baseline, with history filled with the baseline', () => {
    const fixture = createHost();

    expect(fixture.componentInstance.reading()).toEqual({
      value: 90,
      history: [90, 90, 90],
    });
  });

  it('produces a new reading on each tick, within [min, max]', () => {
    const fixture = createHost();

    jest.advanceTimersByTime(1000);

    const reading = fixture.componentInstance.reading();
    expect(reading.value).toBeGreaterThanOrEqual(80);
    expect(reading.value).toBeLessThanOrEqual(100);
  });

  it('keeps a rolling window of the configured size', () => {
    const fixture = createHost();

    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(1000);

    const reading = fixture.componentInstance.reading();
    expect(reading.history).toHaveLength(3);
    expect(reading.history[2]).toBe(reading.value);
  });

  it('stops updating once the owning component is destroyed', () => {
    const fixture = createHost();
    jest.advanceTimersByTime(1000);
    const valueBeforeDestroy = fixture.componentInstance.reading().value;

    fixture.destroy();
    jest.advanceTimersByTime(5000);

    expect(fixture.componentInstance.reading().value).toBe(valueBeforeDestroy);
  });
});
