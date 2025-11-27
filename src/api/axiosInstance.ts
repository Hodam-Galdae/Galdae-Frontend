import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/env';
import { replace } from '../utils/navigationRef';

export const API_BASE_URL = config.API_BASE_URL; // 백엔드 API 주소
export const WEB_SOCKET_URL = config.WEB_SOCKET_URL; // WebSocket URL
export const PUB_ENDPOINT = '/send';
export const SUB_ENDPOINT = '/topic/chatroom';
export const CHAT_COUNT_ENDPOINT = '/topic/chatCount';

// API 설정 정보 로그 출력
console.log('🌐 [API Config] API_BASE_URL:', API_BASE_URL);
console.log('🌐 [API Config] WEB_SOCKET_URL:', WEB_SOCKET_URL);
console.log('🌐 [API Config] Environment:', config.ENV);
const EXCLUDED_URLS = ['/auth/kakao', '/auth/google', '/auth/apple', '/ws', '/auth/naver'];
const MULTIPART_URLS = [
  '/auth/join',
  '/auth/university',
  '/report',
  '/question',
  // '/members/image', // Presigned URL 방식으로 변경됨 (PATCH /members/image는 JSON)
  // '/chat/image', // Presigned URL 방식으로 변경됨
  // '/on-boarding/join', // Presigned URL 방식으로 변경됨 (JSON)
];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 제한 시간
});


axiosInstance.interceptors.request.use(
  async config => {
    console.log('🚀 [Axios Request] 시작');
    console.log('🚀 [Axios Request] URL:', (config?.baseURL ?? '') + config?.url);
    console.log('🚀 [Axios Request] Method:', config.method?.toUpperCase());
    console.log('🚀 [Axios Request] Headers:', config.headers);
    console.log('🚀 [Axios Request] Data:', config.data);

    //제외 대상 URL이면 스킵
    if (EXCLUDED_URLS.includes(config.url || '')) {
      console.log('🚀 [Axios Request] 제외된 URL - 토큰 추가 스킵');
      return config;
    }
    if (MULTIPART_URLS.includes(config.url || '')) {
      config.headers['Content-Type'] = 'multipart/form-data';
      console.log('🚀 [Axios Request] Content-Type: multipart/form-data');
    } else {
      config.headers['Content-Type'] = 'application/json';
      console.log('🚀 [Axios Request] Content-Type: application/json');
    }

    try {
      const token = await EncryptedStorage.getItem('accessToken');
      //const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMWRiODBjZS1hMmZhLTRjMDMtYmE4Yi0wYzEwZDg0YjM0ODIiLCJleHAiOjE3NTkwNTA4NzUsInJvbGVzIjpbIlVTRVIiXX0.G9y0kdyBC4LQ3PET4v9EhLQ-giA6uJZLbdBLrYPmyMCbZe-g1w6wqSkeWoNFYo0N6Bra39KrQSJs935CpnHi0A';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🚀 [Axios Request] Authorization 토큰 추가됨');
      } else {
        console.log('🚀 [Axios Request] Authorization 토큰 없음');
      }
    } catch (error) {
      console.error('❌ [Axios Request] Token 가져오는 중 오류 발생:', error);
    }

    console.log('🚀 [Axios Request] 최종 config:', config);
    return config;
  },
  error => {
    console.error('❌ [Axios Request] 인터셉터 에러:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (응답 공통 처리)
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ [Axios Response] 성공');
    console.log('✅ [Axios Response] URL:', response.config.url);
    console.log('✅ [Axios Response] Status:', response.status);
    console.log('✅ [Axios Response] Data:', response.data);
    return response;
  },
  async error => {
    console.error('❌ [Axios Response] 에러 발생');
    console.error('❌ [Axios Response] URL:', error.config?.url);
    console.error('❌ [Axios Response] Status:', error.response?.status);
    console.error('❌ [Axios Response] Error Data:', error.response?.data);
    console.error('❌ [Axios Response] Error Message:', error.message);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const memberId = await EncryptedStorage.getItem('memberId');

      if (!refreshToken || !memberId) {
        // 게스트 모드인지 확인
        const isGuestMode = await AsyncStorage.getItem('isGuestMode');

        if (isGuestMode === 'true') {
          // 게스트 모드에서는 로그인 화면으로 리다이렉트하지 않음
          console.log('⚠️ [Axios] 401 에러 - 게스트 모드이므로 로그인 화면으로 이동하지 않음');
          return Promise.reject(error);
        }

        // 모든 토큰 삭제
        try {
          await EncryptedStorage.removeItem('accessToken');
          await EncryptedStorage.removeItem('refreshToken');
          await EncryptedStorage.removeItem('memberId');
        } catch (storageError) {
          console.error('토큰 삭제 실패:', storageError);
        }
        // 로그인 화면으로 리다이렉트
        console.log('🔄 [Axios] 401 에러 - 로그인 화면으로 이동');
        replace('Login');
        return Promise.reject(error);
      }

      // refresh token으로 새 토큰 발급
      try {
        const res = await axios.post(API_BASE_URL + '/on-boarding/reissue', { refreshToken, memberId });

        // 새로운 토큰 저장
        await EncryptedStorage.setItem('accessToken', res.data.accessToken);
        await EncryptedStorage.setItem('refreshToken', res.data.refreshToken);

        // 원본 요청에 새 토큰 설정
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        // axiosInstance의 default headers에도 새 토큰 설정 (이후 요청들을 위해)
        axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 토큰 갱신 실패 시 모든 토큰 삭제
        try {
          await EncryptedStorage.removeItem('accessToken');
          await EncryptedStorage.removeItem('refreshToken');
          await EncryptedStorage.removeItem('memberId');
        } catch (storageError) {
          console.error('토큰 삭제 실패:', storageError);
        }
        // 로그인 화면으로 리다이렉트
        console.log('🔄 [Axios] 토큰 갱신 실패 - 로그인 화면으로 이동');
        replace('Login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
