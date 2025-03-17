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
  console.log('🚀 [갈대 생성 요청] POST /posts/create');
  console.log('📌 요청 데이터:', postData);

  try {
    const response = await axiosInstance.post('/posts/create', postData);
    console.log('✅ [갈대 생성 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [갈대 생성 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 갈대 삭제 API
 */
export const deletePost = async (postId: string) => {
  console.log('🚀 [갈대 삭제 요청] DELETE /posts');
  console.log('📌 요청 데이터:', { postId });

  try {
    const response = await axiosInstance.delete('/posts', {
      data: { postId },
    });
    console.log('✅ [갈대 삭제 성공] 응답 데이터:', response.data);
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
  console.log('🚀 [갈대 조회 요청] GET /posts');
  console.log('📌 요청 파라미터:', params);

  try {
    const response = await axiosInstance.get('/posts', { params });
    console.log('✅ [갈대 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [갈대 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};

/**
 * 갈대 검색 API
 */
export const searchPosts = async (params: SearchPostsRequest) => {
  console.log('🚀 [갈대 검색 요청] GET /posts/search');
  console.log('📌 요청 파라미터:', params);

  try {
    const response = await axiosInstance.get('/posts/search', { params });
    console.log('✅ [갈대 검색 성공] 응답 데이터:', response.data);
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
  console.log('🚀 [갈대 상세 조회 요청] GET /posts/detail');
  console.log('📌 요청 파라미터:', params);

  try {
    const response = await axiosInstance.get('/posts/detail', { params });
    console.log('✅ [갈대 상세 조회 성공] 응답 데이터:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [갈대 상세 조회 실패] 오류 발생:', error.response ? error.response.data : error);
    throw error;
  }
};
