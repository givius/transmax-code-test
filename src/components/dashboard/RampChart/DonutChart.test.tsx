import { render, screen } from '@testing-library/react';
import { ALGORITHMS, type AlgorithmDistribution } from '@/lib';
import DonutChart from './DonutChart';

const distribution: AlgorithmDistribution = {
  'Algorithm 1': 20,
  'Algorithm 2': 20,
  'Algorithm 3': 20,
  'Algorithm 4': 20,
  'Algorithm 5': 20,
};

describe('DonutChart', () => {
  it('renders one legend entry per algorithm', () => {
    render(<DonutChart distribution={distribution} />);
    ALGORITHMS.forEach((algorithm) => {
      expect(screen.getAllByText(algorithm).length).toBeGreaterThan(0);
    });
  });
});
