import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
export const API_BASE_URL = Config.API_BASE_URL; // 백엔드 API 주소
export const WEB_SOCKET_URL = Config.WEB_SOCKET_URL; // 백엔드 API 주소
export const PUB_ENDPOINT = '/send';
export const SUB_ENDPOINT = '/topic/chatroom';
export const CHAT_COUNT_ENDPOINT = '/topic/chatCount';

// API 설정 정보 로그 출력
console.log('🌐 [API Config] API_BASE_URL:', API_BASE_URL);
console.log('🌐 [API Config] WEB_SOCKET_URL:', WEB_SOCKET_URL);
const EXCLUDED_URLS = ['/auth/kakao', '/auth/google', '/auth/apple', '/ws'];
const MULTIPART_URLS = [
  '/auth/join',
  '/auth/university',
  '/members/image',
  '/report',
  '/question',
  '/chat/image',
  '/on-boarding/join',
];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 제한 시간
});

axiosInstance.interceptors.request.use(
  async config => {
    console.log('🚀 [Axios Request] 시작');
    console.log('🚀 [Axios Request] URL:', config?.baseURL + config?.url);
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
      console.log('🔄 [Axios Response] 401 에러 - 토큰 갱신 시도');
      originalRequest._retry = true;

      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const memberId = await EncryptedStorage.getItem('memberId');
      console.log('🔄 [Axios Response] refreshToken 존재:', !!refreshToken);
      console.log('🔄 [Axios Response] memberId:', memberId);

      if (!refreshToken) {
        console.log('❌ [Axios Response] refreshToken 없음 - 로그아웃 처리');
        await EncryptedStorage.removeItem('accessToken');
        return Promise.reject(error);
      }

      //refresh token 발급
      try {
        console.log('🔄 [Axios Response] 토큰 갱신 요청 시작');
        const res = await axios.post(API_BASE_URL + '/on-boarding/reissue', { refreshToken, memberId });
        console.log('✅ [Axios Response] 토큰 갱신 성공');

        await EncryptedStorage.setItem('accessToken', res.data.accessToken);
        await EncryptedStorage.setItem('refreshToken', res.data.refreshToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;

        console.log('🔄 [Axios Response] 원래 요청 재시도');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ [Axios Response] 토큰 갱신 실패:', refreshError);
        await EncryptedStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
