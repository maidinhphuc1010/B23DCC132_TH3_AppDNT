import axiosClient from './api';
import {WeatherResponse} from '../types/weather';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const HANOI_COORDINATES: Coordinates = {latitude: 21.0285, longitude: 105.8542};

export const getWeather = async (
  coordinates: Coordinates = HANOI_COORDINATES,
): Promise<WeatherResponse> => {
  const response = await axiosClient.get('/forecast', {
    params: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m',
      hourly:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,uv_index',
      daily:
        'temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,sunrise,sunset',
      timezone: 'Asia/Bangkok',
      forecast_days: 7,
    },
  });

  return response.data;
};

