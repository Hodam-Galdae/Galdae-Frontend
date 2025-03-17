// types/postTypes.ts

/**
 * 갈대 생성 요청 데이터 타입
 */
export interface CreatePostRequest {
    departure: string;
    arrival: string;
    departureTime: string;
    passengerType: 'MALE' | 'FEMALE';
    arrangeTime: 'POSSIBLE' | 'IMPOSSIBLE';
    passengerCount: number;
    isFavoriteRoute: boolean;
}
/**
 * 갈대 삭제 요청 타입
 */
export interface DeletePostRequest {
  postId: string;
}
/**
 * 갈대 목록 조회 요청 타입
 */
export interface GetPostsRequest {
  pageNumber?: number;
  pageSize?: number;
  direction?: 'ASC' | 'DESC';
  properties?: string[];
}
/**
 * 갈대 검색 요청 타입
 */
export interface SearchPostsRequest extends GetPostsRequest {
  department: string;
  arrival: string;
}
/**
 * 갈대 상세 조회 요청 타입
 */
export interface GetPostDetailRequest {
  postId: string;
}
