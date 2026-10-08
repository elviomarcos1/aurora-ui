import type { Meta, StoryObj } from '@storybook/angular-vite';

import { LiveVitalSignDemo } from './live-vital-sign-demo';
import { VitalSign } from './vital-sign';

const meta: Meta<VitalSign> = {
  title: 'Components/VitalSign',
  component: VitalSign,
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: 'select', options: ['stable', 'warning', 'critical'] },
  },
};
export default meta;

type Story = StoryObj<VitalSign>;

export const Stable: Story = {
  args: {
    label: 'Heart rate',
    value: 78,
    unit: 'bpm',
    status: 'stable',
    range: [60, 100],
    history: [68, 62, 65, 79, 71, 83, 76, 68, 76],
  },
};

export const Critical: Story = {
  args: {
    label: 'SpO2',
    value: 87,
    unit: '%',
    status: 'critical',
    rangeText: 'Below 90% for 2 min',
    history: [99, 98, 98, 95, 93, 90, 89, 88, 87],
  },
};

export const Warning: Story = {
  args: {
    label: 'Blood pressure',
    value: '142/91',
    unit: 'mmHg',
    status: 'warning',
    rangeText: 'Target under 140/90',
    history: [110, 116, 114, 123, 129, 127, 134, 136, 142],
  },
};

export const NoTrend: Story = {
  name: 'No trend data',
  args: {
    label: 'Temperature',
    value: 37.1,
    unit: '°C',
    status: 'stable',
    range: [36.1, 37.2],
  },
};

export const Gallery: Story = {
  render: () => ({
    moduleMetadata: { imports: [VitalSign] },
    template: `
      <div class="grid">
        <au-vital-sign
          label="Heart rate" [value]="78" unit="bpm" status="stable"
          [range]="[60, 100]" [history]="[68, 62, 65, 79, 71, 83, 76, 68, 76]"
        />
        <au-vital-sign
          label="SpO2" [value]="87" unit="%" status="critical"
          rangeText="Below 90% for 2 min" [history]="[99, 98, 98, 95, 93, 90, 89, 88, 87]"
        />
        <au-vital-sign
          label="Blood pressure" value="142/91" unit="mmHg" status="warning"
          rangeText="Target under 140/90" [history]="[110, 116, 114, 123, 129, 127, 134, 136, 142]"
        />
      </div>
    `,
    styles: [
      `.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); }`,
    ],
  }),
};

export const Live: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Fed by `MockVitalsService` (RxJS `interval`), purely for this demo — the value and sparkline drift on their own every 1.5s. The mono, tabular-numeral value never shifts digits while it updates.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [LiveVitalSignDemo] },
    template: `<au-live-vital-sign-demo />`,
  }),
};
