import { render, screen } from '@testing-library/angular';

import { VitalSign } from './vital-sign';

describe('VitalSign', () => {
  it('renders the label, value and unit', async () => {
    await render(
      `<au-vital-sign label="Heart rate" [value]="78" unit="bpm" status="stable" />`,
      { imports: [VitalSign] },
    );

    expect(screen.getByText('Heart rate')).toBeInTheDocument();
    expect(screen.getByText('78')).toBeInTheDocument();
    expect(screen.getByText('bpm')).toBeInTheDocument();
  });

  it('accepts a composite string value like blood pressure', async () => {
    await render(
      `<au-vital-sign label="Blood pressure" value="142/91" unit="mmHg" status="warning" />`,
      { imports: [VitalSign] },
    );

    expect(screen.getByText('142/91')).toBeInTheDocument();
  });

  it('shows a default status label per status', async () => {
    await render(`<au-vital-sign label="Heart rate" [value]="78" status="stable" />`, {
      imports: [VitalSign],
    });

    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('accepts a statusLabel override', async () => {
    await render(
      `<au-vital-sign label="Heart rate" [value]="200" status="critical" statusLabel="Code blue" />`,
      { imports: [VitalSign] },
    );

    expect(screen.getByText('Code blue')).toBeInTheDocument();
    expect(screen.queryByText('Critical')).not.toBeInTheDocument();
  });

  it('applies au-vital--critical when status is critical', async () => {
    const { container } = await render(
      `<au-vital-sign label="SpO2" [value]="87" status="critical" />`,
      { imports: [VitalSign] },
    );
    expect(container.querySelector('.au-vital')).toHaveClass('au-vital--critical');
  });

  it('does not apply au-vital--critical for warning or stable', async () => {
    const { container } = await render(
      `<au-vital-sign label="Blood pressure" value="142/91" status="warning" />`,
      { imports: [VitalSign] },
    );
    expect(container.querySelector('.au-vital')).not.toHaveClass('au-vital--critical');
  });

  it('formats range as text when range is set and rangeText is not', async () => {
    await render(
      `<au-vital-sign label="Heart rate" [value]="78" status="stable" [range]="[60, 100]" />`,
      { imports: [VitalSign] },
    );

    expect(screen.getByText('Range 60-100')).toBeInTheDocument();
  });

  it('prefers rangeText over the formatted range', async () => {
    await render(
      `<au-vital-sign label="SpO2" [value]="87" status="critical" [range]="[90, 100]" rangeText="Below 90% for 2 min" />`,
      { imports: [VitalSign] },
    );

    expect(screen.getByText('Below 90% for 2 min')).toBeInTheDocument();
    expect(screen.queryByText('Range 90-100')).not.toBeInTheDocument();
  });

  it('renders no range line when neither range nor rangeText is set', async () => {
    const { container } = await render(
      `<au-vital-sign label="Heart rate" [value]="78" status="stable" />`,
      { imports: [VitalSign] },
    );

    expect(container.querySelector('.au-vital__range')).not.toBeInTheDocument();
  });

  it('renders the sparkline from history, with the dot on the last reading', async () => {
    const { container } = await render(
      `<au-vital-sign label="Heart rate" [value]="78" status="stable" [history]="[60, 100, 78]" />`,
      { imports: [VitalSign] },
    );

    const spark = container.querySelector('.au-vital__spark');
    expect(spark).toBeInTheDocument();
    expect(spark).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.au-vital__spark circle')).toHaveAttribute('cx', '240');
  });

  it('renders no sparkline when history is empty', async () => {
    const { container } = await render(
      `<au-vital-sign label="Heart rate" [value]="78" status="stable" />`,
      { imports: [VitalSign] },
    );

    expect(container.querySelector('.au-vital__spark')).not.toBeInTheDocument();
  });
});
