import type { Meta, StoryObj } from '@storybook/angular-vite';

import { AlertBanner } from './alert-banner';

const meta: Meta<AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['critical', 'info'] },
  },
};
export default meta;

type Story = StoryObj<AlertBanner>;

export const Critical: Story = {
  args: {
    variant: 'critical',
    title: 'SpO2 87% · Bed 4B-12',
    text: 'Below 90% for 2 minutes. Nurse on duty notified at 14:32.',
    acknowledgeLabel: 'Acknowledge',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: '3 discharges scheduled this afternoon',
    text: 'Beds 4B-14, 4B-19 and 5A-03 will be free after 16:30.',
  },
};

export const Stacked: Story = {
  render: () => ({
    moduleMetadata: { imports: [AlertBanner] },
    template: `
      <div class="stack">
        <au-alert-banner
          variant="critical"
          title="SpO2 87% · Bed 4B-12"
          text="Below 90% for 2 minutes. Nurse on duty notified at 14:32."
          acknowledgeLabel="Acknowledge"
        />
        <au-alert-banner
          variant="info"
          title="3 discharges scheduled this afternoon"
          text="Beds 4B-14, 4B-19 and 5A-03 will be free after 16:30."
        />
      </div>
    `,
    styles: [`.stack { display: flex; flex-direction: column; gap: var(--space-3); }`],
  }),
};
