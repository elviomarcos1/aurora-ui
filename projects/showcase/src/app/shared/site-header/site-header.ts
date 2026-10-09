import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button, ThemeService } from '@aurora-hospital/ui';

/**
 * Site-wide header: logo mark, wordmark text, page navigation, external
 * links and the light/dark theme toggle. Used by every showcase page.
 *
 * Below 768px the navigation collapses behind a hamburger toggle, since the
 * 5 links plus the theme button no longer fit a single row on mobile. The
 * panel also closes on outside click and Escape.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly themeService = inject(ThemeService);

  /** Logo mark SVG for the current theme. */
  protected readonly markSrc = computed(() =>
    this.themeService.theme() === 'dark'
      ? 'assets/brand/aurora-mark-dark.svg'
      : 'assets/brand/aurora-mark-light.svg',
  );

  /** Whether the mobile navigation panel is expanded. */
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
}
