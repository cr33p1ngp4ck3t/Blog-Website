import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    const heading = screen.getByRole('link', { name: /FinAid Hub/i });

    expect(heading).toBeInTheDocument();
  });
});
