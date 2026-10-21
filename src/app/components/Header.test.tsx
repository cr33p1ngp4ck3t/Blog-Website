import { render, screen } from '@testing-library/react';
import Header from './header';

import { ThemeProvider } from './ThemeProvider';

describe('Header', () => {
  it('renders a heading', async () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const heading = await screen.findByRole('link', { name: /FinAid Hub/i });

    expect(heading).toBeInTheDocument();
  });
});
