import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouter } from '@angular/router';

import { Playground } from './playground';

function mockMatchMedia(prefersDark = false): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && prefersDark,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('Playground', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
  });

  async function setup() {
    return render(Playground, { providers: [provideRouter([])] });
  }

  it('renders the heading and the live preview components', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Theme playground' }),
    ).toBeInTheDocument();
    expect(screen.getByText('M. Oliveira, 67')).toBeInTheDocument();
    expect(screen.getByRole('meter')).toBeInTheDocument();
  });

  it('defaults to the Aurora teal and the default radius/density presets', async () => {
    await setup();

    expect(screen.getByText('#0B6E69')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Rounded' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('radio', { name: 'Comfortable' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('updates the token snippet when the primary color changes', async () => {
    await setup();

    const colorInput = screen.getByLabelText('Primary color');
    fireEvent.input(colorInput, { target: { value: '#ff0000' } });

    expect(screen.getByText('#FF0000')).toBeInTheDocument();
    expect(screen.getByText(/--brand: #FF0000/)).toBeInTheDocument();
  });

  it('resets the primary color back to the default teal', async () => {
    await setup();

    const colorInput = screen.getByLabelText('Primary color');
    fireEvent.input(colorInput, { target: { value: '#ff0000' } });
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByText('#0B6E69')).toBeInTheDocument();
  });

  it('switches the corner radius preset and reflects it in the snippet', async () => {
    await setup();

    await userEvent.click(screen.getByRole('radio', { name: 'Sharp' }));

    expect(screen.getByRole('radio', { name: 'Sharp' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText(/--radius-lg: 8px/)).toBeInTheDocument();
  });

  it('switches the density preset and reflects it in the snippet', async () => {
    await setup();

    await userEvent.click(screen.getByRole('radio', { name: 'Compact' }));

    expect(screen.getByText(/--space-4: 10px/)).toBeInTheDocument();
  });

  it('switches theme from the theme segmented control', async () => {
    await setup();

    await userEvent.click(screen.getByRole('radio', { name: 'Dark' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
  });
});
