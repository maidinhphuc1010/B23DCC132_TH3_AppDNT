import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {BottomTabs, DataNote, Header, HomeIndicator, ScreenShell, StatusBarMock, colors} from './components';
import {styles} from './styles';

const LoadingScreen = ({locationLabel}: {locationLabel: string}) => (
  <ScreenShell>
    <StatusBarMock />
    <Header title={locationLabel} subtitle="Đang chuẩn bị dự báo cho bạn" />
    <View style={styles.loadingContent}>
      <View style={styles.loadingStatus}><ActivityIndicator size="small" color={colors.blue} /><Text style={styles.loadingStatusText}>Đang tải dữ liệu thời tiết...</Text></View>
      <View style={styles.skeletonHero}><View style={styles.skeletonTemp} /><View style={styles.skeletonCircle} /></View>
      <View style={styles.skeletonLineLarge} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonMetricRow}>{[0, 1, 2, 3].map(item => <View key={item} style={styles.skeletonMetric}><View style={styles.skeletonIcon} /><View style={styles.skeletonSmallLine} /><View style={styles.skeletonTinyLine} /></View>)}</View>
      <View style={styles.skeletonHourRow}>{[0, 1, 2, 3].map(item => <View key={item} style={styles.skeletonHour}><View style={styles.skeletonPill} /><View style={styles.skeletonIconBig} /><View style={styles.skeletonSmallLine} /><View style={styles.skeletonTinyLine} /></View>)}</View>
      <Text style={styles.loadingHint}>Vui lòng chờ trong giây lát. Dự báo sẽ xuất hiện khi dữ liệu tải xong.</Text>
    </View>
    <DataNote />
    <BottomTabs active="today" onTab={() => undefined} />
    <HomeIndicator />
  </ScreenShell>
);

export default LoadingScreen;
