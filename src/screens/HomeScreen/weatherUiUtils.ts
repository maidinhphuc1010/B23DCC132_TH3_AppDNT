import {DayItem, HourItem} from './types';
import {DailyWeather, HourlyWeather} from '../../types/weather';

export const colors = {
  ink: '#133a58',
  muted: '#58778d',
  blue: '#167cc1',
  blueDark: '#0c609c',
  skyTop: '#c6e6f9',
  skyBottom: '#f5f9fc',
  card: 'rgba(255,255,255,0.72)',
  selected: '#e7f3fb',
  stroke: '#d7e8f3',
  strokeBlue: '#83bee7',
  skeleton: '#dceaf3',
};

export const weekdays = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

export const round = (value?: number) => Math.round(value ?? 0);
export const shortTime = (value?: string) => (value ? value.slice(11, 16) : '--:--');
export const shortDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
};
export const fullDate = (value?: string) => {
  const date = value ? new Date(value) : new Date();
  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};
export const compactDateRange = (start?: string, end?: string) => {
  if (!start || !end) return 'Đang cập nhật';
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  return `${String(startDate.getDate()).padStart(2, '0')}/${String(startDate.getMonth() + 1).padStart(2, '0')}–${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}`;
};
export const weatherEmoji = (code: number) => {
  if (code >= 80 || code >= 51) return '🌧️';
  if (code >= 45) return '🌫️';
  if (code === 0) return '☀️';
  return '🌤️';
};
export const windDirectionText = (degrees?: number) => {
  if (degrees === undefined) return 'Chưa có hướng gió';
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  return `${directions[Math.round(degrees / 45) % 8]} · ${round(degrees)}°`;
};
export const getHours = (hourly: HourlyWeather, currentTime?: string): HourItem[] => {
  const foundIndex = currentTime ? hourly.time.findIndex(time => time >= currentTime) : 0;
  const safeStartIndex = foundIndex < 0 ? 0 : foundIndex;

  return hourly.time.slice(safeStartIndex, safeStartIndex + 24).map((time, offset) => {
    const index = safeStartIndex + offset;
    return {
      time,
      temperature: hourly.temperature_2m[index] ?? 0,
      code: hourly.weather_code[index] ?? 0,
      rain: hourly.precipitation_probability?.[index] ?? 0,
      humidity: hourly.relative_humidity_2m?.[index] ?? 0,
      apparent: hourly.apparent_temperature?.[index] ?? hourly.temperature_2m[index] ?? 0,
      wind: hourly.wind_speed_10m?.[index] ?? 0,
      windDirection: hourly.wind_direction_10m?.[index],
      uv: hourly.uv_index?.[index] ?? 0,
      precipitation: hourly.precipitation?.[index] ?? hourly.rain?.[index] ?? 0,
    };
  });
};
export const getDays = (daily: DailyWeather): DayItem[] =>
  daily.time.map((date, index) => ({
    date,
    max: daily.temperature_2m_max[index] ?? 0,
    min: daily.temperature_2m_min[index] ?? 0,
    code: daily.weather_code[index] ?? 0,
    rain: daily.precipitation_probability_max?.[index] ?? 0,
    precipitation: daily.precipitation_sum?.[index] ?? 0,
    wind: daily.wind_speed_10m_max?.[index] ?? 0,
    windDirection: daily.wind_direction_10m_dominant?.[index],
    uv: daily.uv_index_max?.[index] ?? 0,
    sunrise: daily.sunrise?.[index],
    sunset: daily.sunset?.[index],
  }));
