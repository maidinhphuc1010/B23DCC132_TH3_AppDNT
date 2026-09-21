import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

import {DailyWeather} from '../../../types/weather';

import {getWeatherStatus} from '../../../utils/code';

interface Props {
  data: DailyWeather;
}

export default function ThoiTietTheoNgay({
  data,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Thời tiết theo ngày
      </Text>

      {data.time.map((date, index) => (
        <View
          style={styles.row}
          key={date}>

          <View>
            <Text style={styles.date}>
              {date}
            </Text>

            <Text style={styles.status}>
              {getWeatherStatus(
                data.weather_code[index],
              )}
            </Text>
          </View>

          <Text style={styles.temperature}>
            {data.temperature_2m_min[index]}°
            {' / '}
            {data.temperature_2m_max[index]}°
          </Text>

        </View>
      ))}
    </View>
  );
}