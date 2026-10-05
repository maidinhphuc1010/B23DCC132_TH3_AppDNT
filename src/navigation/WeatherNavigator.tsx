import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, RouteProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useWeather} from '../WeatherContext';
import DetailScreen from '../screens/HomeScreen/DetailScreen';
import EmptyForecastScreen from '../screens/HomeScreen/EmptyForecastScreen';
import ForecastScreen from '../screens/HomeScreen/ForecastScreen';
import TodayScreen from '../screens/HomeScreen/TodayScreen';
import {Tab as WeatherTab} from '../screens/HomeScreen/types';
import {getDays, getHours} from '../screens/HomeScreen/weatherUiUtils';
import {WeatherStackParamList, WeatherTabParamList} from './types';

type WeatherStackNavigation = NativeStackNavigationProp<WeatherStackParamList>;
type DetailRouteProp = RouteProp<WeatherStackParamList, 'Detail'>;

const Stack = createNativeStackNavigator<WeatherStackParamList>();
const TabNavigator = createBottomTabNavigator<WeatherTabParamList>();

const navigateToTab = (navigation: WeatherStackNavigation, tab: WeatherTab) => {
  navigation.navigate('WeatherTabs', {screen: tab === 'today' ? 'Today' : 'Forecast'});
};

const TodayRouteScreen = () => {
  const {weather} = useWeather();
  const navigation = useNavigation<WeatherStackNavigation>();
  const hours = useMemo(() => (weather ? getHours(weather.hourly, weather.current.time) : []), [weather]);

  return (
    <TodayScreen
      hours={hours}
      onTab={tab => navigateToTab(navigation, tab)}
      onDetail={detailRoute => navigation.navigate('Detail', detailRoute)}
    />
  );
};

const ForecastRouteScreen = () => {
  const {weather, locationLabel, refresh, useDefaultCity} = useWeather();
  const navigation = useNavigation<WeatherStackNavigation>();
  const days = useMemo(() => (weather ? getDays(weather.daily) : []), [weather]);

  if (days.length === 0) {
    return (
      <EmptyForecastScreen
        locationLabel={locationLabel}
        onRetry={refresh}
        onToday={() => navigateToTab(navigation, 'today')}
        onChooseCity={useDefaultCity}
      />
    );
  }

  return (
    <ForecastScreen
      days={days}
      locationLabel={locationLabel}
      onTab={tab => navigateToTab(navigation, tab)}
      onDetail={detailRoute => navigation.navigate('Detail', detailRoute)}
    />
  );
};

const DetailRouteScreen = ({route}: {route: DetailRouteProp}) => {
  const {weather, locationLabel} = useWeather();
  const navigation = useNavigation<WeatherStackNavigation>();
  const hours = useMemo(() => (weather ? getHours(weather.hourly, weather.current.time) : []), [weather]);
  const days = useMemo(() => (weather ? getDays(weather.daily) : []), [weather]);

  return <DetailScreen route={route.params} hours={hours} days={days} locationLabel={locationLabel} onBack={navigation.goBack} />;
};

const WeatherTabs = () => (
  <TabNavigator.Navigator screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
    <TabNavigator.Screen name="Today" component={TodayRouteScreen} />
    <TabNavigator.Screen name="Forecast" component={ForecastRouteScreen} />
  </TabNavigator.Navigator>
);

const WeatherStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="WeatherTabs" component={WeatherTabs} />
    <Stack.Screen name="Detail" component={DetailRouteScreen} />
  </Stack.Navigator>
);

const WeatherNavigator = () => (
  <NavigationContainer>
    <WeatherStack />
  </NavigationContainer>
);

export default WeatherNavigator;
