import React from 'react';
import {Text, View} from 'react-native';

import {AppButton, BottomTabs, DataNote, Header, HomeIndicator, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';

const EmptyForecastScreen = ({locationLabel, onRetry, onToday, onChooseCity}: {locationLabel: string; onRetry: () => void; onToday: () => void; onChooseCity: () => void}) => (
  <ScreenShell>
    <StatusBarMock />
    <Header title="7 ngày tới" subtitle={`${locationLabel} · Chưa có dữ liệu`} />
    <View style={styles.emptyContent}>
      <View style={styles.emptyIllustration}>
        <View style={styles.calendarHeading}><Text style={styles.blueIcon}>▦</Text><View style={styles.calendarPlaceholder} /></View>
        <View style={styles.lineLarge} />
        <View style={styles.lineSmall} />
        <View style={styles.searchBadge}><Text style={styles.searchBadgeText}>⌕</Text></View>
      </View>
      <Text style={styles.stateTitle}>Chưa có dự báo</Text>
      <Text style={styles.stateDescription}>Hiện chưa có dữ liệu dự báo cho {locationLabel}. Bạn có thể tải lại hoặc thử xem thời tiết ở một thành phố khác.</Text>
      <View style={styles.actionStackWide}>
        <AppButton label="Tải lại dự báo" icon="↻" onPress={onRetry} />
        <AppButton label="Chọn thành phố khác" icon="⌕" variant="secondary" onPress={onChooseCity} />
      </View>
      <Text style={styles.emptyHint}>Chưa có dữ liệu không có nghĩa là trời quang.{`\n`}Hãy kiểm tra lại trước khi lên kế hoạch.</Text>
    </View>
    <DataNote />
    <BottomTabs active="forecast" onTab={tab => tab === 'today' && onToday()} />
    <HomeIndicator />
  </ScreenShell>
);

export default EmptyForecastScreen;
