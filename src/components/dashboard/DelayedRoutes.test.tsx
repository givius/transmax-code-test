import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import routes from '@/lib/mocks/delayedRoutes.json';
import type { DelayedRoute } from '@/lib';

vi.mock('@/hooks', () => ({
  useDelayedRoutes: () => ({
    data: routes as DelayedRoute[],
    loading: false,
    error: null,
  }),
}));

import DelayedRoutes from './DelayedRoutes';

describe('DelayedRoutes', () => {
  it('renders each route and the active count badge', () => {
    render(<DelayedRoutes />);
    expect(screen.getAllByText('Monash Fwy Out')).toHaveLength(2);
    expect(screen.getByText('Western Ring Rd')).toBeInTheDocument();
    expect(screen.getByText('Eastern Fwy')).toBeInTheDocument();
    expect(screen.getByText(/4 active/)).toBeInTheDocument();
  });
});
