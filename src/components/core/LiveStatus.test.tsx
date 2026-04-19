import { render, screen } from '@testing-library/react';
import LiveStatus from './LiveStatus';

describe('LiveStatus', () => {
  it('renders the live status with the success pill class', () => {
    render(<LiveStatus />);
    const el = screen.getByText('live');
    expect(el).toHaveClass('tm-pill', 'success');
  });
});
