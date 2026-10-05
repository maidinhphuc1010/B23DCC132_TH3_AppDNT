import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Tab} from './types';
import {colors} from './weatherUiUtils';
import {styles} from './styles';

export const ScreenShell = ({children}: {children: React.ReactNode}) => {
  const insets = useSafeAreaInsets();
  return <View style={[styles.shell, {paddingTop: Math.max(insets.top, 12)}]}>{children}</View>;
};

export const StatusBarMock = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusTime}>09:00</Text>
    <Text style={styles.statusIcons}>▮▮▮  Wi‑Fi  ▰</Text>
  </View>
);

export const HomeIndicator = () => <View style={styles.homeIndicator}><View style={styles.gestureHandle} /></View>;

export const Header = ({title, subtitle, onBack}: {title: string; subtitle: string; onBack?: () => void}) => (
  <View style={styles.header}>
    {onBack ? <Pressable style={styles.roundButtonSmall} onPress={onBack}><Text style={styles.iconText}>‹</Text></Pressable> : null}
    <View style={styles.headerCopy}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
    {!onBack ? <View style={styles.roundButton}><Text style={styles.iconText}>⌖</Text></View> : null}
  </View>
);

export const AppButton = ({label, icon, variant = 'primary', onPress, loading}: {label: string; icon: string; variant?: 'primary' | 'secondary'; onPress?: () => void; loading?: boolean}) => (
  <Pressable style={[styles.actionButton, variant === 'secondary' && styles.secondaryButton]} onPress={onPress} disabled={loading}>
    {loading ? <ActivityIndicator color="white" /> : <Text style={[styles.actionIcon, variant === 'secondary' && styles.secondaryText]}>{icon}</Text>}
    <Text style={[styles.actionLabel, variant === 'secondary' && styles.secondaryText]}>{label}</Text>
  </Pressable>
);

export const BottomTabs = ({active, onTab}: {active: Tab; onTab: (tab: Tab) => void}) => (
  <View style={styles.bottomNav}>
    <Pressable style={[styles.tabItem, active === 'today' && styles.tabActive]} onPress={() => onTab('today')}>
      <Text style={[styles.tabIcon, active === 'today' && styles.tabActiveText]}>☀︎</Text>
      <Text style={[styles.tabLabel, active === 'today' && styles.tabActiveText]}>Hôm nay</Text>
    </Pressable>
    <Pressable style={[styles.tabItem, active === 'forecast' && styles.tabActive]} onPress={() => onTab('forecast')}>
      <Text style={[styles.tabIcon, active === 'forecast' && styles.tabActiveText]}>▦</Text>
      <Text style={[styles.tabLabel, active === 'forecast' && styles.tabActiveText]}>7 ngày tới</Text>
    </Pressable>
  </View>
);

export const DataNote = () => (
  <Text style={styles.dataNote}>ⓘ  Dữ liệu trực tiếp từ Open‑Meteo</Text>
);

export const Metric = ({icon, value, label}: {icon: string; value: string; label: string}) => (
  <View style={styles.quickMetric}>
    <Text style={styles.metricIcon}>{icon}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

export const Measure = ({label, value, progress, context}: {label: string; value: string; progress: number; context: string}) => (
  <View style={styles.measureCard}>
    <Text style={styles.measureLabel}>{label}</Text>
    <Text style={styles.measureValue}>{value}</Text>
    <View style={styles.measureTrack}><View style={[styles.measureFill, {width: `${Math.max(8, Math.min(100, progress))}%`}]} /></View>
    <Text style={styles.measureContext}>{context}</Text>
  </View>
);

export {colors};
