// src/api/subscribeApi.ts
import axiosInstance from './axiosInstance';
import { PagingQuery, PageResponse, SubscribeListItem, SubscribeDeleteRequest, TypeServiceItem, SubscribeDetailResponse, SubscribeCreateRequest, SubscribeCreateResponse } from '../types/subScribeTypes';



/* =============== APIs =============== */

/**
 * 구독N빵 목록 조회
 * GET /subscribe
 */
export const getSubscribeList = async (
    query: PagingQuery = {}
): Promise<PageResponse<SubscribeListItem>> => {
    const { data } = await axiosInstance.get<PageResponse<SubscribeListItem>>('/subscribe', {
        params: {
            pageNumber: query.pageNumber ?? 0,
            pageSize: query.pageSize ?? 10,
        },
    });
    console.log('🚀 서버에서 받은 구독N빵 목록 데이터:', data);
    return data;
};

/**
 * 구독N빵 삭제
 * DELETE /subscribe
 * - body에 { subscribeId } 필요
 * - axios 의 delete 에서는 data 옵션으로 body 전달
 */
export const deleteSubscribe = async (
    payload: SubscribeDeleteRequest
): Promise<void> => {
    await axiosInstance.delete('/subscribe', { data: payload });
};

/**
 * 구독 목록 (타입-서비스)
 * GET /subscribe/type-service
 */
export const getSubscribeTypeService = async (): Promise<TypeServiceItem[]> => {
    const { data } = await axiosInstance.get<TypeServiceItem[]>('/subscribe/type-service');
    console.log('🚀 서버에서 받은 구독 타입-서비스 데이터:', data);
    return data;
};

/**
 * 구독N빵 검색
 * GET /subscribe/search
 * - query: pageNumber, searchKeyword
 */
export const searchSubscribe = async (
    params: { pageNumber?: number; searchKeyword: string }
): Promise<PageResponse<SubscribeListItem>> => {
    const { data } = await axiosInstance.get<PageResponse<SubscribeListItem>>('/subscribe/search', {
        params: {
            pageNumber: params.pageNumber ?? 0,
            searchKeyword: params.searchKeyword,
        },
    });
    console.log('🚀 서버에서 받은 구독N빵 검색 데이터:', data);
    return data;
};

/**
 * 구독N빵 상세 보기
 * GET /subscribe/detail
 * - query: subscribeId (uuid)
 */
export const getSubscribeDetail = async (
    subscribeId: string
): Promise<SubscribeDetailResponse> => {
    console.log('🚀 구독N빵 상세 보기 요청:', subscribeId);
    const { data } = await axiosInstance.get<SubscribeDetailResponse>('/subscribe/detail', {
        params: { subscribeId },
    });
    console.log('🚀 서버에서 받은 구독N빵 상세 데이터:', data);
    return data;
};

/**
 * 구독N빵 생성
 * POST /subscribe/create
 */
export const createSubscribe = async (
    payload: SubscribeCreateRequest
): Promise<SubscribeCreateResponse> => {
    const { data } = await axiosInstance.post<SubscribeCreateResponse>('/subscribe/create', payload);
    console.log('🚀 서버에서 받은 구독N빵 생성 데이터:', data);
    return data;
};
