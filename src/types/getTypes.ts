/**
 * 내 갈대 조회 타입 (홈화면)
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
  departure: {
    majorPlace: string;
    subPlace: string;
  };
  arrival: {
    majorPlace: string;
    subPlace: string;
  };
  departureTime: string; // ISO 8601 형식
  arrangeTime: 'POSSIBLE' | 'IMPOSSIBLE';
  totalPassengerCount: number;
  passengerCount: number;
}
/**
 * 실시간 갈대 타입
 */
export interface GaldaeItemType {
  postId: string;
  departure: {
    majorPlace: string;
    subPlace: string;
  };
  arrival: {
    majorPlace: string;
    subPlace: string;
  };
  departureTime: string; // ISO 8601 형식
  passengerGenderType: 'SAME' | 'DONT_CARE';
  arrangeTime: 'POSSIBLE' | 'IMPOSSIBLE';
  totalPassengerCount: number;
  passengerCount: number;
  createdAt: string; // 생성 시간 (ISO 8601 형식)
  userNickName: string | null;
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
/**
 * 사용자 프로필 이미지 변경 api 타입
 */
export interface ImageFile {
  uri: string;
  type: string;
  name: string;
}
/**
 * 알림 목록 조회 API 타입
 */
export interface Notification {
  notificationId: number;
  title: string;
  isChecked: boolean;
  daysBetween: number;
}

/**
 * 안읽은 알림 유무 API 타입
 */
export interface UncheckedNotificationResponse {
  postId: string;
  chatroomId: number;
}
/**
 * 알림 확인 API 타입
 */
export interface CheckNotificationRequest {
  notificationId: number;
}
/**
 * 내 문의 목록 조회 API 타입
 */
export interface QuestionItem {
  questionId: number;
  tag: string;
  title: string;
  content: string;
  responseContent: string;
  image: string;
  faqStatus: 'PENDING' | 'COMPLETE'; // 상태가 명확할 경우 리터럴 타입으로 고정
}
