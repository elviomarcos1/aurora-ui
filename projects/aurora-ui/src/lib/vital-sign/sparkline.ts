/** Fixed canvas every sparkline is drawn into, matching the design reference. */
const WIDTH = 240;
const HEIGHT = 36;
const TOP_PADDING = 6;
const BOTTOM_PADDING = 4;

export interface Sparkline {
  /** `d` for the stroked trend line. */
  readonly linePath: string;
  /** `d` for the filled area under the line, closed down to the baseline. */
  readonly areaPath: string;
  /** Centre of the endpoint dot — the current value. */
  readonly cx: number;
  readonly cy: number;
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Lays out `values` (oldest first) across a fixed 240x36 canvas and returns
 * ready-to-bind SVG path data for `.au-vital__spark`. Returns `null` when
 * there is nothing to draw.
 */
export function buildSparkline(values: readonly number[]): Sparkline | null {
  if (values.length === 0) {
    return null;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const drawableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
  const step = values.length > 1 ? WIDTH / (values.length - 1) : 0;
  // A flat series (or a single reading) has no range to scale against —
  // centre it instead of letting it collapse to the bottom edge.
  const mid = TOP_PADDING + drawableHeight / 2;

  const points = values.map((value, i) => ({
    x: round(values.length > 1 ? i * step : WIDTH),
    y: round(range === 0 ? mid : TOP_PADDING + (1 - (value - min) / range) * drawableHeight),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L${last.x} ${HEIGHT} L${first.x} ${HEIGHT} Z`;

  return { linePath, areaPath, cx: last.x, cy: last.y };
}
