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

    expect(screen.getByRole('link', { name: 'Aurora Hospital' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Playground' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  });

  it('swaps the logo mark for the current theme', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    const logo = screen.getByRole('link', { name: 'Aurora Hospital' });
    const img = logo.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('assets/brand/aurora-mark-light.svg');

    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }));
    expect(img.getAttribute('src')).toBe('assets/brand/aurora-mark-dark.svg');
  });

  it('toggles the theme and flips the toggle label', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    const toggle = screen.getByRole('button', { name: /dark mode/i });
    await userEvent.click(toggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });

  it('expands and collapses the mobile menu', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    const menuToggle = screen.getByRole('button', { name: 'Open menu' });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(menuToggle);

    const closeToggle = screen.getByRole('button', { name: 'Close menu' });
    expect(closeToggle).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(closeToggle);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('closes the mobile menu after a navigation link is clicked', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: 'GitHub' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('closes the mobile menu when clicking outside of it', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('closes the mobile menu on Escape', async () => {
    await render(SiteHeader, { providers: [provideRouter([])] });

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
