import { render, screen } from '@testing-library/angular';

import { OccupancyMeter } from './occupancy-meter';

describe('OccupancyMeter', () => {
  it('shows the exact count next to the bar', async () => {
    await render(`<au-occupancy-meter label="Ward 4B" [occupied]="18" [capacity]="24" />`, {
      imports: [OccupancyMeter],
    });

    expect(screen.getByText('18/24')).toBeInTheDocument();
  });

  it('exposes role="meter" with the computed percentage and a default accessible name', async () => {
    await render(`<au-occupancy-meter label="Ward 4B" [occupied]="18" [capacity]="24" />`, {
      imports: [OccupancyMeter],
    });

    const meter = screen.getByRole('meter', { name: 'Ward 4B occupancy' });
    expect(meter).toHaveAttribute('aria-valuenow', '75');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('accepts an explicit ariaLabel override', async () => {
    await render(
      `<au-occupancy-meter label="Ward 4B · Cardiology" [occupied]="18" [capacity]="24" ariaLabel="Ward 4B occupancy" />`,
      { imports: [OccupancyMeter] },
    );

    expect(screen.getByRole('meter', { name: 'Ward 4B occupancy' })).toBeInTheDocument();
  });

  it('stays in the default (brand) band under 85%', async () => {
    const { container } = await render(
      `<au-occupancy-meter label="Ward 4B" [occupied]="18" [capacity]="24" />`,
      { imports: [OccupancyMeter] },
    );

    const meterRoot = container.querySelector('.au-meter');
    expect(meterRoot).not.toHaveClass('au-meter--warning');
    expect(meterRoot).not.toHaveClass('au-meter--critical');
  });

  it('switches to the warning band between 85% and 99%', async () => {
    const { container } = await render(
      `<au-occupancy-meter label="ICU" [occupied]="11" [capacity]="12" />`,
      { imports: [OccupancyMeter] },
    );

    expect(container.querySelector('.au-meter')).toHaveClass('au-meter--warning');
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '92');
  });

  it('switches to the critical band when full', async () => {
    const { container } = await render(
      `<au-occupancy-meter label="Emergency" [occupied]="30" [capacity]="30" />`,
      { imports: [OccupancyMeter] },
    );

    expect(container.querySelector('.au-meter')).toHaveClass('au-meter--critical');
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100');
  });
});
