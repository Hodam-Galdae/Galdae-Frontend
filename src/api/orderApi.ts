// src/api/orderApi.ts
import axiosInstance from './axiosInstance';
import { OrderPagingQuery, OrderListItem, OrderDetailResponse, OrderCreateRequest, OrderCreateResponse, foodType, OrderSearchQuery } from '../types/orderTypes';


/* =========================
 * API functions
 * ========================= */

/**
 * 배달 그룹 목록 조회
 * GET /order
 * - 응답 스펙이 배열([])로 표기되어 있어 배열로 반환
 */
export const getOrderList = async (
    query: OrderPagingQuery = {}
): Promise<OrderListItem[]> => {
    try {
        console.log('🚀 파라미터:', query);
        const { data } = await axiosInstance.get<OrderListItem[]>('/order', {
            params: {
                pageNumber: query.pageNumber ?? 0,
                pageSize: query.pageSize ?? 10,
                property: query.property ?? 'createAt',
            },
        });
        console.log('🚀 서버에서 받은 배달 그룹 목록 데이터:', data);
        return data;
    } catch (error) {
        throw error;
    }
};
/**
 * 배달 음식 종류 목록 조회
 * GET /order/foodType
 * @param params
 * @returns foodType[]
 */
export const getFoodTypeList = async (): Promise<foodType[]> => {
    try {
        const { data } = await axiosInstance.get<foodType[] | { foodType: foodType[] }>('/order/foodType');
        return Array.isArray(data) ? data : (data?.foodType ?? []);
    } catch (error) {
        throw error;
    }
};
/**
 * 배달 그룹 검색
 * GET /order/search
 * - title(식당 이름) 필수
 * - 응답은 배열([])로 표기
 */
export const searchOrders = async (
    params: OrderSearchQuery
): Promise<OrderListItem[]> => {
    try {
        console.log('🚀 파라미터:', params);
        const { data } = await axiosInstance.get<OrderListItem[]>('/order/search', {
            params: {
                pageNumber: params.pageNumber ?? 0,
                pageSize: params.pageSize ?? 10,
                property: params.property ?? 'createAt',
                searchKeyword: params.searchKeyword,
            },
        });
        console.log('🚀 서버에서 받은 배달 그룹 검색 데이터:', data);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * 배달 그룹 상세
 * GET /order/{orderId}
 */
export const getOrderDetail = async (orderId: string): Promise<OrderDetailResponse> => {
    try {
        const { data } = await axiosInstance.get<OrderDetailResponse>(`/order/${orderId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * 배달 그룹 생성
 * POST /order
 */
export const createOrder = async (
    payload: OrderCreateRequest
): Promise<OrderCreateResponse> => {
    try {
        const { data } = await axiosInstance.post<OrderCreateResponse>('/order', payload);
        console.log('🚀 서버에서 받은 배달 그룹 생성 데이터:', data);
        return data;
    } catch (error) {
        console.error('❌ 배달 그룹 생성 실패:', error);
        throw error;
    }
};

/**
 * 배달 그룹 삭제
 * DELETE /order/{orderId}
 */
export const deleteOrder = async (orderId: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/order/${orderId}`);
    } catch (error) {
        throw error;
    }
};
