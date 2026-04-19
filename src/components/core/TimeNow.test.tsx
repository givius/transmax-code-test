import { render } from '@testing-library/react';
import TimeNow from './TimeNow';

describe('TimeNow', () => {
  it('renders a formatted time string', () => {
    const { container } = render(<TimeNow />);
    expect(container.textContent ?? '').toMatch(/\d/);
  });
});
