import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getRampAlgorithms,
  rampsToDistribution,
  appendSparklinePoint,
  type Algorithm,
  type AlgorithmDistribution,
  type Ramp,
  type SparklinePoint,
} from '@/lib';
import { getDominantAlgorithm } from '@/utils';

export interface UseRampDataResult {
  /** Current percentage-per-algorithm (null until the first tick arrives). */
  distribution: AlgorithmDistribution | null;
  /** Algorithm currently holding the largest share. */
  dominantAlgorithm: Algorithm | null;
  /** Percentage held by `dominantAlgorithm` in the current tick. */
  dominantPercent: number;
  /** Up to 120 points (≈ 60 s @ 500 ms) tracking the dominant algorithm's share. */
  sparkline: SparklinePoint[];
  /** Number of ramps reported by the latest (displayed) tick. */
  totalRamps: number;
  /** Whether the displayed data is frozen. The underlying stream keeps running. */
  isPaused: boolean;
  togglePause: () => void;
  /** `true` until the first tick has been received. */
  loading: boolean;
}

/**
 * Subscribes to the live ramp stream.
 *
 * While `isPaused` is true, data keeps being received in the background
 * (the callback still fires), but we skip state updates — this freezes the
 * donut, sparkline and labels consistently in a single place.
 */
export const useRampData = (): UseRampDataResult => {
  const [distribution, setDistribution] = useState<AlgorithmDistribution | null>(null);
  const [sparkline, setSparkline] = useState<SparklinePoint[]>([]);
  const [totalRamps, setTotalRamps] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mirror `isPaused` into a ref so the streaming callback can read it
  // without re-subscribing whenever the user toggles pause.
  const pausedRef = useRef(isPaused);
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    return getRampAlgorithms((ramps: Ramp[]) => {
      if (pausedRef.current) return;

      const dist = rampsToDistribution(ramps);
      const dominant = getDominantAlgorithm(dist);

      setDistribution(dist);
      setTotalRamps(ramps.length);
      if (dominant) {
        setSparkline((prev) => appendSparklinePoint(prev, dominant.percent));
      }
    });
  }, []);

  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const dominant = useMemo(
    () => (distribution ? getDominantAlgorithm(distribution) : null),
    [distribution],
  );

  return {
    distribution,
    dominantAlgorithm: dominant?.algorithm ?? null,
    dominantPercent: dominant?.percent ?? 0,
    sparkline,
    totalRamps,
    isPaused,
    togglePause,
    loading: distribution === null,
  };
};
