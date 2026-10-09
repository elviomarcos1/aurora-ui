import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

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

  it('copies the code snippet to the clipboard and shows a confirmation', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await render(
      `<app-showcase-example title="Button" code="<au-button>Admit</au-button>">
        <span>demo content</span>
      </app-showcase-example>`,
      { imports: [ShowcaseExample] },
    );

    const copyButton = screen.getByRole('button', { name: 'Copy code' });
    await userEvent.click(copyButton);

    expect(writeText).toHaveBeenCalledWith('<au-button>Admit</au-button>');
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
