import { render, screen } from '@testing-library/angular';

import { BedCard } from './bed-card';

describe('BedCard', () => {
  it('renders the bed code and patient name', async () => {
    await render(`<au-bed-card code="4B-12" name="M. Oliveira, 67" />`, {
      imports: [BedCard],
    });

    expect(screen.getByText('4B-12')).toBeInTheDocument();
    expect(screen.getByText('M. Oliveira, 67')).toBeInTheDocument();
  });

  it('renders the status pill with the au-bed--{status} stripe class', async () => {
    const { container } = await render(
      `<au-bed-card code="4B-12" name="M. Oliveira, 67" status="critical" statusLabel="Critical" />`,
      { imports: [BedCard] },
    );

    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(container.querySelector('.au-bed')).toHaveClass('au-bed--critical');
  });

  it('renders the full meta line: diagnosis, mono day of stay, next event', async () => {
    const { container } = await render(
      `<au-bed-card code="4B-12" name="M. Oliveira, 67" diagnosis="Post-op cardiac" dayOfStay="Day 2" nextEvent="Visit due 15:00" />`,
      { imports: [BedCard] },
    );

    expect(screen.getByText('Post-op cardiac')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toHaveClass('au-num');
    expect(screen.getByText('Visit due 15:00')).toBeInTheDocument();
    expect(container.querySelector('.au-bed__meta')).toBeInTheDocument();
  });

  it('renders no meta line when nothing is set', async () => {
    const { container } = await render(`<au-bed-card code="4B-15" name="Available" />`, {
      imports: [BedCard],
    });

    expect(container.querySelector('.au-bed__meta')).not.toBeInTheDocument();
  });

  describe('free bed', () => {
    it('shows no status pill, even if status is set', async () => {
      await render(
        `<au-bed-card code="4B-15" name="Available · cleaned 13:10" [free]="true" status="critical" statusLabel="Critical" />`,
        { imports: [BedCard] },
      );

      expect(screen.queryByText('Critical')).not.toBeInTheDocument();
    });

    it('applies au-bed--free instead of any status stripe', async () => {
      const { container } = await render(
        `<au-bed-card code="4B-15" name="Available · cleaned 13:10" [free]="true" diagnosis="Ready for admission" />`,
        { imports: [BedCard] },
      );

      const bed = container.querySelector('.au-bed');
      expect(bed).toHaveClass('au-bed--free');
      expect(bed?.className).not.toMatch(/au-bed--(critical|warning|stable|info)\b/);
      expect(screen.getByText('Ready for admission')).toBeInTheDocument();
    });
  });
});
