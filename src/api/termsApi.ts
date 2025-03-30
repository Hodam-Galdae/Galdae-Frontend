import axiosInstance from './axiosInstance';
import {Term} from '../types/getTypes';


/**
 * 공지사항 목록 조회 API
 * GET /terms/list
 */
export const getTermsList = async (): Promise<Term[]> => {
  //console.log('🚀 [공지사항 목록 조회 요청] GET /terms/list');

  try {
    const response = await axiosInstance.get<Term[]>('/terms/list');
    //console.log('✅ [공지사항 목록 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    // console.error(
    //   '❌ [공지사항 목록 조회 실패]',
    //   error.response ? error.response.data : error
    // );
    throw error;
  }
};
