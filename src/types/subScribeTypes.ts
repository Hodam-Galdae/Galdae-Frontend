/* =============== Types =============== */

export type SubscribeType = 'OTT' | string;

export interface PagingQuery {
    pageNumber?: number; // 기본 0
    pageSize?: number;   // 기본 10
}

export interface PageResponse<T> {
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
    content: T[];
    number: number;
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
    numberOfElements: number;
    empty: boolean;
}

/** 목록 아이템 */
export interface SubscribeListItem {
    subscribeId: string;                 // uuid
    title: string;
    onePersonFee: string;
    totalGroupPersonCount: number;
    joinedPersonCount: number;
    subscribeType: SubscribeType;
    createdAt: string;                   // ISO string
}

/** 상세 보기 응답 */
export interface SubscribeDetailResponse {
    subscribeType: SubscribeType;
    title: string;
    onePersonFee: string;
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

/** 생성 요청 */
export interface SubscribeCreateRequest {
    subscribeType: SubscribeType;
    subscribeServiceId?: number; // 선택 서비스(id). 기타일 때는 미포함 가능
    etcService?: string;         // 기타 서비스명
    onePersonFee: string;
    totalPersonCount: number;
    content: string;
}

/** 생성 응답 */
export interface SubscribeCreateResponse {
    subscribeId: string; // uuid
    chatroomId: number;
}

/** 삭제 요청 (body) */
export interface SubscribeDeleteRequest {
    subscribeId: string; // uuid
}

/** 타입-서비스 목록 */
export interface TypeServiceItem {
    subscribeType: SubscribeType;
    subscribeServiceTypeList: Array<{ id: number; subscribeServiceTypeName: string }>;
}
