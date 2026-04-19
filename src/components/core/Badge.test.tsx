import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders the title with the chosen colour class', () => {
    render(<Badge title="Live" color="success" />);
    const el = screen.getByText('Live');
    expect(el).toHaveClass('tm-badge', 'success');
  });
});
