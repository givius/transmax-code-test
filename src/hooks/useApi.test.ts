import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi', () => {
  it('resolves and exposes data', async () => {
    const { result } = renderHook(() => useApi(async () => 'ok'));
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe('ok');
    expect(result.current.error).toBeNull();
  });

  it('captures errors from the API function', async () => {
    const err = new Error('boom');
    const { result } = renderHook(() =>
      useApi(async () => {
        throw err;
      }),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(err);
    expect(result.current.data).toBeNull();
  });
});
