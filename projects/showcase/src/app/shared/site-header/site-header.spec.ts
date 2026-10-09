import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';

import { SiteHeader } from './site-header';

function mockMatchMedia(prefersDark = false): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && prefersDark,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('SiteHeader', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  it('renders the wordmark and navigation links', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    expect(screen.getByAltText('Aurora Hospital')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Playground' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  });

  it('toggles the theme and flips the toggle label', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    const toggle = screen.getByRole('button', { name: /dark mode/i });
    await userEvent.click(toggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });
});
