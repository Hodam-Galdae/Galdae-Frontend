/* =========================
 * Types
 * ========================= */

export type GroupType = 'TAXI' | 'ORDER' | 'SUBSCRIBE';

export interface GroupListItem {
    id: string;
    sameGenderYN: boolean;
    titleLeft: string;
    titleRight: string;
    type: GroupType;
    maximumPerson: string;   // 서버 스웨거가 string으로 표시
    currentPerson: string;   // 서버 스웨거가 string으로 표시
    isTimeNegotiable: boolean;
    passengerGenderType: string;
    /** 택시일 때 출발 시각 */
    departAt?: string;       // ISO string or server string
    /** 배달일 때 주문 시각 */
    orderAt?: string;        // ISO string or server string
    /** 배달/택시 비용 등 (스웨거는 string) */
    price?: string;
}

export interface GroupJoinResponse {
    chatroomId: number;
    joinedMemberName: string;
    joinedMemberImage: string;
}

export interface GroupPagingQuery {
    pageNumber?: number; // default 0
    pageSize?: number;   // default 10
}
