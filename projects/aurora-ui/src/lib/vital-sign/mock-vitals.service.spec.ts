import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MockVitalsService } from './mock-vitals.service';

@Component({ selector: 'au-test-host', template: '' })
class HostComponent {
  private readonly vitals = inject(MockVitalsService);
  readonly reading = this.vitals.track({
    baseline: 78,
    min: 60,
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

describe('MockVitalsService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts at the baseline, with history filled with the baseline', () => {
    const fixture = createHost();

    expect(fixture.componentInstance.reading()).toEqual({
      value: 78,
      history: [78, 78, 78],
    });
  });

  it('produces a new reading on each tick, within [min, max]', () => {
    const fixture = createHost();

    jest.advanceTimersByTime(1000);

    const reading = fixture.componentInstance.reading();
    expect(reading.value).toBeGreaterThanOrEqual(60);
    expect(reading.value).toBeLessThanOrEqual(100);
  });

  it('keeps a rolling window: drops the oldest reading, appends the newest', () => {
    const fixture = createHost();

    jest.advanceTimersByTime(1000);
    const afterOne = fixture.componentInstance.reading();
    expect(afterOne.history).toHaveLength(3);
    expect(afterOne.history[2]).toBe(afterOne.value);

    jest.advanceTimersByTime(1000);
    const afterTwo = fixture.componentInstance.reading();
    expect(afterTwo.history[1]).toBe(afterOne.history[2]);
    expect(afterTwo.history[2]).toBe(afterTwo.value);
  });

  it('stays within [min, max] over many ticks', () => {
    const fixture = createHost();

    for (let i = 0; i < 50; i++) {
      jest.advanceTimersByTime(1000);
    }

    const reading = fixture.componentInstance.reading();
    expect(reading.value).toBeGreaterThanOrEqual(60);
    expect(reading.value).toBeLessThanOrEqual(100);
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
