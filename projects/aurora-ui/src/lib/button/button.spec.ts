import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Button } from './button';

describe('Button', () => {
  it('renders the projected label', async () => {
    await render(`<au-button>Admit patient</au-button>`, { imports: [Button] });

    expect(screen.getByRole('button', { name: 'Admit patient' })).toBeInTheDocument();
  });

  it('defaults to the primary variant and a native button type', async () => {
    await render(`<au-button>Admit patient</au-button>`, { imports: [Button] });

    const button = screen.getByRole('button', { name: 'Admit patient' });
    expect(button).toHaveClass('au-btn--primary');
    expect(button).toHaveAttribute('type', 'button');
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'applies the %s variant class',
    async (variant) => {
      await render(`<au-button [variant]="variant">Action</au-button>`, {
        imports: [Button],
        componentProperties: { variant },
      });

      expect(screen.getByRole('button', { name: 'Action' })).toHaveClass(`au-btn--${variant}`);
    },
  );

  it('renders a 16px icon before the label when icon is set', async () => {
    await render(`<au-button icon="plus">Admit patient</au-button>`, { imports: [Button] });

    const svg = screen.getByRole('button', { name: 'Admit patient' }).querySelector('svg');
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders no icon when icon is not set', async () => {
    await render(`<au-button>Admit patient</au-button>`, { imports: [Button] });

    expect(screen.getByRole('button').querySelector('svg')).not.toBeInTheDocument();
  });

  it('supports an icon-only button via ariaLabel', async () => {
    await render(`<au-button icon="search" ariaLabel="Search patients" />`, {
      imports: [Button],
    });

    expect(screen.getByRole('button', { name: 'Search patients' })).toBeInTheDocument();
  });

  it('disables the button, blocking clicks', async () => {
    const onClick = jest.fn();
    await render(`<au-button [disabled]="true" (click)="onClick()">Discharge</au-button>`, {
      imports: [Button],
      componentProperties: { onClick },
    });

    const button = screen.getByRole('button', { name: 'Discharge' });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('emits a native click when activated with the mouse', async () => {
    const onClick = jest.fn();
    await render(`<au-button (click)="onClick()">Admit patient</au-button>`, {
      imports: [Button],
      componentProperties: { onClick },
    });

    await userEvent.click(screen.getByRole('button', { name: 'Admit patient' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is activated by the keyboard (Enter and Space), like any native button', async () => {
    const onClick = jest.fn();
    await render(`<au-button (click)="onClick()">Admit patient</au-button>`, {
      imports: [Button],
      componentProperties: { onClick },
    });

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Admit patient' })).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
