import type { Meta, StoryObj } from '@storybook/angular-vite';

import { AURORA_ICON_NAMES } from './icon-data';
import { Icon } from './icon';

const meta: Meta<Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'select', options: AURORA_ICON_NAMES },
    size: { control: 'inline-radio', options: [16, 20, 24, 32] },
  },
  args: {
    name: 'heart-pulse',
    size: 20,
  },
};
export default meta;

type Story = StoryObj<Icon>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="row">
        <au-icon name="heart-pulse" [size]="16" />
        <au-icon name="heart-pulse" [size]="20" />
        <au-icon name="heart-pulse" [size]="24" />
        <au-icon name="heart-pulse" [size]="32" />
      </div>
    `,
    styles: [
      `.row { display: flex; align-items: center; gap: var(--space-4); color: var(--ink); }`,
    ],
  }),
};

export const ColorFollowsText: Story = {
  name: 'Color follows text',
  render: () => ({
    template: `
      <div class="row">
        <span style="color: var(--ink)"><au-icon name="activity" [size]="24" /></span>
        <span style="color: var(--brand)"><au-icon name="heart-pulse" [size]="24" /></span>
        <span style="color: var(--critical)"><au-icon name="triangle-alert" [size]="24" /></span>
        <span style="color: var(--warning)"><au-icon name="circle-alert" [size]="24" /></span>
        <span style="color: var(--stable)"><au-icon name="circle-check" [size]="24" /></span>
        <span style="color: var(--info)"><au-icon name="info" [size]="24" /></span>
      </div>
    `,
    styles: [`.row { display: flex; align-items: center; gap: var(--space-4); }`],
  }),
};

function tile(name: string): string {
  return `<div class="tile"><au-icon name="${name}" [size]="24" /><span>${name}</span></div>`;
}

export const Gallery: Story = {
  render: () => ({
    template: `<div class="grid">${AURORA_ICON_NAMES.map(tile).join('')}</div>`,
    styles: [
      `
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: var(--space-2); }
      .tile {
        display: grid;
        justify-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-1);
        background: var(--surface-1);
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        color: var(--ink);
      }
      .tile span { font: 500 11px/14px var(--font-mono); color: var(--ink-muted); text-align: center; word-break: break-word; }
    `,
    ],
  }),
};
