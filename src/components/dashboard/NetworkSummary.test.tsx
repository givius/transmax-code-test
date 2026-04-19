import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

const summary = {
  totalRamps: 50,
  activeRamps: 47,
  incidents: 3,
  averageDelayMinutes: 26,
  alertThresholdPercent: 40,
  currentMaxAlgorithmPercent: 30,
};

vi.mock('@/hooks', () => ({
  useNetworkSummary: () => ({
    data: summary,
    loading: false,
    error: null,
  }),
}));

import NetworkSummary from './NetworkSummary';

describe('NetworkSummary', () => {
  it('renders the four metrics from the hook', () => {
    render(<NetworkSummary />);
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('26')).toBeInTheDocument();
  });

  it('applies the warning colour when incidents are below alertThresholdPercent', () => {
    render(<NetworkSummary />);
    expect(screen.getByText('3')).toHaveClass('warning');
  });
});
