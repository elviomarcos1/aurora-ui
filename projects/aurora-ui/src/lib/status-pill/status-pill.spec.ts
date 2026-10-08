import { render, screen } from '@testing-library/angular';

import { StatusPill, type StatusPillVariant } from './status-pill';

const SHAPE_TAG: Record<StatusPillVariant, string> = {
  critical: 'path',
  warning: 'path',
  stable: 'circle',
  info: 'rect',
};

describe('StatusPill', () => {
  it('renders the projected label', async () => {
    await render(`<au-status-pill status="stable">Stable</au-status-pill>`, {
      imports: [StatusPill],
    });

    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it.each(['critical', 'warning', 'stable', 'info'] as const)(
    'renders the %s variant with its class and shape',
    async (status) => {
      await render(`<au-status-pill [status]="status">Label</au-status-pill>`, {
        imports: [StatusPill],
        componentProperties: { status },
      });

      const pill = screen.getByText('Label').closest('span');
      expect(pill).toHaveClass(`au-pill--${status}`);
      expect(pill?.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(pill?.querySelector(SHAPE_TAG[status])).toBeTruthy();
    },
  );

  it('uses different shapes for critical and warning despite both using <path>', async () => {
    const { container } = await render(
      `<au-status-pill status="critical">Critical</au-status-pill>
       <au-status-pill status="warning">Observation</au-status-pill>`,
      { imports: [StatusPill] },
    );

    const [criticalPath, warningPath] = Array.from(container.querySelectorAll('svg path')).map(
      (path) => path.getAttribute('d'),
    );
    expect(criticalPath).not.toBe(warningPath);
  });
});
