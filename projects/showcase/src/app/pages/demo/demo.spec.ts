import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';

import { Demo } from './demo';

function mockMatchMedia(prefersDark = false): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && prefersDark,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('Demo', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  async function setup() {
    return render(Demo, { providers: [provideRouter([])] });
  }

  it('renders the ward title and the occupancy summary', async () => {
    await setup();

    expect(screen.getByRole('heading', { level: 1, name: 'Ward 4B · Cardiology' })).toBeInTheDocument();

    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '75');
    expect(screen.getByText('9/12')).toBeInTheDocument();
  });

  it('renders every bed, including the three free beds', async () => {
    await setup();

    expect(screen.getByText('R. Nakamura, 72')).toBeInTheDocument();
    expect(screen.getByText('H. Tanaka, 66')).toBeInTheDocument();
    expect(screen.getAllByText('Ready for admission')).toHaveLength(3);
  });

  it('acknowledges the critical alert on click', async () => {
    await setup();

    const acknowledge = screen.getByRole('button', { name: 'Acknowledge' });
    await userEvent.click(acknowledge);

    expect(screen.getByRole('button', { name: 'Acknowledged' })).toBeInTheDocument();
  });

  it('starts the live vitals panel at the baseline readings', async () => {
    await setup();

    const vitals = screen.getByRole('region', { name: 'Live vitals, Bed 4B-01' });
    expect(within(vitals).getByText('87')).toBeInTheDocument();
    expect(within(vitals).getByText('112')).toBeInTheDocument();
  });

  it('keeps live vitals within their configured range over time', async () => {
    jest.useFakeTimers();
    await setup();

    for (let i = 0; i < 5; i++) {
      jest.advanceTimersByTime(2000);
    }

    const vitals = screen.getByRole('region', { name: 'Live vitals, Bed 4B-01' });
    const spo2 = Number(within(vitals).getAllByText(/^\d+(\.\d+)?$/)[0].textContent);
    expect(spo2).toBeGreaterThanOrEqual(83);
    expect(spo2).toBeLessThanOrEqual(93);

    jest.useRealTimers();
  });
});
