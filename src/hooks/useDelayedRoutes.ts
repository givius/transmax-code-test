import { getDelayedRoutes, type DelayedRoute } from '@/lib';
import { useApi, type UseApiResult } from '@/hooks/useApi';

export type UseDelayedRoutesResult = UseApiResult<DelayedRoute[]>;

export const useDelayedRoutes = (): UseDelayedRoutesResult =>
  useApi<DelayedRoute[]>(getDelayedRoutes);
