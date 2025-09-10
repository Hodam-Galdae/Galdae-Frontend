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
  passengerType?: 'SAME' | 'DONT_CARE'; // 예시에서는 "SAME"으로 내려오지만, 필요 시 다른 값도 허용 가능
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
  direction?: string;
  properties?: string[];
}
/**
 * 갈대 검색 요청 타입
 * 출발지와 도착지의 이름은 필수이며,
 * 추가적으로 대분류와 소분류 ID도 전달할 수 있습니다.
 */
export interface SearchPostsRequest extends GetPostsRequest {
  majorDepartment: number; // 출발지 대분류 ID
  subDepartment: number;   // 출발지 소분류 ID
  majorArrival: number;    // 도착지 대분류 ID
  subArrival: number;      // 도착지 소분류 ID
}
/**
 * 갈대 상세 조회 요청 타입
 */
export interface GetPostDetailRequest {
  postId: string;
}
/**
 * 지역 및 학교 선택 API
 * /on-boarding/university-area
 */
export interface GetUniversityAreaRequest {
  university: string;
  universityArea: string;
}

/**
 * 토큰 재발급 API
 * /on-boarding/reissue
 */
export interface ReissueTokenRequest {
  refreshToken: string;
  memberId: string;
}

/**
 * 회원 가입 API
 * /on-boarding/join
 */
export interface JoinRequest {
  joinRequestDTO: JoinRequestDTO;
  profileImage: string;
}

/**
 * 회원 가입 API 데이터
 * /on-boarding/join
 */
export interface JoinRequestDTO {
  nickname: string;
  gender: string;
  bankType: string;
  accountNumber: string;
  depositor: string;
  deviceToken: string;
}

/**
 * 닉네임 중복 검사 API
 * /on-boarding/check/nickname
 */
export interface CheckNicknameRequest {
  nickname: string;
}

/**
 * 대학교 인증 API
 * /mail/verify
 */
export interface VerifyUniversityRequest {
  code: string;
}

/**
 * 대학교 인증 메일 발송 API
 * /mail/send
 */
export interface SendUniversityMailRequest {
  email: string;
  studentId: string;
  department: string;

}
