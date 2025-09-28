/* =========================
 * Types
 * ========================= */

export type OrderProperty = 'createAt' | 'orderAt';
export type ArrangeType = 'POSSIBLE' | 'IMPOSSIBLE';

export interface OrderPagingQuery {
    pageNumber?: number; // default 0
    pageSize?: number;   // default 10
    property?: OrderProperty; // default createAt
}
export interface OrderSearchQuery {
    pageNumber?: number; // default 0
    pageSize?: number;   // default 10
    property?: OrderProperty; // default createAt
    searchKeyword: string;
}

export interface OrderListItem {
    id: string;
    restaurantName: string;
    orderLocation: string;
    orderAt: string;
    currentPersonCount: string;
    maximumPersonCount: string;
    isTimeNegotiable: boolean
}

export interface OrderListItemResponse {
    orderGroupId: string;
    chatroomId: number;
}

export interface OrderDetailResponse {
    isTimeNegotiable: boolean;
    restaurantName: string; // 음식점 이름
    orderLocation: string; // 주문 위치
    groupOwner: string; // 그룹 주인
    orderAt: string;    // ISO
    maximumPerson: string; // 최대 인원
    currentPerson: string; // 현재 인원
    description: string; // 설명
    canJoin: boolean; // 참여 가능 여부
    isOwner: boolean; // 주인 여부
}

export interface OrderCreateRequest {
    foodType: string;
    restaurantName: string;
    orderAt: string;         // ISO
    orderLocation: string;
    orderPersonCount: number;
    description: string;
    arrange: ArrangeType;    // "POSSIBLE" | "IMPOSSIBLE"
}

export interface OrderCreateResponse {
    orderGroupId: string; // uuid
    chatroomId: number;
}

export interface foodType {
    name: string;
    code: string;
}
