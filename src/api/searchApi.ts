// src/api/searchApi.ts

import axiosInstance from './axiosInstance';

// ===== Types =====
export type SearchGroupType = 'TAXI' | 'ORDER' | 'SUBSCRIBE';

export interface TaxiSearchResponse {
    taxiId: string;
    subDepartureName: string;
    subArrivalName: string;
    departureTime: string; // ISO
}

export interface OrderSearchResponse {
    orderId: string;
    restaurantName: string;
    orderLocation: string;
    foodType: string;
    orderAt: string; // ISO
}

export interface SubscribeSearchResponse {
    subscribeId: string;
    subscribeServiceName: string;
    onePersonFee: string; // 서버가 string이면 그대로 둠
}

// 스웨거 예시: key가 `subcribeSearchResponse` 오탈자일 수 있어서 둘 다 옵셔널 처리
export interface SearchItem {
    groupType: SearchGroupType;
    taxiSearchResponse?: TaxiSearchResponse | null;
    orderSearchResponse?: OrderSearchResponse | null;
    subscribeSearchResponse?: SubscribeSearchResponse | null;
    subcribeSearchResponse?: SubscribeSearchResponse | null; // typo fallback
}

export type SearchList = SearchItem[];

export interface SearchKeywordItem {
    searchCategory: SearchGroupType; // TAXI | ORDER | SUBSCRIBE
    keywords: string;
}

// ===== Helpers =====
const getData = <T>(p: Promise<{ data: T }>) => p.then(r => r.data);

/** 스웨거의 `subcribeSearchResponse` 오탈자를 `subscribeSearchResponse`로 보정 */
const normalizeItem = (raw: SearchItem): SearchItem => {
    if (raw && !raw.subscribeSearchResponse && raw.subcribeSearchResponse) {
        return { ...raw, subscribeSearchResponse: raw.subcribeSearchResponse };
    }
    return raw;
};

// ===== API =====

/**
 * 검색 API
 * @param searchKeyword 사용자 입력 검색어
 * - 'null' 문자열, 공백만, 빈 값은 요청하지 않고 빈 배열 반환
 * - 서버는 /search?searchKeyword=... 형태
 */
export const fetchSearch = async (searchKeyword: string): Promise<SearchList> => {
    const keyword = (searchKeyword ?? '').trim();

    // 스웨거에서 'null' 문자열로 호출하면 빈 배열이 오긴 하지만
    // 프론트에서 불필요 호출 방지
    if (!keyword || keyword.toLowerCase() === 'null') {
        return [];
    }

    const res = await axiosInstance.get<SearchList>('/search', {
        params: { searchKeyword: keyword },
    });

    const list = Array.isArray(res.data) ? res.data : [];
    return list.map(normalizeItem);
};

/**
 * 검색 키워드 목록 조회
 */
export const fetchSearchKeywords = () =>
    getData<SearchKeywordItem[]>(
        axiosInstance.get('/search/keywords'),
    );

// ===== 파생 유틸(선택) =====

/** 결과를 그룹 타입별로 분리 (UI에서 쓰기 편하게) */
export const splitByGroup = (items: SearchList) => {
    const taxi: TaxiSearchResponse[] = [];
    const order: OrderSearchResponse[] = [];
    const subscribe: SubscribeSearchResponse[] = [];

    items.forEach(i => {
        const g = i.groupType;
        if (g === 'TAXI' && i.taxiSearchResponse) {taxi.push(i.taxiSearchResponse);}
        if (g === 'ORDER' && i.orderSearchResponse) {order.push(i.orderSearchResponse);}
        if (g === 'SUBSCRIBE') {
            const s = i.subscribeSearchResponse ?? i.subcribeSearchResponse ?? null;
            if (s) {subscribe.push(s);}
        }
    });

    return { taxi, order, subscribe };
};
