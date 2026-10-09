/** A `#rrggbb` color string. */
export type HexColor = string;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: HexColor): Rgb {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: Rgb): HexColor {
  const channel = (value: number) => Math.round(value).toString(16).padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

function mix(base: HexColor, target: HexColor, amount: number): HexColor {
  const from = hexToRgb(base);
  const to = hexToRgb(target);
  return rgbToHex({
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  });
}

/** WCAG relative luminance: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance */
function relativeLuminance({ r, g, b }: Rgb): number {
  const linear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG contrast ratio between two colors, from 1 (identical) to 21 (black on white). */
export function contrastRatio(a: HexColor, b: HexColor): number {
  const lumA = relativeLuminance(hexToRgb(a));
  const lumB = relativeLuminance(hexToRgb(b));
  const [lighter, darker] = lumA >= lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Aurora's near-black ink, used as the dark "on brand" candidate. */
const INK: HexColor = '#0F2624';
const WHITE: HexColor = '#FFFFFF';

/**
 * Picks white or Aurora's dark ink as text on `fill`, whichever passes
 * WCAG AA (4.5:1); falls back to whichever contrasts more when neither does.
 */
function pickOnColor(fill: HexColor): HexColor {
  const whiteContrast = contrastRatio(fill, WHITE);
  const inkContrast = contrastRatio(fill, INK);
  return whiteContrast >= inkContrast ? WHITE : INK;
}

/** The brand token set the library expects, all derived from one base color. */
export interface BrandPalette {
  brand: HexColor;
  brandStrong: HexColor;
  brandSoft: HexColor;
  onBrand: HexColor;
}

/**
 * Derives `brand-strong`, `brand-soft` and `on-brand` from a single base
 * color, mirroring the ratios in `design/tokens/light.json` and `dark.json`:
 * light theme darkens for `-strong` and tints toward white for `-soft`; dark
 * theme does the opposite, since hover states brighten on a dark surface.
 */
export function derivePalette(base: HexColor, isDark: boolean): BrandPalette {
  return {
    brand: base,
    brandStrong: mix(base, isDark ? WHITE : '#000000', 0.26),
    brandSoft: mix(base, isDark ? '#000000' : WHITE, isDark ? 0.7 : 0.84),
    onBrand: pickOnColor(base),
  };
}
