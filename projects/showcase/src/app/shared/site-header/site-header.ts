import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button, ThemeService } from '@aurora-hospital/ui';

/**
 * Site-wide header: wordmark, page navigation, external links and the
 * light/dark theme toggle. Used by every showcase page.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  protected readonly themeService = inject(ThemeService);
}
