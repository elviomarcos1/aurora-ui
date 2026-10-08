import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TextField } from './text-field';

@Component({
  selector: 'au-test-host',
  imports: [ReactiveFormsModule, TextField],
  template: `
    <au-text-field
      [formControl]="control"
      label="Medical record number"
      helpText="Printed on the patient wristband."
    />
  `,
})
class HostComponent {
  readonly control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}

describe('TextField', () => {
  it('renders the label as the input\'s accessible name', async () => {
    await render(HostComponent);

    expect(screen.getByRole('textbox', { name: 'Medical record number' })).toBeInTheDocument();
  });

  it('shows the help text when there is no error', async () => {
    await render(HostComponent);

    expect(screen.getByText('Printed on the patient wristband.')).toBeInTheDocument();
  });

  it('reflects the initial control value', async () => {
    await render(`<au-text-field [formControl]="control" label="MRN" />`, {
      imports: [ReactiveFormsModule, TextField],
      componentProperties: { control: new FormControl('AU-2041-7781', { nonNullable: true }) },
    });

    expect(screen.getByRole('textbox', { name: 'MRN' })).toHaveValue('AU-2041-7781');
  });

  it('types into the field and updates the bound FormControl', async () => {
    const control = new FormControl('', { nonNullable: true });
    await render(`<au-text-field [formControl]="control" label="MRN" />`, {
      imports: [ReactiveFormsModule, TextField],
      componentProperties: { control },
    });

    await userEvent.type(screen.getByRole('textbox', { name: 'MRN' }), 'AU-9');
    expect(control.value).toBe('AU-9');
  });

  it('marks the control touched on blur', async () => {
    const control = new FormControl('', { nonNullable: true });
    await render(`<au-text-field [formControl]="control" label="MRN" />`, {
      imports: [ReactiveFormsModule, TextField],
      componentProperties: { control },
    });

    expect(control.touched).toBe(false);
    const input = screen.getByRole('textbox', { name: 'MRN' });
    await userEvent.click(input);
    await userEvent.tab();
    expect(control.touched).toBe(true);
  });

  it('disables the input when the control is disabled', async () => {
    const control = new FormControl({ value: '', disabled: true }, { nonNullable: true });
    await render(`<au-text-field [formControl]="control" label="MRN" />`, {
      imports: [ReactiveFormsModule, TextField],
      componentProperties: { control },
    });

    expect(screen.getByRole('textbox', { name: 'MRN' })).toBeDisabled();
  });

  it('switches to the error state: aria-invalid, error text, and aria-describedby', async () => {
    await render(
      `<au-text-field [formControl]="control" label="Bed" errorText="Bed 4B-12 is occupied. Choose a free bed." />`,
      {
        imports: [ReactiveFormsModule, TextField],
        componentProperties: { control: new FormControl('4B-12', { nonNullable: true }) },
      },
    );

    const input = screen.getByRole('textbox', { name: 'Bed' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const error = screen.getByText('Bed 4B-12 is occupied. Choose a free bed.');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
  });

  it('prefers the error text over help text when both are set', async () => {
    await render(
      `<au-text-field [formControl]="control" label="Bed" helpText="help" errorText="error" />`,
      {
        imports: [ReactiveFormsModule, TextField],
        componentProperties: { control: new FormControl('', { nonNullable: true }) },
      },
    );

    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.queryByText('help')).not.toBeInTheDocument();
  });
});
