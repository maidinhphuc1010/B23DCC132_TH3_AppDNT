export const getWeatherStatus = (code: number): string => {
  if (code === 0) {
    return 'Trời nắng';
  }

  if (code === 1 || code === 2) {
    return 'Nắng xen mây';
  }

  if (code === 3) {
    return 'Nhiều mây';
  }

  if (code === 45 || code === 48) {
    return 'Có sương mù';
  }

  if (code >= 51 && code <= 67) {
    return 'Có mưa';
  }

  if (code >= 71 && code <= 77) {
    return 'Có tuyết';
  }

  if (code >= 80 && code <= 82) {
    return 'Mưa rào';
  }

  if (code >= 95) {
    return 'Có giông';
  }

  return 'Không xác định';
};
