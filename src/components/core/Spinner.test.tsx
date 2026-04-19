import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('exposes the status role with a default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders a visible label when provided', () => {
    render(<Spinner label="Working" />);
    expect(screen.getByText('Working')).toBeInTheDocument();
  });
});
