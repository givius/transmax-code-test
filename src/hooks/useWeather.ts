import { getWeather, type WeatherData } from '@/lib';
import { useApi, type UseApiResult } from '@/hooks/useApi';

export type UseWeatherResult = UseApiResult<WeatherData>;

export const useWeather = (): UseWeatherResult => useApi<WeatherData>(getWeather);
