import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

import {CurrentWeather} from '../../../types/weather';

import {getWeatherStatus} from '../../../utils/code';

interface Props {
  city: string;
  data: CurrentWeather;
}

export default function ThoiTietHienTai({
  city,
  data,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>
        {city}
      </Text>

      <Text style={styles.temperature}>
        {data.temperature_2m}°C
      </Text>

      <Text style={styles.status}>
        {getWeatherStatus(data.weather_code)}
      </Text>
    </View>
  );
}