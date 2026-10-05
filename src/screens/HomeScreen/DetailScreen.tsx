import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {getWeatherStatus} from '../../utils/code';
import {DataNote, Header, HomeIndicator, Measure, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';
import {DayItem, DetailRoute, HourItem} from './types';
import {fullDate, round, shortTime, weatherEmoji, windDirectionText} from './weatherUiUtils';

const DetailScreen = ({route, hours, days, locationLabel, onBack}: {route: DetailRoute; hours: HourItem[]; days: DayItem[]; locationLabel: string; onBack: () => void}) => {
  const item = route.type === 'hourly' ? hours[route.index] : days[route.index];
  const isHourly = route.type === 'hourly';
  const title = isHourly ? 'Chi tiết theo giờ' : 'Chi tiết theo ngày';
  const high = isHourly ? (item as HourItem).temperature : (item as DayItem).max;
  const low = isHourly ? (item as HourItem).apparent : (item as DayItem).min;
  const selectedLabel = isHourly ? shortTime((item as HourItem).time) : fullDate((item as DayItem).date);
  const condition = getWeatherStatus(item.code);
  const humidity = isHourly ? (item as HourItem).humidity : undefined;
  const apparentContext = isHourly ? `Cảm giác chênh ${round((item as HourItem).apparent - (item as HourItem).temperature)}° so với thực tế` : 'Dùng khoảng nhiệt cao/thấp trong ngày';


  return (
    <ScreenShell>
      <StatusBarMock />
      <Header title={title} subtitle={`${locationLabel} · ${selectedLabel}`} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {isHourly ? (
          <View style={styles.selectorRow}>{hours.slice(0, 4).map((hour, index) => <View key={hour.time} style={[styles.selectorPill, index === route.index && styles.selectorActive]}><Text style={[styles.selectorText, index === route.index && styles.selectorActiveText]}>{shortTime(hour.time)}</Text></View>)}</View>
        ) : (
          <View style={[styles.selectorPill, {height: 42, flexDirection: 'row', marginBottom: 18}]}><Text style={styles.selectorActiveText}>▦  Hôm nay · {selectedLabel.slice(8, 10)} tháng {selectedLabel.slice(11, 13)}</Text></View>
        )}
        <View style={styles.detailHero}>
          <View>
            <Text style={styles.eyebrow}>{isHourly ? `${selectedLabel} · HÔM NAY` : 'CAO NHẤT / THẤP NHẤT (°C)'}</Text>
            <Text style={styles.detailTemp}>{round(high)}°{!isHourly ? <Text style={styles.detailLow}> / {round(low)}°</Text> : null}</Text>
            <Text style={styles.condition}>{condition}</Text>
          </View>
          <Text style={styles.detailIcon}>{weatherEmoji(item.code)}</Text>
        </View>
        {isHourly ? <HourChart hours={hours} activeIndex={route.index} /> : <DaylightCard day={item as DayItem} />}
        <View style={styles.measureGrid}>
          <Measure label={isHourly ? 'Cảm giác như' : 'Nhiệt độ thấp nhất'} value={`${round(low)}°`} progress={Math.min(100, Math.max(0, round(low) + 20))} context={apparentContext} />
          <Measure label="Độ ẩm" value={humidity === undefined ? '—' : `${round(humidity)}%`} progress={humidity ?? 0} context={humidity === undefined ? 'Open‑Meteo daily không trả độ ẩm theo ngày' : 'Dữ liệu theo giờ đã chọn'} />
          <Measure label="Gió" value={`${round(item.wind)} km/h`} progress={Math.min(100, item.wind * 3)} context={windDirectionText(item.windDirection)} />
          <Measure label="Chỉ số UV" value={`${round(item.uv)} / 11`} progress={Math.min(100, item.uv * 10)} context={item.uv > 5 ? 'Cao · Nên chống nắng' : 'Trung bình'} />
          <Measure label="Khả năng mưa" value={`${item.rain}%`} progress={item.rain} context={isHourly ? 'Khả năng mưa thấp' : 'Cao nhất trong ngày'} />
          <Measure label="Lượng mưa" value={`${round(item.precipitation)} mm`} progress={Math.min(100, item.precipitation * 25)} context={isHourly ? 'Trong giờ đã chọn' : 'Tổng trong ngày'} />
        </View>
        <Text style={styles.emptyHint}>{isHourly ? 'Các chỉ số lấy theo giờ đã chọn từ Open‑Meteo.' : 'UV, khả năng mưa và gió dùng giá trị cao nhất trong ngày; lượng mưa là tổng ngày.'}</Text>
      </ScrollView>
      <DataNote />
      <HomeIndicator />
    </ScreenShell>
  );
};

const HourChart = ({hours, activeIndex}: {hours: HourItem[]; activeIndex: number}) => (
  <View style={styles.chartCard}>
    <Text style={styles.chartTitle}>Nhiệt độ quanh giờ đã chọn (°C)</Text>
    <View style={styles.chartBars}>{hours.slice(0, 5).map((hour, index) => <View key={hour.time} style={styles.chartMark}><Text style={styles.chartValue}>{round(hour.temperature)}°</Text><View style={[styles.chartBar, index === activeIndex && styles.chartBarActive, {height: 28 + index * 8}]} /><Text style={styles.chartHour}>{shortTime(hour.time)}</Text></View>)}</View>
  </View>
);

const DaylightCard = ({day}: {day: DayItem}) => (
  <View style={styles.daylightCard}>
    <View style={styles.daylightItem}><Text style={styles.daylightIcon}>☼↟</Text><Text style={styles.daylightTime}>{day.sunrise ? shortTime(day.sunrise) : '--:--'}</Text><Text style={styles.daylightLabel}>Bình minh</Text></View>
    <View style={styles.daylightItem}><Text style={styles.daylightIcon}>☼↡</Text><Text style={styles.daylightTime}>{day.sunset ? shortTime(day.sunset) : '--:--'}</Text><Text style={styles.daylightLabel}>Hoàng hôn</Text></View>
  </View>
);

export default DetailScreen;
