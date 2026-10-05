import React from 'react';
import {Text, View} from 'react-native';

import {AppButton, BottomTabs, DataNote, Header, HomeIndicator, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';

const ErrorScreen = ({locationLabel, onRetry, onChooseCity}: {locationLabel: string; onRetry: () => void; onChooseCity: () => void}) => (
  <ScreenShell>
    <StatusBarMock />
    <Header title={locationLabel} subtitle="Thời tiết hôm nay" />
    <View style={styles.emptyContent}>
      <View style={styles.errorIllustration}>
        <Text style={styles.errorWeather}>🌦️</Text>
        <View style={styles.connectionBadge}><Text style={styles.connectionBadgeText}>⌁</Text></View>
      </View>
      <Text style={styles.stateTitle}>Chưa thể kết nối</Text>
      <Text style={styles.stateDescription}>Không thể tải thời tiết cho {locationLabel}. Hãy kiểm tra Wi‑Fi hoặc dữ liệu di động, rồi thử lại nhé.</Text>
      <View style={styles.actionStackWide}>
        <AppButton label="Thử lại" icon="↻" onPress={onRetry} />
        <AppButton label="Chọn thành phố khác" icon="⌖" variant="secondary" onPress={onChooseCity} />
      </View>
      <Text style={styles.emptyHint}>Chưa có dữ liệu mới để hiển thị.{`\n`}Bạn có thể thử lại khi kết nối ổn định.</Text>
    </View>
    <DataNote />
    <BottomTabs active="today" onTab={() => undefined} />
    <HomeIndicator />
  </ScreenShell>
);

export default ErrorScreen;
