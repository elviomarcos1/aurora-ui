import type { Meta, StoryObj } from '@storybook/angular-vite';

import { Button } from './button';

interface ButtonArgs {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  label: string;
  icon?: string;
  disabled: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    label: { control: 'text' },
    icon: { control: 'text', description: 'Optional icon name, e.g. "plus"' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    label: 'Admit patient',
    icon: 'plus',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [Button] },
    template: `
      <au-button [variant]="variant" [icon]="icon" [disabled]="disabled">{{ label }}</au-button>
    `,
  }),
};
export default meta;

type Story = StoryObj<ButtonArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    moduleMetadata: { imports: [Button] },
    template: `
      <div class="row">
        <au-button variant="primary" icon="plus">Admit patient</au-button>
        <au-button variant="secondary" icon="file-text">View history</au-button>
        <au-button variant="ghost" icon="bed">Assign bed</au-button>
        <au-button variant="danger" icon="x">Cancel surgery</au-button>
      </div>
    `,
    styles: [`.row { display: flex; flex-wrap: wrap; gap: var(--space-3); }`],
  }),
};

export const IconOnly: Story = {
  name: 'Icon only',
  render: () => ({
    moduleMetadata: { imports: [Button] },
    template: `
      <div class="row">
        <au-button variant="secondary" icon="search" ariaLabel="Search patients" />
        <au-button variant="ghost" icon="settings" ariaLabel="Open settings" />
        <au-button variant="danger" icon="x" ariaLabel="Close alert" />
      </div>
    `,
    styles: [`.row { display: flex; gap: var(--space-3); }`],
  }),
};

export const Disabled: Story = {
  render: () => ({
    moduleMetadata: { imports: [Button] },
    template: `
      <div class="row">
        <au-button variant="primary" [disabled]="true">Discharge</au-button>
        <au-button variant="secondary" [disabled]="true">View history</au-button>
      </div>
    `,
    styles: [`.row { display: flex; gap: var(--space-3); }`],
  }),
};
