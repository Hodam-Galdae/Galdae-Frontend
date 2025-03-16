import axiosInstance from './axiosInstance';
import {
  CreatePostRequest,
  //DeletePostRequest,
  GetPostsRequest,
  SearchPostsRequest,
  GetPostDetailRequest,
} from '../types/postTypes'; // 타입 가져오기

/**
 * 갈대 생성 API
 */
export const createPost = async (accessToken: string, postData: CreatePostRequest) => {
  return axiosInstance.post('/posts/create', postData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

/**
 * 갈대 삭제 API
 */
export const deletePost = async (postId: string, accessToken: string) => {
  return axiosInstance.delete('/posts', {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { postId },
  });
};

/**
 * 갈대 실시간 조회 API
 */
export const getPosts = async ({ accessToken, pageNumber = 0, pageSize = 10, direction = 'DESC', properties = ['created_at'] }: GetPostsRequest) => {
  return axiosInstance.get('/posts', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { pageNumber, pageSize, direction, properties },
  });
};

/**
 * 갈대 검색 API
 */
export const searchPosts = async ({ accessToken, pageNumber = 0, pageSize = 10, direction = 'DESC', properties = ['created_at'], department, arrival }: SearchPostsRequest) => {
  return axiosInstance.get('/posts/search', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { pageNumber, pageSize, direction, properties, department, arrival },
  });
};

/**
 * 갈대 상세 보기 API
 */
export const getPostDetail = async ({ accessToken, postId }: GetPostDetailRequest) => {
  return axiosInstance.get('/posts/detail', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { postId },
  });
};
