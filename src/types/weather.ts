export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m?: number;
  apparent_temperature?: number;
  precipitation?: number;
  rain?: number;
  weather_code: number;
  wind_speed_10m?: number;
  wind_direction_10m?: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m?: number[];
  apparent_temperature?: number[];
  precipitation_probability?: number[];
  precipitation?: number[];
  rain?: number[];
  weather_code: number[];
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
  uv_index?: number[];
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  precipitation_probability_max?: number[];
  precipitation_sum?: number[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[];
  uv_index_max?: number[];
  sunrise?: string[];
  sunset?: string[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

