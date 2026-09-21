import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import ThoiTietHienTai from './ThoiTietHienTai';
import ThoiTietTheoGio from './ThoiTietTheoGio';
import ThoiTietTheoNgay from './ThoiTietTheoNgay';
import {getWeather} from '../../services/weatherApi';
import {WeatherResponse} from '../../types/weather';

export default function HomeScreen() {
  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getWeather();

      setWeather(data);
    } catch (err) {
      console.log(err);

      setError('Không thể lấy dữ liệu thời tiết');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải thời tiết...</Text>
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Dự báo thời tiết
      </Text>

      <ThoiTietHienTai
        city="Hà Nội"
        data={weather.current}
      />

      <ThoiTietTheoGio
        data={weather.hourly}
      />

      <ThoiTietTheoNgay
        data={weather.daily}
      />
    </ScrollView>
  );
}