import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';

import { CaseStudy } from './case-study';

describe('CaseStudy', () => {
  it('renders the headline and every section', async () => {
    await render(CaseStudy, { providers: [provideRouter([])] });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'A design system built from a real hospital floor',
      }),
    ).toBeInTheDocument();

    for (const heading of ['The problem', 'The architecture', 'The design decisions', 'The result']) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument();
    }
  });

  it('links to the Ward 4B demo and the GitHub repository', async () => {
    await render(CaseStudy, { providers: [provideRouter([])] });

    expect(screen.getByRole('link', { name: 'Ward 4B demo' })).toHaveAttribute(
      'href',
      '/demo',
    );
    expect(screen.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/elviomarcos1/aurora-ui',
    );
  });
});
