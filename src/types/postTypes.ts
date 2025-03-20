// types/postTypes.ts

/**
 * 갈대 생성 요청 데이터 타입
 */
export interface CreatePostRequest {
  majorDepartureId: number;
  subDepartureId: number;
  majorArrivalId: number;
  subArrivalId: number;
  departureTime: string;
  passengerType?: 'SAME'  | 'DONT_CARE'; // 예시에서는 "SAME"으로 내려오지만, 필요 시 다른 값도 허용 가능
  arrangeTime?: 'POSSIBLE' | 'IMPOSSIBLE';
  passengerCount?: number;
  isFavoriteRoute?: boolean;
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
