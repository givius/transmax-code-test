import { getNetworkSummary, type NetworkSummary } from '@/lib';
import { useApi, type UseApiResult } from '@/hooks/useApi';

export type UseNetworkSummaryResult = UseApiResult<NetworkSummary>;

export const useNetworkSummary = (): UseNetworkSummaryResult =>
  useApi<NetworkSummary>(getNetworkSummary);
