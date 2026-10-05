import React from 'react';

import WeatherNavigator from '../../navigation/WeatherNavigator';
import {useWeather} from '../../WeatherContext';
import EmptyForecastScreen from './EmptyForecastScreen';
import ErrorScreen from './ErrorScreen';
import LoadingScreen from './LoadingScreen';
import WelcomeScreen from './WelcomeScreen';

const HomeScreen = () => {
  const {weather, loading, error, permissionRequested, locationLabel, refresh, useDefaultCity} = useWeather();

  if (!permissionRequested) return <WelcomeScreen />;
  if (loading && !weather) return <LoadingScreen locationLabel={locationLabel} />;
  if (error && !weather) return <ErrorScreen locationLabel={locationLabel} onRetry={refresh} onChooseCity={useDefaultCity} />;
  if (!weather) {
    return <EmptyForecastScreen locationLabel={locationLabel} onRetry={refresh} onToday={refresh} onChooseCity={useDefaultCity} />;
  }

  return <WeatherNavigator />;
};

export default HomeScreen;
