// src/api/placesApi.ts
import axiosInstance from './axiosInstance';
import type { PlacesResponse } from '../types/placesApiTypes';

/**
 * 대분류/소분류 목록 조회 API
 * GET /places
 *
 * @returns {Promise<PlacesResponse>} 대분류/소분류 목록 조회 성공 응답 데이터
 */
export const getPlaces = async (): Promise<PlacesResponse> => {
 //console.log('🚀 [대분류/소분류 목록 조회 요청] GET /places');
  // 추가적인 요청 파라미터가 없으므로 생략합니다.
  try {
    const response = await axiosInstance.get<PlacesResponse>('/places');
    //console.log('✅ [대분류/소분류 목록 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    //console.error('❌ [대분류/소분류 목록 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
