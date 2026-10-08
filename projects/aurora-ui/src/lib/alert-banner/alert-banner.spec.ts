import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { AlertBanner } from './alert-banner';

describe('AlertBanner', () => {
  it('renders the title and text', async () => {
    await render(
      `<au-alert-banner variant="critical" title="SpO2 87% · Bed 4B-12" text="Below 90% for 2 minutes." />`,
      { imports: [AlertBanner] },
    );

    expect(screen.getByText('SpO2 87% · Bed 4B-12')).toBeInTheDocument();
    expect(screen.getByText('Below 90% for 2 minutes.')).toBeInTheDocument();
  });

  it('uses role="alert" for critical', async () => {
    await render(`<au-alert-banner variant="critical" title="Critical" />`, {
      imports: [AlertBanner],
    });

    expect(screen.getByRole('alert')).toHaveClass('au-alert--critical');
  });

  it('uses role="status" for info', async () => {
    await render(`<au-alert-banner variant="info" title="Info" />`, {
      imports: [AlertBanner],
    });

    expect(screen.getByRole('status')).toHaveClass('au-alert--info');
  });

  it('renders no acknowledge action when acknowledgeLabel is not set', async () => {
    await render(`<au-alert-banner variant="info" title="Info" />`, {
      imports: [AlertBanner],
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the acknowledge action and emits on click', async () => {
    const onAcknowledge = jest.fn();
    await render(
      `<au-alert-banner variant="critical" title="Critical" acknowledgeLabel="Acknowledge" (acknowledge)="onAcknowledge()" />`,
      { imports: [AlertBanner], componentProperties: { onAcknowledge } },
    );

    const button = screen.getByRole('button', { name: 'Acknowledge' });
    await userEvent.click(button);
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
