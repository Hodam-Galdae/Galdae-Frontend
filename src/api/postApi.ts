import axiosInstance from './axiosInstance';
import {
  CreatePostRequest,
  GetPostsRequest,
  SearchPostsRequest,
  GetPostDetailRequest,
} from '../types/postTypes'; // 타입 가져오기

/**
 * 갈대 생성 API
 */
export const createPost = async (postData: CreatePostRequest) => {
  //console.log('🚀 [갈대 생성 요청] POST /posts/create');
  //console.log('📌 요청 데이터:', postData);

  try {
    const response = await axiosInstance.post('/posts/create', postData);
   // console.log('✅ [갈대 생성 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
   // console.error('❌ [갈대 생성 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 갈대 삭제 API
 */
export const deletePost = async (postId: string) => {
  //console.log('🚀 [갈대 삭제 요청] DELETE /posts');
 // console.log('📌 요청 데이터:', { postId });

  try {
    const response = await axiosInstance.delete('/posts', {
      data: { postId },
    });
   // console.log('✅ [갈대 삭제 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [갈대 삭제 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 갈대 실시간 조회 API
 */
export const getPosts = async (params: GetPostsRequest) => {
  const requestUrl = '/posts'; // API 엔드포인트
 // console.log(`🚀 [갈대 조회 요청] GET ${requestUrl}`);
 // console.log('📌 요청 파라미터:', params);

  // ✅ 모든 값이 string이 되도록 변환
  const formattedParams: Record<string, string> = {
    pageNumber: String(params.pageNumber ?? ''),  // 숫자를 문자열로 변환
    pageSize: String(params.pageSize ?? ''),      // 숫자를 문자열로 변환
    direction: params.direction ?? '',            // 문자열 그대로 사용
    properties: params.properties?.join(',') ?? '', // 배열을 쉼표로 구분된 문자열로 변환
  };

  // ✅ 쿼리 문자열로 변환
 // const queryString = new URLSearchParams(formattedParams).toString();
 // console.log(`🚀 요청 URL: /posts?${queryString}`);

  try {
    const response = await axiosInstance.get(requestUrl, { params: formattedParams });

   // console.log(`✅ [실제 요청된 URL]: ${response.config.url}`);
   // console.log('✅ 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
   // console.error('❌ [갈대 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
/**
 * 갈대 검색 API
 */
export const searchPosts = async (params: SearchPostsRequest) => {
 // console.log('🚀 [갈대 검색 요청] GET /posts/search');
 // console.log('📌 요청 파라미터:', params);

  // 모든 파라미터 값을 문자열로 변환
  const formattedParams: Record<string, string> = {
    pageNumber: String(params.pageNumber ?? ''),
    pageSize: String(params.pageSize ?? ''),
    direction: params.direction ?? '',
    properties: params.properties?.join(',') ?? '',
    majorDepartment: String(params.majorDepartment ?? ''),
    subDepartment: String(params.subDepartment ?? ''),
    majorArrival: String(params.majorArrival ?? ''),
    subArrival: String(params.subArrival ?? ''),
  };

  // 쿼리 문자열 생성
 // const queryString = new URLSearchParams(formattedParams).toString();
  //console.log(`🚀 요청 URL: /posts/search?${queryString}`);

  try {
    const response = await axiosInstance.get('/posts/search', { params: formattedParams });
    //console.log('✅ [갈대 검색 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [갈대 검색 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 갈대 상세 보기 API
 */
export const getPostDetail = async (params: GetPostDetailRequest) => {
 // console.log('🚀 [갈대 상세 조회 요청] GET /posts/detail');
 // console.log('📌 요청 파라미터:', params);

  try {
    const response = await axiosInstance.get('/posts/detail', { params });
   // console.log('✅ [갈대 상세 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
   // console.error('❌ [갈대 상세 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
