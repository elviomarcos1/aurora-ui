import type { Meta, StoryObj } from '@storybook/angular-vite';

interface SpaceToken {
  readonly cssVar: string;
  readonly description: string;
}

/** Mirrors `design/tokens/base.json`. A 4px grid. */
const spacing: readonly SpaceToken[] = [
  { cssVar: '--space-1', description: 'Icon-to-text gap, pill inner gap.' },
  { cssVar: '--space-2', description: 'Gap between related controls.' },
  { cssVar: '--space-3', description: 'Pill and input horizontal padding.' },
  { cssVar: '--space-4', description: 'Card padding on dense dashboards.' },
  { cssVar: '--space-6', description: 'Card padding, gap between cards.' },
  { cssVar: '--space-8', description: 'Section spacing.' },
];

interface RadiusToken {
  readonly cssVar: string;
  readonly description: string;
}

const radii: readonly RadiusToken[] = [
  { cssVar: '--radius-sm', description: 'Inputs, small buttons, chips.' },
  { cssVar: '--radius-md', description: 'Buttons, banners.' },
  { cssVar: '--radius-lg', description: 'Cards and panels. Matches the logo mark.' },
  { cssVar: '--radius-pill', description: 'Status pills and meters.' },
];

function spaceRow(token: SpaceToken): string {
  return `
    <div class="space-row">
      <div class="space-bar" style="width: var(${token.cssVar})"></div>
      <div class="space-name">${token.cssVar}</div>
      <div class="space-desc">${token.description}</div>
    </div>`;
}

function radiusSwatch(token: RadiusToken): string {
  return `
    <div class="swatch">
      <div class="swatch__chip" style="border-radius: var(${token.cssVar})"></div>
      <div class="swatch__name">${token.cssVar}</div>
      <div class="swatch__desc">${token.description}</div>
    </div>`;
}

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Spacing: Story = {
  render: () => ({
    template: `
      <div class="page">
        <section class="group">
          <h2>Space — 4px grid</h2>
          <div class="stack">${spacing.map(spaceRow).join('')}</div>
        </section>

        <section class="group">
          <h2>Radius</h2>
          <div class="row">${radii.map(radiusSwatch).join('')}</div>
        </section>
      </div>
    `,
    styles: [
      `
      .page { color: var(--ink); }
      .group { margin-bottom: var(--space-8); }
      .group h2 { font: 600 16px/24px var(--font-sans); margin: 0 0 var(--space-4); }
      .stack { display: flex; flex-direction: column; gap: var(--space-3); }
      .space-row { display: grid; grid-template-columns: 160px 120px 1fr; align-items: center; gap: var(--space-3); }
      .space-bar { height: 16px; background: var(--brand); border-radius: 2px; }
      .space-name { font: 600 13px/18px var(--font-mono); }
      .space-desc { font: 400 13px/18px var(--font-sans); color: var(--ink-muted); }
      .row { display: flex; flex-wrap: wrap; gap: var(--space-4); }
      .swatch { width: 160px; }
      .swatch__chip {
        height: 64px;
        background: var(--surface-2);
        border: 1px solid var(--line-strong);
        margin-bottom: var(--space-2);
      }
      .swatch__name { font: 600 13px/18px var(--font-mono); }
      .swatch__desc { font: 400 12px/16px var(--font-sans); color: var(--ink-muted); }
    `,
    ],
  }),
};
