import axiosClient from './api';
import {WeatherResponse} from '../types/weather';

export const getWeather = async (): Promise<WeatherResponse> => {
  const response = await axiosClient.get('/forecast', {
    params: {
      latitude: 21.0285,
      longitude: 105.8542,

      current: 'temperature_2m,weather_code',

      hourly: 'temperature_2m,weather_code',

      daily:
        'temperature_2m_max,temperature_2m_min,weather_code',

      timezone: 'Asia/Bangkok',
    },
  });

  return response.data;
};