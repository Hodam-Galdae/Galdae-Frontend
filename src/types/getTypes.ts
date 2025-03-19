/**
 * 실시간 갈대 조회 타입
 */
export interface MyCreatedPost {
    departure: string; // 출발지
    arrival: string; // 도착지
    createdAt: string; // 생성 시간 (ISO 8601 형식)
}
/**
 * 내 갈대 기록 조회 타입
 */
export interface MyPostHistory {
    departure: string; // 출발지
    arrival: string; // 도착지
    departureTime: string; // 출발 시간 (ISO 8601 형식)
    arrangeTime: 'POSSIBLE' | 'IMPOSSIBLE'; // 시간 협의 가능 여부
    passengerCount: number; // 탑승 인원
}
/**
 * 실시간 갈대 타입
 */
export interface GaldaeItemType {
    departure: string; // 출발지 (예: 중원도서관)
    arrival: string; // 도착지 (예: 중원도서관)
    departureTime: string; // 출발 시간 (ISO 8601 형식)
    passengerGenderType: 'MALE' | 'FEMALE'; // 승객 성별 (MALE or FEMALE)
    arrangeTime: 'POSSIBLE' | 'IMPOSSIBLE'; // 시간 협의 가능 여부
    passengerCount: number | null; // 승객 수 (null일 수도 있음)
    createdAt: string; // 생성 시간 (ISO 8601 형식)
    userNickName: string | null; // 사용자 닉네임 (null일 수도 있음)
}
/**
 * 실시간 갈대 API 조회 타입
 */
export interface GaldaeApiResponse {
    content: GaldaeItemType[]; // 갈대 아이템 리스트
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  }


/**
 * 사용자 정보 조회 타입
 */
export interface UserInfo {
    nickname: string;
    university: string;
    image: string | null;
    bankType: string;
    depositor: string;
    accountNumber:string;
    isAuthenticated:boolean;
  }
