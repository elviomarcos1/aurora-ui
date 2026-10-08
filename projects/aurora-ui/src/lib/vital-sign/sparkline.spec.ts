import { buildSparkline } from './sparkline';

describe('buildSparkline', () => {
  it('returns null for an empty series', () => {
    expect(buildSparkline([])).toBeNull();
  });

  it('places a single value at the right edge, at mid-height', () => {
    const spark = buildSparkline([78]);

    expect(spark).not.toBeNull();
    expect(spark!.cx).toBe(240);
    expect(spark!.linePath).toBe('M240 19');
  });

  it('spreads points evenly from x=0 to x=240', () => {
    const spark = buildSparkline([1, 2, 3, 4, 5]);

    expect(spark!.linePath).toMatch(/^M0 .+ L60 .+ L120 .+ L180 .+ L240 /);
  });

  it('maps the highest value to the top padding and the lowest to the bottom', () => {
    const spark = buildSparkline([10, 20]);

    // First point (10) is the lowest -> y = 36 - 4 = 32. Second (20) is the highest -> y = 6.
    expect(spark!.linePath).toBe('M0 32 L240 6');
  });

  it('keeps a flat line centred when every value is equal (no division by zero)', () => {
    const spark = buildSparkline([50, 50, 50]);

    expect(spark!.linePath).toBe('M0 19 L120 19 L240 19');
  });

  it('places the endpoint dot on the last reading, not the extremes', () => {
    const spark = buildSparkline([60, 100, 78]);

    // 60 is the min (y=32), 100 is the max (y=6), but 78 (last) is the endpoint.
    expect(spark!.cx).toBe(240);
    expect(spark!.cy).toBe(20.3);
  });

  it('closes the area path down to the baseline under the first and last points', () => {
    const spark = buildSparkline([60, 100]);

    expect(spark!.areaPath).toBe(`${spark!.linePath} L240 36 L0 36 Z`);
  });
});
