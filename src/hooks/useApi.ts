import { useEffect, useReducer } from 'react';

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type Action<T> = { type: 'start' } | { type: 'success'; data: T } | { type: 'error'; error: Error };

const reducer = <T>(state: UseApiResult<T>, action: Action<T>): UseApiResult<T> => {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true, error: null };
    case 'success':
      return { data: action.data, loading: false, error: null };
    case 'error':
      return { ...state, loading: false, error: action.error };
  }
};

const initialState = <T>(): UseApiResult<T> => ({
  data: null,
  loading: true,
  error: null,
});

/**
 * Generic hook to call an async API function and expose its
 * data / loading / error state.
 *
 * @param apiFn  An async function that resolves with the data of type `T`.
 * @param deps   Dependency list — the request is re-issued when any value changes.
 */
export const useApi = <T>(
  apiFn: () => Promise<T>,
  deps: ReadonlyArray<unknown> = [],
): UseApiResult<T> => {
  const [state, dispatch] = useReducer(reducer<T>, undefined, initialState<T>);

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'start' });

    apiFn()
      .then((result) => {
        if (cancelled) return;
        dispatch({ type: 'success', data: result });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        dispatch({
          type: 'error',
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => {
      cancelled = true;
    };
    // `deps` is a user-supplied dependency list for this generic hook, so the
    // exhaustive-deps rule cannot statically verify it. `apiFn` is intentionally
    // excluded — callers opt in via `deps` to avoid re-fetching on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

export default useApi;
