import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

const STORAGE_KEY = 'aurora-ui-theme';

function mockMatchMedia(prefersDark: boolean): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && prefersDark,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  function create(): ThemeService {
    return TestBed.inject(ThemeService);
  }

  it('defaults to light when there is no stored preference and the OS prefers light', () => {
    const service = create();

    expect(service.theme()).toBe('light');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('defaults to dark when the OS prefers dark and nothing is stored', () => {
    mockMatchMedia(true);

    const service = create();

    expect(service.theme()).toBe('dark');
  });

  it('reads a previously stored theme over the OS preference', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    mockMatchMedia(false);

    const service = create();

    expect(service.theme()).toBe('dark');
  });

  it('setTheme updates the signal, the data-theme attribute and localStorage', () => {
    const service = create();

    service.setTheme('dark');
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('toggleTheme flips between light and dark', () => {
    const service = create();

    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');

    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });
});
