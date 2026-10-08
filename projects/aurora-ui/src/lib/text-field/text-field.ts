import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

/** Native `<input>` types TextField supports. */
export type TextFieldType = 'text' | 'email' | 'tel' | 'number' | 'password';

let nextFieldId = 0;

/**
 * A labelled single-line text input with helper or error text, built as a
 * `ControlValueAccessor` so it drops into Reactive Forms (`formControlName`
 * or `[formControl]`).
 *
 * The error message is not derived automatically from validators — pass the
 * message you want via `errorText`, computed from `control.errors` wherever
 * you know the domain-specific copy (e.g. "Bed 4B-12 is occupied").
 */
@Component({
  selector: 'au-text-field',
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField),
      multi: true,
    },
  ],
})
export class TextField implements ControlValueAccessor {
  /** Label shown above the field. Always visible — never replaced by a placeholder. */
  readonly label = input.required<string>();

  /** Helper text shown below the field when there is no error. */
  readonly helpText = input<string>();

  /** Error message. When set, the field switches to its error state. */
  readonly errorText = input<string>();

  /** Native `type` attribute. */
  readonly type = input<TextFieldType>('text');

  /** Optional placeholder — an example of the expected format, not a label substitute. */
  readonly placeholder = input<string>();

  protected readonly fieldId = `au-text-field-${++nextFieldId}`;
  protected readonly helpId = `${this.fieldId}-help`;
  protected readonly errorId = `${this.fieldId}-error`;

  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  protected readonly describedBy = computed<string | null>(() => {
    if (this.errorText()) {
      return this.errorId;
    }
    if (this.helpText()) {
      return this.helpId;
    }
    return null;
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function -- replaced by registerOnChange
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- replaced by registerOnTouched
  protected onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected handleInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }
}
