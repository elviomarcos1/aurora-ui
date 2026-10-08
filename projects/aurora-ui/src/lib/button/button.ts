import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';
import type { AuroraIconName } from '../icon/icon-data';

/** Visual style. Use `primary` once per view; `danger` only for destructive actions. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/** Native `<button>` `type` attribute. */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Triggers an action. Wraps a native `<button>`, so clicks, keyboard activation
 * (Space/Enter) and the disabled state all come from the browser for free.
 *
 * For an icon-only button (no projected label), set `ariaLabel` — the icon
 * itself is always decorative.
 */
@Component({
  selector: 'au-button',
  imports: [Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /** Visual style of the button. */
  readonly variant = input<ButtonVariant>('primary');

  /** Optional icon shown before the label. */
  readonly icon = input<AuroraIconName>();

  /** Native `type` attribute. */
  readonly type = input<ButtonType>('button');

  /** Disables the button: dims it, blocks clicks and removes it from tab order. */
  readonly disabled = input(false);

  /** Accessible name. Required when the button has no visible text label. */
  readonly ariaLabel = input<string>();
}
