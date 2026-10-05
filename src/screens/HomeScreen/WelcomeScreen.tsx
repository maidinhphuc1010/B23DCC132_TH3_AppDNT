import React from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';

import {useWeather} from '../../WeatherContext';
import {AppButton, HomeIndicator, ScreenShell, StatusBarMock} from './components';
import {styles} from './styles';

const hanoiSky = require('../../assets/hanoi-sky.png');

const WelcomeScreen = () => {
  const {requestLocationAndLoad, useDefaultCity, loading} = useWeather();

  return (
    <ScreenShell>
      <StatusBarMock />
      <ScrollView contentContainerStyle={styles.welcomeContent} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <Text style={styles.brandIcon}>☼</Text>
          <Text style={styles.brandName}>Mây</Text>
          <Text style={styles.brandDescriptor}>Thời tiết mỗi ngày</Text>
        </View>
        <ImageBackground source={hanoiSky} style={styles.heroImage} imageStyle={styles.heroImageRadius} />
        <View style={styles.introBlock}>
          <Text style={styles.eyebrow}>BẮT ĐẦU NGÀY MỚI</Text>
          <Text style={styles.welcomeTitle}>Thời tiết nơi bạn,{`\n`}ngay trong tầm tay.</Text>
          <Text style={styles.bodyText}>Cho phép Mây dùng vị trí thiết bị để tìm thành phố và hiển thị dự báo phù hợp với nơi bạn đang ở.</Text>
        </View>
        <View style={styles.reassuranceCard}>
          <Text style={styles.reassuranceIcon}>♢</Text>
          <Text style={styles.reassuranceText}>Chỉ dùng vị trí để tìm thời tiết. Bạn vẫn có thể chọn thành phố thủ công nếu không muốn cấp quyền.</Text>
        </View>
        <View style={styles.actionStack}>
          <AppButton label="Cho phép dùng vị trí" icon="➤" onPress={requestLocationAndLoad} loading={loading} />
          <AppButton label="Chọn thành phố thủ công" icon="⌕" variant="secondary" onPress={useDefaultCity} />
        </View>
        <Text style={styles.footerCopy}>Bản thiết kế minh họa · Không truy cập vị trí thiết bị</Text>
      </ScrollView>
      <HomeIndicator />
    </ScreenShell>
  );
};

export default WelcomeScreen;
