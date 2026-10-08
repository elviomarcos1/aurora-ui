import { render, screen } from '@testing-library/angular';

import { AURORA_ICON_NAMES } from './icon-data';
import { Icon } from './icon';

describe('Icon', () => {
  it.each(AURORA_ICON_NAMES)('renders the "%s" icon without error', async (name) => {
    const { container } = await render(Icon, { inputs: { name } });
    expect(
      container.querySelector('svg path, svg circle, svg line, svg polyline, svg rect, svg polygon'),
    ).toBeTruthy();
  });

  it('defaults to a 20px icon with a 2px stroke', async () => {
    await render(Icon, { inputs: { name: 'bed' } });

    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('resizes and uses a thinner stroke at 32px', async () => {
    await render(Icon, { inputs: { name: 'bed', size: 32 } });

    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('stroke-width', '1.75');
  });

  it('keeps a 2px stroke at 16 and 24px', async () => {
    await render(Icon, { inputs: { name: 'bed', size: 16 } });
    expect(document.querySelector('svg')).toHaveAttribute('stroke-width', '2');
  });

  it('is always decorative', async () => {
    await render(Icon, { inputs: { name: 'triangle-alert' } });

    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('is not exposed to the accessibility tree', async () => {
    await render(Icon, { inputs: { name: 'circle-check' } });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
