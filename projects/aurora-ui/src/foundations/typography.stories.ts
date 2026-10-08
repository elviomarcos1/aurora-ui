import type { Meta, StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Typography: Story = {
  render: () => ({
    template: `
      <div class="page">
        <section class="group">
          <h2>Display — Bricolage Grotesque</h2>
          <p class="hint">Screen titles and heroes. Used sparingly.</p>
          <div class="display" style="font-size: 32px; line-height: 40px; font-weight: 700;">Ward 4B — Occupancy</div>
          <div class="display" style="font-size: 24px; line-height: 32px; font-weight: 600;">Ward 4B — Occupancy</div>
          <div class="display" style="font-size: 20px; line-height: 28px; font-weight: 600;">Ward 4B — Occupancy</div>
        </section>

        <section class="group">
          <h2>Sans — Figtree</h2>
          <p class="hint">Everything people read: labels, body text, helper text.</p>
          <div class="sans" style="font-size: 16px; line-height: 24px; font-weight: 600;">16/24 · 600 — Bed 12, Room 4B</div>
          <div class="sans" style="font-size: 15px; line-height: 22px; font-weight: 400;">15/22 · 400 — SpO₂ below 90% for 2 min</div>
          <div class="sans" style="font-size: 14px; line-height: 20px; font-weight: 600;">14/20 · 600 — 3 beds free in Ward 4B</div>
          <div class="sans" style="font-size: 13px; line-height: 18px; font-weight: 400;">13/18 · 400 — Last updated 14:32</div>
          <div class="sans" style="font-size: 12px; line-height: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em;">12/16 · 600 uppercase — Heart rate</div>
        </section>

        <section class="group">
          <h2>Mono — IBM Plex Mono</h2>
          <p class="hint">Every live number: vitals, bed codes, times. Always with <code>font-variant-numeric: tabular-nums</code> so digits never jump.</p>
          <div class="num" style="font-size: 40px; line-height: 44px; font-weight: 500;">88<span class="unit">bpm</span></div>
          <div class="num" style="font-size: 14px; line-height: 20px; font-weight: 500;">Bed 12 · 14:32</div>
          <table class="compare">
            <thead><tr><th></th><th>Without tabular-nums</th><th>With tabular-nums</th></tr></thead>
            <tbody>
              <tr><td>88</td><td class="jitter">88</td><td class="num">88</td></tr>
              <tr><td>188</td><td class="jitter">188</td><td class="num">188</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    `,
    styles: [
      `
      .page { color: var(--ink); }
      .group { margin-bottom: var(--space-8); }
      .group h2 { font: 600 16px/24px var(--font-sans); margin: 0 0 var(--space-1); }
      .hint { font: 400 13px/18px var(--font-sans); color: var(--ink-muted); margin: 0 0 var(--space-4); }
      .display { font-family: var(--font-display); margin-bottom: var(--space-2); }
      .sans { font-family: var(--font-sans); margin-bottom: var(--space-2); color: var(--ink); }
      .num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--ink); margin-bottom: var(--space-2); }
      .unit { font-size: 14px; color: var(--ink-muted); margin-left: 4px; }
      .compare { border-collapse: collapse; margin-top: var(--space-2); }
      .compare th, .compare td { text-align: right; padding: var(--space-1) var(--space-4); border-bottom: 1px solid var(--line); font-family: var(--font-sans); font-size: 13px; }
      .compare th:first-child, .compare td:first-child { text-align: left; }
      .jitter { font-family: var(--font-mono); }
    `,
    ],
  }),
};
