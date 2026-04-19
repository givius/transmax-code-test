import { render } from '@testing-library/react';
import Sparkline from './Sparkline';

describe('Sparkline', () => {
  it('renders with an empty buffer without crashing', () => {
    const { container } = render(<Sparkline points={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with a populated buffer', () => {
    const { container } = render(
      <Sparkline
        points={[
          { timestamp: 0, value: 10 },
          { timestamp: 500, value: 20 },
        ]}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
