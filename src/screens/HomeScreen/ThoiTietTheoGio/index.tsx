import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import styles from './styles';

import {HourlyWeather} from '../../../types/weather';

import {getWeatherStatus} from '../../../utils/code';

interface Props {
  data: HourlyWeather;
}

export default function ThoiTietTheoGio({
  data,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Thời tiết theo giờ
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {data.time.slice(0, 8).map((time, index) => (
          <View
            style={styles.card}
            key={time}>

            <Text style={styles.time}>
              {time.substring(11, 16)}
            </Text>

            <Text style={styles.temp}>
              {data.temperature_2m[index]}°C
            </Text>

            <Text style={styles.status}>
              {getWeatherStatus(
                data.weather_code[index],
              )}
            </Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}