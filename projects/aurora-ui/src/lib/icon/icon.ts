import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { AURORA_ICON_PATHS, type AuroraIconName } from './icon-data';

/** Pixel sizes Aurora icons ship: 16 in pills/tables, 20 default, 24 in headers, 32 in empty states. */
export type AuroraIconSize = 16 | 20 | 24 | 32;

/**
 * Renders one of the 39 curated Lucide icons (`docs/design-system/icons.txt`).
 *
 * Always decorative (`aria-hidden="true"`): colour and meaning come from
 * `currentColor` and the text around it. An icon-only control must put its
 * own `aria-label` on itself, not on this component.
 */
@Component({
  selector: 'au-icon',
  template: `<svg
    [attr.width]="size()"
    [attr.height]="size()"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    [attr.stroke-width]="strokeWidth()"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    [innerHTML]="markup()"
  ></svg>`,
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);

  /** Which curated icon to draw. */
  readonly name = input.required<AuroraIconName>();

  /** Icon size in pixels. Also sets the stroke width (32px uses a thinner 1.75 stroke). */
  readonly size = input<AuroraIconSize>(20);

  protected readonly strokeWidth = computed(() => (this.size() === 32 ? 1.75 : 2));

  protected readonly markup = computed<SafeHtml>(() =>
    // Safe: AURORA_ICON_PATHS is a fixed, compile-time constant we author ourselves,
    // never user input, so bypassing the sanitizer here can't introduce injected HTML.
    this.sanitizer.bypassSecurityTrustHtml(AURORA_ICON_PATHS[this.name()]),
  );
}
