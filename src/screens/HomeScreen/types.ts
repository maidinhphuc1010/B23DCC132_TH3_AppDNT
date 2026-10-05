import {DailyWeather, HourlyWeather} from '../../types/weather';

export type Tab = 'today' | 'forecast';
export type DetailRoute = {type: 'hourly'; index: number} | {type: 'daily'; index: number};

export type HourItem = {
  time: string;
  temperature: number;
  code: number;
  rain: number;
  humidity: number;
  apparent: number;
  wind: number;
  windDirection?: number;
  uv: number;
  precipitation: number;
};

export type DayItem = {
  date: string;
  max: number;
  min: number;
  code: number;
  rain: number;
  precipitation: number;
  wind: number;
  windDirection?: number;
  uv: number;
  sunrise?: string;
  sunset?: string;
};

export type WeatherCollections = {
  hourly: HourlyWeather;
  daily: DailyWeather;
};
