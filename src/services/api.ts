import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
});

export default axiosClient;