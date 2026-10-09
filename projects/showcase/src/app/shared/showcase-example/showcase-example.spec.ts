import { render, screen } from '@testing-library/angular';

import { ShowcaseExample } from './showcase-example';

describe('ShowcaseExample', () => {
  it('renders the title, projected demo and code snippet', async () => {
    await render(
      `<app-showcase-example title="Button" code="<au-button>Admit</au-button>">
        <span>demo content</span>
      </app-showcase-example>`,
      { imports: [ShowcaseExample] },
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('demo content')).toBeInTheDocument();
    expect(screen.getByText('<au-button>Admit</au-button>')).toBeInTheDocument();
  });
});
