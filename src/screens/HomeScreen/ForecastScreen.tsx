import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import {getWeatherStatus} from '../../utils/code';
import {BottomTabs, DataNote, Header, HomeIndicator, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';
import {DayItem, DetailRoute, Tab} from './types';
import {compactDateRange, round, shortDate, weatherEmoji, weekdays} from './weatherUiUtils';

const ForecastScreen = ({days, locationLabel, onTab, onDetail}: {days: DayItem[]; locationLabel: string; onTab: (tab: Tab) => void; onDetail: (route: DetailRoute) => void}) => {
  const visibleDays = days.slice(0, 7);
  const minTemp = Math.min(...visibleDays.map(day => day.min));
  const maxTemp = Math.max(...visibleDays.map(day => day.max));
  const wettestDay = visibleDays.reduce<DayItem | undefined>((highest, day) => (!highest || day.rain > highest.rain ? day : highest), undefined);
  const leadTitle = wettestDay && wettestDay.rain >= 50 ? 'Tuần này có khả năng mưa' : 'Dự báo 7 ngày tới';
  const leadDescription = `Nhiệt độ ${round(minTemp)}–${round(maxTemp)}°C. ${wettestDay ? `Khả năng mưa cao nhất ${wettestDay.rain}% vào ${shortDate(wettestDay.date)}.` : 'Dữ liệu mưa đang được cập nhật.'}`;

  return (
    <ScreenShell>
      <StatusBarMock />
      <Header title="7 ngày tới" subtitle={`${locationLabel} · ${compactDateRange(visibleDays[0]?.date, visibleDays[visibleDays.length - 1]?.date)}`} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.forecastLead}>
          <Text style={styles.blueIcon}>☁︎</Text>
          <View style={{flex: 1}}><Text style={styles.forecastTitle}>{leadTitle}</Text><Text style={styles.forecastDescription}>{leadDescription}</Text></View>
        </View>
        {visibleDays.map((day, index) => (
          <Pressable key={day.date} style={[styles.dayRow, index === 0 && styles.dayRowActive]} onPress={() => onDetail({type: 'daily', index})}>
            <View style={styles.dayCopy}>
              <Text style={styles.dayTitle}>{index === 0 ? 'Hôm nay' : weekdays[new Date(`${day.date}T00:00:00`).getDay()]} <Text style={styles.dayDate}>{shortDate(day.date)}</Text></Text>
              <Text style={styles.dayCondition}>{getWeatherStatus(day.code)}</Text>
            </View>
            <Text style={styles.dayIcon}>{weatherEmoji(day.code)}</Text>
            <View style={styles.rangeBlock}><View style={styles.rangeTemps}><Text style={styles.rangeHigh}>{round(day.max)}°</Text><Text style={styles.rangeLow}>{round(day.min)}°</Text></View><View style={styles.tempTrack}><View style={[styles.tempBar, {width: `${Math.max(32, Math.min(100, day.max + 48))}%`}]} /></View></View>
            <Text style={styles.rainChance}>☂{`\n`}{day.rain}%</Text>
            <Text style={styles.iconText}>›</Text>
          </Pressable>
        ))}
        <Text style={styles.emptyHint}>Chọn một ngày để xem chi tiết. Nhiệt độ tính bằng °C; thanh xanh biểu thị khoảng thấp nhất–cao nhất.</Text>
      </ScrollView>
      <DataNote />
      <BottomTabs active="forecast" onTab={onTab} />
      <HomeIndicator />
    </ScreenShell>
  );
};

export default ForecastScreen;
