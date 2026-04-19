import type { Algorithm, AlgorithmDistribution } from '@/lib';

export const formatTime = (date: Date) => {
  return date
    .toLocaleString('en-AU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    })
    .replaceAll(',', '');
};

/**
 * Returns the algorithm with the highest share of ramps in a distribution,
 * or `null` if the distribution is empty. Ties resolve to the first entry
 * encountered (stable iteration order of `AlgorithmDistribution`).
 */
export const getDominantAlgorithm = (
  distribution: AlgorithmDistribution,
): { algorithm: Algorithm; percent: number } | null => {
  const entries = Object.entries(distribution) as Array<[Algorithm, number]>;
  if (entries.length === 0) return null;

  return entries.reduce<{ algorithm: Algorithm; percent: number }>(
    (max, [algorithm, percent]) => (percent > max.percent ? { algorithm, percent } : max),
    { algorithm: entries[0][0], percent: -Infinity },
  );
};
