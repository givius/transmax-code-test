import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders the label and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button label="Pause" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('reflects the ariaPressed prop', () => {
    render(<Button label="P" ariaPressed />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
