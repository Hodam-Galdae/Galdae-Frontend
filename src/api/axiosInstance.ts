/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_BASE_URL = 'http://15.164.118.59'; // 백엔드 API 주소

const EXCLUDED_URLS = ['/auth/kako', '/auth/google', '/auth/apple'];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 제한 시간
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    //제외 대상 URL이면 스킵
    if (EXCLUDED_URLS.includes(config.url || '')) {
      return config;
    }

    try {
      const token = await EncryptedStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Token 가져오는 중 오류 발생:', error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 응답 인터셉터 (응답 공통 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const originalRequest = error.config;

    // 특정 API는 갱신 로직 제외
    // if (EXCLUDED_URLS.includes(originalRequest)) return Promise.reject(error);

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   const refreshToken = EncryptedStorage.getItem('refreshToken');
    //   if (!refreshToken) {
    //     await EncryptedStorage.removeItem('accessToken');
    //     return Promise.reject(error);
    //   }

    //   //refresh token 발급
    //   try {
    //     const res = await axios.post('', { refreshToken });
    //     await EncryptedStorage.setItem('accessToken', "");
    //     await EncryptedStorage.setItem('refreshToken', "");
    //     axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
    //     return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     await EncryptedStorage.removeItem('accessToken');
    //     return Promise.reject(refreshError);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
