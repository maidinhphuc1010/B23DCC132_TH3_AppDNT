import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import {useWeather} from '../../WeatherContext';
import {getWeatherStatus} from '../../utils/code';
import {BottomTabs, DataNote, Header, HomeIndicator, Metric, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';
import {DetailRoute, HourItem, Tab} from './types';
import {fullDate, round, shortTime, weatherEmoji, windDirectionText} from './weatherUiUtils';

const TodayScreen = ({hours, onTab, onDetail}: {hours: HourItem[]; onTab: (tab: Tab) => void; onDetail: (route: DetailRoute) => void}) => {
  const {weather, locationLabel} = useWeather();
  const current = weather?.current;
  const status = getWeatherStatus(current?.weather_code ?? 1);
  const today = weather?.daily.time[0] ? weather.daily : null;
  const high = today?.temperature_2m_max[0];
  const low = today?.temperature_2m_min[0];
  const currentHour = hours[0];
  const uv = currentHour?.uv ?? weather?.daily.uv_index_max?.[0] ?? 0;
  const hourlyEnd = hours[hours.length - 1]?.time;


  return (
    <ScreenShell>
      <StatusBarMock />
      <Header title={locationLabel} subtitle={`Vị trí hiện tại · ${fullDate(current?.time)}`} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.todayHero}>
          <View>
            <Text style={styles.temperature}>{round(current?.temperature_2m)}°</Text>
            <Text style={styles.condition}>{status}</Text>
            <Text style={styles.feelsLike}>Cao {round(high)}°C · Thấp {round(low)}°C  |  Cảm giác như {round(current?.apparent_temperature)}°</Text>
          </View>
          <Text style={styles.bigWeatherIcon}>{weatherEmoji(current?.weather_code ?? 1)}</Text>
        </View>
        <View style={styles.metricRow}>
          <Metric icon="♧" value={`${round(current?.relative_humidity_2m)}%`} label="Độ ẩm" />
          <Metric icon="≋" value={`${round(current?.wind_speed_10m)} km/h`} label={windDirectionText(current?.wind_direction_10m)} />
          <Metric icon="☼" value={`${round(uv)} / 11`} label="UV" />
          <Metric icon="☂" value={`${round(current?.precipitation ?? current?.rain)} mm`} label="Mưa" />
        </View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>24 giờ tới</Text><Text style={styles.sectionMeta}>Chi tiết giờ ›</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourList}>
          {hours.map((hour, index) => (
            <Pressable key={hour.time} style={[styles.hourCard, index === 1 && styles.hourCardActive]} onPress={() => onDetail({type: 'hourly', index})}>
              <Text style={[styles.hourText, index === 1 && styles.hourTextActive]}>{index === 0 ? 'Bây giờ' : shortTime(hour.time)}</Text>
              <Text style={styles.hourIcon}>{weatherEmoji(hour.code)}</Text>
              <Text style={[styles.hourTemp, index === 1 && styles.hourTextActive]}>{round(hour.temperature)}°</Text>
              <Text style={[styles.hourRain, index === 1 && styles.hourTextActive]}>{hour.rain}% mưa</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.emptyHint}>{shortTime(hours[0]?.time)} hôm nay → {shortTime(hourlyEnd)} · Vuốt để xem thêm</Text>
        <View style={styles.adviceCard}><Text style={styles.adviceIcon}>☼</Text><Text style={styles.adviceText}>{uv >= 6 ? 'UV đang cao, nên dùng kem chống nắng khi ra ngoài.' : `${status}. Theo dõi khả năng mưa theo từng giờ trước khi ra ngoài.`}</Text></View>
      </ScrollView>
      <DataNote />
      <BottomTabs active="today" onTab={onTab} />
      <HomeIndicator />
    </ScreenShell>
  );
};

export default TodayScreen;
