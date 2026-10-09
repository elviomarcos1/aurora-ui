import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Home } from './home';

function mockMatchMedia(prefersDark = false): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && prefersDark,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  it('renders the headline and every component example', async () => {
    await render(Home);

    expect(
      screen.getByRole('heading', { level: 1, name: /moments that can't wait/i }),
    ).toBeInTheDocument();

    for (const title of [
      'StatusPill',
      'Button',
      'BedCard',
      'VitalSign',
      'AlertBanner',
      'OccupancyMeter',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('toggles the theme and flips the toggle label', async () => {
    await render(Home);

    const toggle = screen.getByRole('button', { name: /dark mode/i });
    await userEvent.click(toggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });

  it('acknowledges the demo alert banner on click', async () => {
    await render(Home);

    const acknowledge = screen.getByRole('button', { name: 'Acknowledge' });
    await userEvent.click(acknowledge);

    expect(screen.getByRole('button', { name: 'Acknowledged' })).toBeInTheDocument();
  });
});
