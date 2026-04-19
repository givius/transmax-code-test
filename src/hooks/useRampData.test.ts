import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import type { Algorithm, Ramp } from '@/lib';

// Shared state between the mock and the tests
const mockState = vi.hoisted(() => ({
  cb: null as ((ramps: Ramp[]) => void) | null,
  unsubscribed: 0,
}));

vi.mock('@/lib', async () => {
  const actual = await vi.importActual<typeof import('@/lib')>('@/lib');
  return {
    ...actual,
    getRampAlgorithms: (cb: (ramps: Ramp[]) => void) => {
      mockState.cb = cb;
      return () => {
        mockState.unsubscribed += 1;
      };
    },
  };
});

import { useRampData } from './useRampData';

const makeRamps = (algorithm: Algorithm): Ramp[] =>
  Array.from({ length: 50 }, (_, i) => ({ id: `r${i}`, algorithm }));

beforeEach(() => {
  mockState.cb = null;
  mockState.unsubscribed = 0;
});

describe('useRampData', () => {
  it('starts in a loading state with no distribution', () => {
    const { result } = renderHook(() => useRampData());
    expect(result.current.loading).toBe(true);
    expect(result.current.distribution).toBeNull();
  });

  it('populates distribution and sparkline on the first tick', () => {
    const { result } = renderHook(() => useRampData());
    act(() => mockState.cb?.(makeRamps('Algorithm 2')));

    expect(result.current.loading).toBe(false);
    expect(result.current.distribution?.['Algorithm 2']).toBe(100);
    expect(result.current.dominantAlgorithm).toBe('Algorithm 2');
    expect(result.current.dominantPercent).toBe(100);
    expect(result.current.sparkline).toHaveLength(1);
  });

  it('freezes the displayed state while paused', () => {
    const { result } = renderHook(() => useRampData());
    act(() => mockState.cb?.(makeRamps('Algorithm 1')));
    act(() => result.current.togglePause());
    act(() => mockState.cb?.(makeRamps('Algorithm 5')));

    expect(result.current.dominantAlgorithm).toBe('Algorithm 1');
    expect(result.current.sparkline).toHaveLength(1);
  });

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useRampData());
    unmount();
    expect(mockState.unsubscribed).toBe(1);
  });
});
