import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OccupancyMeter } from './occupancy-meter';

const meta: Meta<OccupancyMeter> = {
  title: 'Components/OccupancyMeter',
  component: OccupancyMeter,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<OccupancyMeter>;

export const Default: Story = {
  args: {
    label: 'Ward 4B · Cardiology',
    occupied: 18,
    capacity: 24,
    ariaLabel: 'Ward 4B occupancy',
  },
};

export const Warning: Story = {
  args: {
    label: 'ICU',
    occupied: 11,
    capacity: 12,
  },
};

export const Critical: Story = {
  args: {
    label: 'Emergency',
    occupied: 30,
    capacity: 30,
  },
};

export const AllBands: Story = {
  name: 'All bands',
  render: () => ({
    moduleMetadata: { imports: [OccupancyMeter] },
    template: `
      <div class="stack">
        <au-occupancy-meter label="Ward 4B · Cardiology" [occupied]="18" [capacity]="24" ariaLabel="Ward 4B occupancy" />
        <au-occupancy-meter label="ICU" [occupied]="11" [capacity]="12" />
        <au-occupancy-meter label="Emergency" [occupied]="30" [capacity]="30" />
      </div>
    `,
    styles: [`.stack { display: grid; gap: var(--space-4); max-width: 360px; }`],
  }),
};
