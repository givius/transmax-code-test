import { formatTime, getDominantAlgorithm } from './utils';
import type { AlgorithmDistribution } from '@/lib';

const dist = (a: number, b: number, c: number, d: number, e: number): AlgorithmDistribution => ({
  'Algorithm 1': a,
  'Algorithm 2': b,
  'Algorithm 3': c,
  'Algorithm 4': d,
  'Algorithm 5': e,
});

describe('formatTime', () => {
  it('formats a Date using the en-AU short style', () => {
    const out = formatTime(new Date('2024-01-16T15:46:00+11:00'));
    expect(out).toContain('Jan');
    expect(out).toMatch(/\d/);
  });
});

describe('getDominantAlgorithm', () => {
  it('returns the algorithm with the highest share', () => {
    expect(getDominantAlgorithm(dist(10, 20, 50, 10, 10))).toEqual({
      algorithm: 'Algorithm 3',
      percent: 50,
    });
  });

  it('returns the first entry when there is a tie', () => {
    expect(getDominantAlgorithm(dist(30, 30, 10, 20, 10))?.algorithm).toBe('Algorithm 1');
  });

  it('returns null for an empty distribution', () => {
    expect(getDominantAlgorithm({} as AlgorithmDistribution)).toBeNull();
  });
});
