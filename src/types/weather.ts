export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weather_code: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}