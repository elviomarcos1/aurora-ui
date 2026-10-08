import type { Meta, StoryObj } from '@storybook/angular-vite';

interface ColorToken {
  readonly cssVar: string;
  readonly description: string;
}

interface ColorGroup {
  readonly name: string;
  readonly tokens: readonly ColorToken[];
}

/**
 * Mirrors `design/tokens/base.json` + `light.json` / `dark.json`. Swatches read the
 * CSS variables directly, so switching the toolbar theme re-paints every value here —
 * there is nothing to keep in sync by hand.
 */
const groups: readonly ColorGroup[] = [
  {
    name: 'Surfaces',
    tokens: [
      { cssVar: '--surface-0', description: 'Page background behind every screen.' },
      { cssVar: '--surface-1', description: 'Cards, panels, table rows.' },
      { cssVar: '--surface-2', description: 'Sunken areas: inputs, track of meters.' },
      { cssVar: '--line', description: 'Hairline borders and dividers. Decorative only.' },
      { cssVar: '--line-strong', description: 'Control borders (inputs, secondary buttons).' },
    ],
  },
  {
    name: 'Text',
    tokens: [
      { cssVar: '--ink', description: 'Primary text. 14:1+ in both themes.' },
      { cssVar: '--ink-muted', description: 'Secondary text, labels, timestamps.' },
    ],
  },
  {
    name: 'Brand',
    tokens: [
      { cssVar: '--brand', description: 'Primary actions, links, selected states.' },
      { cssVar: '--brand-strong', description: 'Hover/pressed for brand.' },
      { cssVar: '--brand-soft', description: 'Selected rows, brand tints.' },
      { cssVar: '--on-brand', description: 'Text and icons on a brand fill.' },
    ],
  },
  {
    name: 'Dawn',
    tokens: [
      { cssVar: '--dawn', description: 'Brand moments only — logo, cover, hero. Never status.' },
      { cssVar: '--dawn-soft', description: 'Warm tint for onboarding and empty states.' },
    ],
  },
  {
    name: 'Critical',
    tokens: [
      { cssVar: '--critical', description: 'Critical patient status, destructive actions.' },
      { cssVar: '--critical-soft', description: 'Background of critical alerts and pills.' },
      { cssVar: '--on-critical', description: 'Text on a critical fill.' },
    ],
  },
  {
    name: 'Warning',
    tokens: [
      { cssVar: '--warning', description: 'Under observation, values approaching limits.' },
      { cssVar: '--warning-soft', description: 'Background of warning pills and banners.' },
    ],
  },
  {
    name: 'Stable',
    tokens: [
      { cssVar: '--stable', description: 'Stable patient, values in range, success.' },
      { cssVar: '--stable-soft', description: 'Background of stable pills.' },
    ],
  },
  {
    name: 'Info',
    tokens: [
      { cssVar: '--info', description: 'Neutral information: discharge pending, transfers.' },
      { cssVar: '--info-soft', description: 'Background of info pills and banners.' },
    ],
  },
  {
    name: 'Focus',
    tokens: [{ cssVar: '--focus-ring', description: '2px solid ring, 2px offset, on focus.' }],
  },
];

function swatch(token: ColorToken): string {
  return `
    <div class="swatch">
      <div class="swatch__chip" style="background: var(${token.cssVar})"></div>
      <div class="swatch__name">${token.cssVar}</div>
      <div class="swatch__desc">${token.description}</div>
    </div>`;
}

function section(group: ColorGroup): string {
  return `
    <section class="group">
      <h2>${group.name}</h2>
      <div class="row">${group.tokens.map(swatch).join('')}</div>
    </section>`;
}

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Colors: Story = {
  render: () => ({
    template: `<div class="page">${groups.map(section).join('')}</div>`,
    styles: [
      `
      .page { font-family: var(--font-sans); color: var(--ink); }
      .group { margin-bottom: var(--space-8); }
      .group h2 { font: 600 16px/24px var(--font-sans); margin: 0 0 var(--space-4); }
      .row { display: flex; flex-wrap: wrap; gap: var(--space-4); }
      .swatch { width: 160px; }
      .swatch__chip {
        height: 64px;
        border-radius: var(--radius-md);
        border: 1px solid var(--line);
        margin-bottom: var(--space-2);
      }
      .swatch__name { font: 600 13px/18px var(--font-mono); }
      .swatch__desc { font: 400 12px/16px var(--font-sans); color: var(--ink-muted); }
    `,
    ],
  }),
};
