import axiosInstance from './axiosInstance';
import { MyCreatedPost,MyPostHistory } from '../types/getTypes';
/**
 * 사용자 정보 조회 API
 */
export const getUserInfo = async () => {
  console.log('🚀 [사용자 정보 조회 요청] GET /members');

  try {
    const response = await axiosInstance.get('/members');
    console.log('✅ [사용자 정보 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [사용자 정보 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 내가 생성한 갈대 조회 API
 */
export const getMyCreatedPosts = async (): Promise<MyCreatedPost[]> => {
  console.log('🚀 [내가 생성한 갈대 조회 요청] GET /members/posts');

  try {
    const response = await axiosInstance.get<MyCreatedPost[]>('/members/posts');
    console.log('✅ [내가 생성한 갈대 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [내가 생성한 갈대 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 내 갈대 기록 조회 API
 */
export const getMyPostHistory = async () :Promise<MyPostHistory[]>=> {
  console.log('🚀 [내 갈대 기록 조회 요청] GET /members/history');

  try {
    const response = await axiosInstance.get<MyPostHistory[]>('/members/history');
    console.log('✅ [내 갈대 기록 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [내 갈대 기록 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 자주 가는 경로 조회 API
 */
export const getFrequentRoutes = async () => {
  console.log('🚀 [자주 가는 경로 조회 요청] GET /members/frequent-route');

  try {
    const response = await axiosInstance.get('/members/frequent-route');
    console.log('✅ [자주 가는 경로 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [자주 가는 경로 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 회원 이미지 변경 API 호출 함수
 * @param image 변경할 이미지 URL 또는 base64 문자열
 * @returns API 응답 데이터
 */
export const updateMemberImage = async (image: string): Promise<any> => {
  const requestUrl = '/members/image';
  try {
    const response = await axiosInstance.post(requestUrl, { image });
    console.log('✅ 이미지 변경 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ 이미지 변경 실패:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 닉네임 변경 API
 */
export const updateNickname = async (nickname: string) => {
  console.log('🚀 [닉네임 변경 요청] PATCH /members/nickname');
  console.log('📌 요청 데이터:', { nickname });

  try {
    const response = await axiosInstance.patch('/members/nickname', { nickname });
    console.log('✅ [닉네임 변경 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [닉네임 변경 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 결제 정보 수정 API
 */
export const updateBankInfo = async (bankType: string, accountNumber: string, depositor: string) => {
  console.log('🚀 [결제 정보 수정 요청] PATCH /members/bank');
  console.log('📌 요청 데이터:', { bankType, accountNumber, depositor });

  try {
    const response = await axiosInstance.patch('/members/bank', {
      bankType,
      accountNumber,
      depositor,
    });
    console.log('✅ [결제 정보 수정 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [결제 정보 수정 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
