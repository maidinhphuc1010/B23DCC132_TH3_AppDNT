import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import {getWeather} from './services/weatherApi';
import {WeatherResponse} from './types/weather';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationResult {
  coordinates: Coordinates;
  label: string;
}

interface WeatherContextValue {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  permissionRequested: boolean;
  locationLabel: string;
  refresh: () => Promise<void>;
  requestLocationAndLoad: () => Promise<void>;
  useDefaultCity: () => Promise<void>;
}

const HANOI_COORDINATES: Coordinates = {latitude: 21.0285, longitude: 105.8542};
const DEFAULT_LOCATION_LABEL = 'Hà Nội';
const CURRENT_LOCATION_LABEL = 'Vị trí hiện tại';

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Cho phép truy cập vị trí',
      message: 'Ứng dụng cần vị trí hiện tại để hiển thị dự báo thời tiết chính xác hơn.',
      buttonPositive: 'Cho phép',
      buttonNegative: 'Từ chối',
    },
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
};

const getDeviceLocation = async (): Promise<LocationResult> => {
  const granted = await requestLocationPermission();

  if (!granted) {
    return {coordinates: HANOI_COORDINATES, label: DEFAULT_LOCATION_LABEL};
  }

  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          label: CURRENT_LOCATION_LABEL,
        });
      },
      () => resolve({coordinates: HANOI_COORDINATES, label: DEFAULT_LOCATION_LABEL}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 300000},
    );
  });
};

export const WeatherProvider = ({children}: {children: React.ReactNode}) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(HANOI_COORDINATES);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [locationLabel, setLocationLabel] = useState(DEFAULT_LOCATION_LABEL);

  const loadWeather = useCallback(async (nextCoordinates: Coordinates) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(nextCoordinates);
      setWeather(data);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Không thể tải dữ liệu thời tiết.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadWeather(coordinates);
  }, [coordinates, loadWeather]);

  const requestLocationAndLoad = useCallback(async () => {
    setPermissionRequested(true);
    const nextLocation = await getDeviceLocation();
    setCoordinates(nextLocation.coordinates);
    setLocationLabel(nextLocation.label);
    await loadWeather(nextLocation.coordinates);
  }, [loadWeather]);

  const useDefaultCity = useCallback(async () => {
    setPermissionRequested(true);
    setCoordinates(HANOI_COORDINATES);
    setLocationLabel(DEFAULT_LOCATION_LABEL);
    await loadWeather(HANOI_COORDINATES);
  }, [loadWeather]);

  const value = useMemo(
    () => ({
      weather,
      loading,
      error,
      permissionRequested,
      locationLabel,
      refresh,
      requestLocationAndLoad,
      useDefaultCity,
    }),
    [error, loading, locationLabel, permissionRequested, refresh, requestLocationAndLoad, useDefaultCity, weather],
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const value = useContext(WeatherContext);

  if (!value) {
    throw new Error('useWeather must be used inside WeatherProvider');
  }

  return value;
};
