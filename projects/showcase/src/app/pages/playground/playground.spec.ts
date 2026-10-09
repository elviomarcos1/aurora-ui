import { render, screen } from '@testing-library/angular';
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

  it('renders the heading and every component in the list', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Component playground' }),
    ).toBeInTheDocument();

    for (const title of [
      'Button',
      'StatusPill',
      'TextField',
      'AlertBanner',
      'OccupancyMeter',
      'VitalSign',
      'BedCard',
      'Icon',
    ]) {
      expect(screen.getByRole('option', { name: title })).toBeInTheDocument();
    }
  });

  it('defaults to the Button component with its default props', async () => {
    await setup();

    expect(screen.getByRole('option', { name: 'Button' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Admit patient' })).toBeInTheDocument();
    expect(screen.getByText(/variant="primary"/)).toBeInTheDocument();
  });

  it('filters the component list by search', async () => {
    await setup();

    await userEvent.type(screen.getByLabelText('Search components'), 'Bed');

    expect(screen.getByRole('option', { name: 'BedCard' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Button' })).not.toBeInTheDocument();
  });

  it('switches the active component on click', async () => {
    await setup();

    await userEvent.click(screen.getByRole('option', { name: 'StatusPill' }));

    expect(screen.getByRole('heading', { level: 2, name: 'StatusPill' })).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('updates the live component and the code snippet when a control changes', async () => {
    await setup();

    const labelInput = screen.getByLabelText('Label');
    await userEvent.clear(labelInput);
    await userEvent.type(labelInput, 'Discharge patient');

    expect(screen.getByRole('button', { name: 'Discharge patient' })).toBeInTheDocument();
    expect(screen.getByText(/Discharge patient<\/au-button>/)).toBeInTheDocument();
  });

  it('resets the active component back to its defaults', async () => {
    await setup();

    const labelInput = screen.getByLabelText('Label');
    await userEvent.clear(labelInput);
    await userEvent.type(labelInput, 'Discharge patient');

    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByRole('button', { name: 'Admit patient' })).toBeInTheDocument();
  });
});
