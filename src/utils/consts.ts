import partlyCloudy from '@/assets/images/partly-cloudy.png';
import sunny from '@/assets/images/sunny.png';
import type { Algorithm, Severity, WeatherCondition } from '@/lib';

/** Every WeatherCondition must resolve to an image.
 *  We only ship two icons, so the less-common conditions reuse them as fallbacks. */
export const CONDITION_IMAGE: Record<WeatherCondition, string> = {
  sunny,
  'partly-cloudy': partlyCloudy,
  cloudy: partlyCloudy,
  rainy: partlyCloudy,
};

export const ROUTE_SEVERITY_COLOR: Record<Severity, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

/** Typed Algorithm → CSS variable mapping. Values reference tokens in global.css. */
export const ALGORITHM_COLOR: Record<Algorithm, string> = {
  'Algorithm 1': 'var(--chart-1)',
  'Algorithm 2': 'var(--chart-2)',
  'Algorithm 3': 'var(--chart-3)',
  'Algorithm 4': 'var(--chart-4)',
  'Algorithm 5': 'var(--chart-5)',
};
