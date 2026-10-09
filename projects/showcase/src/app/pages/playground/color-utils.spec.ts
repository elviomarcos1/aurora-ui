import { contrastRatio, derivePalette } from './color-utils';

describe('contrastRatio', () => {
  it('is 21:1 for black on white', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
  });

  it('is 1:1 for a color against itself', () => {
    expect(contrastRatio('#0B6E69', '#0B6E69')).toBeCloseTo(1, 5);
  });

  it('is symmetric regardless of argument order', () => {
    expect(contrastRatio('#0B6E69', '#FFFFFF')).toBeCloseTo(
      contrastRatio('#FFFFFF', '#0B6E69'),
      5,
    );
  });
});

describe('derivePalette', () => {
  it('keeps the base color as brand', () => {
    expect(derivePalette('#0B6E69', false).brand).toBe('#0B6E69');
  });

  it('picks white text on a dark brand color', () => {
    expect(derivePalette('#0B6E69', false).onBrand).toBe('#FFFFFF');
  });

  it('picks dark ink text on a light brand color', () => {
    expect(derivePalette('#F2D98A', false).onBrand).toBe('#0F2624');
  });

  it('darkens brandStrong and lightens brandSoft in the light theme', () => {
    const palette = derivePalette('#0B6E69', false);

    expect(palette.brandStrong).not.toBe(palette.brand);
    expect(palette.brandSoft).not.toBe(palette.brand);
    // Compare the green channel (hex chars 3-5) against the base's 0x6E.
    const strongG = parseInt(palette.brandStrong.slice(3, 5), 16);
    const softG = parseInt(palette.brandSoft.slice(3, 5), 16);
    expect(strongG).toBeLessThan(0x6e);
    expect(softG).toBeGreaterThan(0x6e);
  });

  it('lightens brandStrong and darkens brandSoft in the dark theme', () => {
    const palette = derivePalette('#3CC4B7', true);

    const strongG = parseInt(palette.brandStrong.slice(3, 5), 16);
    const softG = parseInt(palette.brandSoft.slice(3, 5), 16);
    expect(strongG).toBeGreaterThan(0xc4);
    expect(softG).toBeLessThan(0xc4);
  });
});
