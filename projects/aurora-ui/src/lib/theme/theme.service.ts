import { DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, isDevMode, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** The two themes Aurora UI ships tokens for. */
export type AuroraTheme = 'light' | 'dark';

const STORAGE_KEY = 'aurora-ui-theme';

function isAuroraTheme(value: string | null): value is AuroraTheme {
  return value === 'light' || value === 'dark';
}

/**
 * Tracks the active Aurora UI theme and keeps it in sync with `data-theme`
 * on `<html>` and the user's stored preference.
 *
 * Reads the initial theme from `localStorage`, falling back to the OS
 * `prefers-color-scheme`. Every change is written back to both.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** The currently active theme. */
  readonly theme = signal<AuroraTheme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (!this.isBrowser) {
        return;
      }
      this.document.documentElement.setAttribute('data-theme', theme);
      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        if (isDevMode()) {
          console.warn('ThemeService: could not persist theme preference.', error);
        }
      }
    });
  }

  /** Sets the active theme explicitly. */
  setTheme(theme: AuroraTheme): void {
    this.theme.set(theme);
  }

  /** Flips between `light` and `dark`. */
  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private readInitialTheme(): AuroraTheme {
    if (!this.isBrowser) {
      return 'light';
    }

    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
      if (isAuroraTheme(stored)) {
        return stored;
      }
    } catch {
      // localStorage can be unavailable (private mode, blocked storage); fall through.
    }

    const prefersDark = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
}
