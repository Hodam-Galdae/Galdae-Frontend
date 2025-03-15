import axios from 'axios';

const API_BASE_URL = 'http://15.164.118.59/'; // 백엔드 API 주소

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 요청 제한 시간
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (요청 전에 공통 처리)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (응답 공통 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
