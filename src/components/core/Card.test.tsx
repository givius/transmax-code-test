import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders title and children by default', () => {
    render(
      <Card title="Weather">
        <p>body</p>
      </Card>,
    );
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('shows a spinner when loading and hides children', () => {
    render(
      <Card title="x" loading>
        <p>body</p>
      </Card>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  it('shows the error message when error is set', () => {
    render(
      <Card title="x" error={new Error('boom')}>
        <p>body</p>
      </Card>,
    );
    expect(screen.getByText(/boom/)).toBeInTheDocument();
  });
});
