import type { Meta, StoryObj } from '@storybook/angular-vite';

import { BedCard } from './bed-card';

const meta: Meta<BedCard> = {
  title: 'Components/BedCard',
  component: BedCard,
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: 'select', options: ['critical', 'warning', 'stable', 'info'] },
  },
};
export default meta;

type Story = StoryObj<BedCard>;

export const Critical: Story = {
  args: {
    code: '4B-12',
    name: 'M. Oliveira, 67',
    status: 'critical',
    statusLabel: 'Critical',
    diagnosis: 'Post-op cardiac',
    dayOfStay: 'Day 2',
    nextEvent: 'Visit due 15:00',
  },
};

export const Stable: Story = {
  args: {
    code: '4B-13',
    name: 'A. Santos, 45',
    status: 'stable',
    statusLabel: 'Stable',
    diagnosis: 'Pneumonia',
    dayOfStay: 'Day 4',
    nextEvent: 'Visited 09:40',
  },
};

export const Info: Story = {
  args: {
    code: '4B-14',
    name: 'L. Ferreira, 31',
    status: 'info',
    statusLabel: 'Discharge pending',
    diagnosis: 'Appendectomy',
    dayOfStay: 'Day 3',
    nextEvent: 'Discharge 16:30',
  },
};

export const Free: Story = {
  args: {
    code: '4B-15',
    name: 'Available · cleaned 13:10',
    free: true,
    diagnosis: 'Ready for admission',
  },
};

export const Board: Story = {
  name: 'Ward board',
  render: () => ({
    moduleMetadata: { imports: [BedCard] },
    template: `
      <div class="grid">
        <au-bed-card code="4B-12" name="M. Oliveira, 67" status="critical" statusLabel="Critical"
          diagnosis="Post-op cardiac" dayOfStay="Day 2" nextEvent="Visit due 15:00" />
        <au-bed-card code="4B-13" name="A. Santos, 45" status="stable" statusLabel="Stable"
          diagnosis="Pneumonia" dayOfStay="Day 4" nextEvent="Visited 09:40" />
        <au-bed-card code="4B-14" name="L. Ferreira, 31" status="info" statusLabel="Discharge pending"
          diagnosis="Appendectomy" dayOfStay="Day 3" nextEvent="Discharge 16:30" />
        <au-bed-card code="4B-15" name="Available · cleaned 13:10" [free]="true" diagnosis="Ready for admission" />
      </div>
    `,
    styles: [
      `.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); }`,
    ],
  }),
};
