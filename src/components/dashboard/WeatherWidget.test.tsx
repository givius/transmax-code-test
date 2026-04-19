import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useWeather: () => ({
    data: {
      city: 'Melbourne',
      temperature: 32,
      unit: 'C',
      condition: 'sunny',
      datetime: '2024-01-16T15:46:00+11:00',
      humidity: 78,
      chanceOfRain: 34,
      windSpeed: 21,
      windUnit: 'kmh',
      tomorrow: { temperature: 30, condition: 'sunny' },
    },
    loading: false,
    error: null,
  }),
}));

import WeatherWidget from './WeatherWidget';

describe('WeatherWidget', () => {
  it('renders the main weather values from the hook', () => {
    render(<WeatherWidget />);
    expect(screen.getByText('32°')).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();
    expect(screen.getAllByText(/Melbourne/i).length).toBeGreaterThan(0);
  });
});
