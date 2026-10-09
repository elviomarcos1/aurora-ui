import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ControlDef } from './control-def';

/**
 * Renders one form control per `ControlDef`, generic across every component
 * in the playground's explorer: text/number inputs, a select for enums, a
 * checkbox for booleans. Each control already carries its own typed setter,
 * so this component never needs to know which component it belongs to.
 */
@Component({
  selector: 'app-prop-controls',
  templateUrl: './prop-controls.html',
  styleUrl: './prop-controls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropControls {
  readonly controls = input.required<ControlDef[]>();

  protected onTextInput(control: ControlDef, event: Event): void {
    if (control.kind !== 'text') return;
    control.set((event.target as HTMLInputElement).value);
  }

  protected onNumberInput(control: ControlDef, event: Event): void {
    if (control.kind !== 'number') return;
    const value = Number((event.target as HTMLInputElement).value);
    control.set(Number.isNaN(value) ? 0 : value);
  }

  protected onSelectInput(control: ControlDef, event: Event): void {
    if (control.kind !== 'select') return;
    control.set((event.target as HTMLSelectElement).value);
  }

  protected onBooleanInput(control: ControlDef, event: Event): void {
    if (control.kind !== 'boolean') return;
    control.set((event.target as HTMLInputElement).checked);
  }
}
