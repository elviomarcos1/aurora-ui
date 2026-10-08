import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { TextField } from './text-field';

const meta: Meta = {
  title: 'Components/TextField',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    props: { control: new FormControl('', { nonNullable: true }) },
    moduleMetadata: { imports: [ReactiveFormsModule, TextField] },
    template: `<au-text-field [formControl]="control" label="Medical record number" helpText="Printed on the patient wristband." />`,
  }),
};

export const WithValue: Story = {
  name: 'With a value',
  render: () => ({
    props: { control: new FormControl('AU-2041-7781', { nonNullable: true }) },
    moduleMetadata: { imports: [ReactiveFormsModule, TextField] },
    template: `<au-text-field [formControl]="control" label="Medical record number" helpText="Printed on the patient wristband." />`,
  }),
};

export const ErrorState: Story = {
  name: 'Error',
  render: () => ({
    props: { control: new FormControl('4B-12', { nonNullable: true }) },
    moduleMetadata: { imports: [ReactiveFormsModule, TextField] },
    template: `<au-text-field [formControl]="control" label="Bed" errorText="Bed 4B-12 is occupied. Choose a free bed." />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { control: new FormControl({ value: 'AU-2041-7781', disabled: true }, { nonNullable: true }) },
    moduleMetadata: { imports: [ReactiveFormsModule, TextField] },
    template: `<au-text-field [formControl]="control" label="Medical record number" helpText="Printed on the patient wristband." />`,
  }),
};
