import {NavigatorScreenParams} from '@react-navigation/native';

import {DetailRoute} from '../screens/HomeScreen/types';

export type WeatherTabParamList = {
  Today: undefined;
  Forecast: undefined;
};

export type WeatherStackParamList = {
  WeatherTabs: NavigatorScreenParams<WeatherTabParamList> | undefined;
  Detail: DetailRoute;
};
