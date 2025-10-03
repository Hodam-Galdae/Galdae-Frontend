/* =========================
 * Types
 * ========================= */

export type Direction = 'ASC' | 'DESC';
export type ShareGenderType = 'SAME_GENDER' | 'DONT_CARE';
export type ArrangeTimeType = 'POSSIBLE' | 'IMPOSSIBLE';

export interface PlaceLite {
    majorPlace: string;
    subPlace: string;
}

export interface TaxiListItem {

    taxiId: string;
    departure: {
        majorPlace: string;
        subPlace: string;
    }
    arrival: {
        majorPlace: string;
        subPlace: string;
    }

    departureTime: string; // ISO
    passengerGenderType: ShareGenderType;
    arrangeTime: ArrangeTimeType;
    totalGroupPersonCount: number;
    joinedPersonCount: number;
    createdAt: string; // ISO
    userNickName: string | null;
    sameGenderYN: boolean;
}

/**
 * 갈대(택시) 검색
 * GET /taxi/search
 *
 * @param params 검색/페이지 파라미터
 *  - department / arrival (문자 검색)
 *  - 또는 major/sub (숫자 ID) 조합
 */
export interface TaxiSearchParams {
    pageNumber?: number; // 기본 0
    pageSize?: number;   // 기본 10
    subDepartureId: number; // required
    subArrivalId: number;   // required
}

export interface TaxiListResponsePage {
    pageable: {
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        offset: number;
        sort: { sorted: boolean; empty: boolean; unsorted: boolean };
        unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    size: number;
    content: TaxiListItem[];
    number: number;
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
    numberOfElements: number;
    empty: boolean;
}

export interface TaxiDetailPlace {
    majorPlace: string;
    subPlace: string;
    latitude: string;
    longtitude: string;
    image: string;
}

export interface TaxiDetailResponse {
    departure: TaxiDetailPlace;
    arrival: TaxiDetailPlace;
    departureTime: string; // ISO
    genderType: ShareGenderType;
    arrangeTime: ArrangeTimeType;
    totalPersonCount: number;
    joinedPersonCount: number;
    content: string;
    isParticipatedGroup: boolean;
    isWriter: boolean;
    userInfo: {
        nickname: string;
        university: string;
    };
}

export interface TaxiCreateRequest {
    majorDepartureId: number;
    subDepartureId: number;
    majorArrivalId: number;
    subArrivalId: number;
    departureTime: string; // ISO
    shareGenderType: ShareGenderType;
    arrangeTime: ArrangeTimeType;
    totalPersonCount: number;
    content: string;
}

export interface TaxiCreateResponse {
    taxiId: string;    // uuid
    chatroomId: number;
}

export interface TaxiDeleteRequest {
    taxiId: string; // uuid
}

/* ====== 공통 페이지 파라미터 ====== */

export interface PagingQuery {
    pageNumber?: number;        // default 0
    pageSize?: number;          // default 10
    direction?: Direction;      // default DESC
    /** 정렬 기준 (여러 개) — /taxi/search 에서 사용 */
    // properties?: string[];      // e.g., ["created_at"]
    /** 단일 정렬 키 — /taxi 목록에서 스펙이 혼재되어 있어 옵션으로 둠 */
    property?: string;          // e.g., "create_at"
}
