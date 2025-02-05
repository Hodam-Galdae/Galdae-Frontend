/**
 * API 요청 관리
 * 사용예시)
 * import api from '@services/api';

const fetchData = async () => {
  const response = await api.get('/data');
  console.log(response.data);
};
 */
import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // 필요 시 토큰 추가
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
