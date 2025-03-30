import axiosInstance from './axiosInstance';
import axios from 'axios';
import { MyCreatedPost,MyPostHistory,ImageFile } from '../types/getTypes';
/**
 * 사용자 정보 조회 API
 */
export const getUserInfo = async () => {
  //console.log('🚀 [사용자 정보 조회 요청] GET /members');

  try {
    const response = await axiosInstance.get('/members');
    //console.log('✅ [사용자 정보 조회 성공] 응답 데이터:', response.data);
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
  //console.log('🚀 [내가 생성한 갈대 조회 요청] GET /members/posts');

  try {
    const response = await axiosInstance.get<MyCreatedPost[]>('/members/posts');
    //console.log('✅ [내가 생성한 갈대 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    //console.error('❌ [내가 생성한 갈대 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 내 갈대 기록 조회 API
 */
export const getMyPostHistory = async () :Promise<MyPostHistory[]>=> {
  //console.log('🚀 [내 갈대 기록 조회 요청] GET /members/history');

  try {
    const response = await axiosInstance.get<MyPostHistory[]>('/members/history');
    //console.log('✅ [내 갈대 기록 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    //console.error('❌ [내 갈대 기록 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 자주 가는 경로 조회 API
 */
export const getFrequentRoutes = async () => {
  //console.log('🚀 [자주 가는 경로 조회 요청] GET /members/frequent-route');

  try {
    const response = await axiosInstance.get('/members/frequent-route');
    //console.log('✅ [자주 가는 경로 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [자주 가는 경로 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 회원 이미지 변경 API 호출 함수 (Form-Data 방식)
 * @param imageUri 로컬 이미지 파일 경로 (예: file:///... 형식)
 * @returns API 응답 데이터
 */
export const updateMemberImage = async (imageUri: string): Promise<unknown> => {
  const requestUrl = '/members/image';
  const formData = new FormData();

  const file: ImageFile = {
    uri: imageUri,
    type: 'image/jpeg', // 실제 이미지 형식에 맞게 설정 (예: image/png)
    name: 'profile.jpg',
  };

  // React Native에서는 FormData에 { uri, type, name } 형태의 객체를 전달할 수 있음
  // TypeScript에서는 Blob 타입과 맞지 않으므로, unknown을 통해 Blob으로 캐스팅합니다.
  formData.append('image', file as unknown as Blob);


  try {
    const response = await axiosInstance.post(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    //console.log('✅ 이미지 변경 성공:', response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      //console.error('❌ 이미지 변경 실패:', error.response ? error.response.data : error);
    } else {
      //console.error('❌ 이미지 변경 실패:', error);
    }
    throw error;
  }
};
/**
 * 닉네임 변경 API
 */
export const updateNickname = async (nickname: string) => {
  //console.log('🚀 [닉네임 변경 요청] PATCH /members/nickname');
  //console.log('📌 요청 데이터:', { nickname });

  try {
    const response = await axiosInstance.patch('/members/nickname', { nickname });
    //console.log('✅ [닉네임 변경 성공] 응답 데이터:', response.data);
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
  //console.log('🚀 [결제 정보 수정 요청] PATCH /members/bank');
  ////console.log('📌 요청 데이터:', { bankType, accountNumber, depositor });

  try {
    const response = await axiosInstance.patch('/members/bank', {
      bankType,
      accountNumber,
      depositor,
    });
    //console.log('✅ [결제 정보 수정 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    //console.error('❌ [결제 정보 수정 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 로그아웃 API 호출 함수
 * @param token 엑세스 토큰
 * @returns API 응답 데이터
 */
export const logoutMember = async (token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/members/logout',
      null, // 요청 본문이 필요 없으므로 null 전달
      {
        headers: {
          Authorization: token, // 헤더에 엑세스 토큰 설정
        },
      }
    );
    //console.log('✅로그아웃 성공:', response.data);
    return response.data;
  } catch (error: any) {
    //console.error('❌로그아웃 실패:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 회원 탈퇴 API 호출 함수
 * @returns API 응답 데이터
 */
export const withdrawMember = async (): Promise<any> => {
  //console.log('🚀 [회원 탈퇴 요청] POST /members/withdraw');

  try {
    const response = await axiosInstance.post('/members/withdraw');
   // console.log('✅ [회원 탈퇴 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
   // console.error('❌ [회원 탈퇴 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 정산 내역 조회 api 타입
 * @returns
 */
export const getPaymentList = async () => {
  //console.log('🚀 [정산 내역 조회 요청] GET /members/payment');

  try {
    const response = await axiosInstance.get('/members/payment');
    //console.log('✅ [정산 내역 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
   // console.error('❌ [정산 내역 조회 실패] 오류 발생:', error.response?.data || error);
    throw error;
  }
};
