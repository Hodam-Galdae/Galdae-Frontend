/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const API_BASE_URL = 'http://15.164.118.59'; // 백엔드 API 주소
export const WEB_SOCKET_URL = 'ws://15.164.118.59/ws'; // 백엔드 API 주소
export const PUB_ENDPOINT = '/send';
export const SUB_ENDPOINT = '/topic/chatroom';
const EXCLUDED_URLS = ['/auth/kakao', '/auth/google', '/auth/apple', '/ws'];
const MULTIPART_URLS = [
  '/auth/join',
  '/auth/university',
  '/members/image',
  '/report',
  '/question',
  '/chat/image',
];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 제한 시간
});

axiosInstance.interceptors.request.use(
  async config => {
    //제외 대상 URL이면 스킵
    if (EXCLUDED_URLS.includes(config.url || '')) {
      return config;
    }
    if (MULTIPART_URLS.includes(config.url || '')) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
   // console.log(config);
    try {
      const token = await EncryptedStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
       // console.log(`Bearer ${token}`);
      }
    } catch (error) {
     // console.error('Token 가져오는 중 오류 발생:', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터 (응답 공통 처리)
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    //console.error('API Error:', error.response?.data || error.message);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const memberId = await EncryptedStorage.getItem('memberId');
      if (!refreshToken) {
        await EncryptedStorage.removeItem('accessToken');
        return Promise.reject(error);
      }

      //refresh token 발급
      try {
       // console.log('refresh!');
        const res = await axios.post(API_BASE_URL + '/auth/reissue', { refreshToken, memberId });
        await EncryptedStorage.setItem('accessToken', res.data.accessToken);
        await EncryptedStorage.setItem('refreshToken', res.data.refreshToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await EncryptedStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
