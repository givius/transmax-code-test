import { render, screen } from '@testing-library/react';
import type { UseRampDataResult } from '@/hooks/useRampData';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const { mockUseRampData } = vi.hoisted(() => ({
  mockUseRampData: vi.fn<() => UseRampDataResult>(),
}));

vi.mock('@/hooks', () => ({
  useRampData: mockUseRampData,
}));

import RampChart from './RampChart';

const buildState = (overrides: Partial<UseRampDataResult>): UseRampDataResult => ({
  distribution: null,
  dominantAlgorithm: null,
  dominantPercent: 0,
  sparkline: [],
  totalRamps: 0,
  isPaused: false,
  togglePause: vi.fn(),
  loading: true,
  ...overrides,
});

beforeEach(() => mockUseRampData.mockReset());

describe('RampChart', () => {
  it('shows the spinner while loading', () => {
    mockUseRampData.mockReturnValue(buildState({ loading: true }));
    render(<RampChart />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders dominant caption and toggles pause on click', async () => {
    const togglePause = vi.fn();
    mockUseRampData.mockReturnValue(
      buildState({
        loading: false,
        distribution: {
          'Algorithm 1': 10,
          'Algorithm 2': 10,
          'Algorithm 3': 40,
          'Algorithm 4': 20,
          'Algorithm 5': 20,
        },
        dominantAlgorithm: 'Algorithm 3',
        dominantPercent: 40,
        totalRamps: 50,
        togglePause,
      }),
    );

    render(<RampChart />);

    expect(screen.getByText(/Algorithm 3 — Last 60s/)).toBeInTheDocument();
    expect(screen.getByText('50 ramps')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(togglePause).toHaveBeenCalledTimes(1);
  });
});
