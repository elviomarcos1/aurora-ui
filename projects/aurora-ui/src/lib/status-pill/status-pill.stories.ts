import type { Meta, StoryObj } from '@storybook/angular-vite';

import { StatusPill } from './status-pill';

interface StatusPillArgs {
  status: 'critical' | 'warning' | 'stable' | 'info';
  label: string;
}

const meta: Meta<StatusPillArgs> = {
  title: 'Components/StatusPill',
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: 'select', options: ['critical', 'warning', 'stable', 'info'] },
    label: { control: 'text' },
  },
  args: {
    status: 'critical',
    label: 'Critical',
  },
  render: (args) => ({
    props: args,
    imports: [StatusPill],
    template: `<au-status-pill [status]="status">{{ label }}</au-status-pill>`,
  }),
};
export default meta;

type Story = StoryObj<StatusPillArgs>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    imports: [StatusPill],
    template: `
      <div class="row">
        <au-status-pill status="critical">Critical</au-status-pill>
        <au-status-pill status="warning">Observation</au-status-pill>
        <au-status-pill status="stable">Stable</au-status-pill>
        <au-status-pill status="info">Discharge pending</au-status-pill>
      </div>
    `,
    styles: [`.row { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }`],
  }),
};
