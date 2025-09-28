// src/api/taxiApi.ts
import axiosInstance from './axiosInstance';
import { PagingQuery, TaxiListResponsePage, TaxiSearchParams, TaxiCreateRequest, TaxiCreateResponse, TaxiDeleteRequest, TaxiDetailResponse } from '../types/taxiType';


/* =========================
 * API 함수들
 * ========================= */

/**
 * 택시N빵 목록 조회
 * GET /taxi
 *
 * @param query 정렬/페이지 파라미터
 */
export const getTaxiList = async (
    query: PagingQuery = {}
): Promise<TaxiListResponsePage> => {
    try {
        const { data } = await axiosInstance.get<TaxiListResponsePage>('/taxi', {
            params: {
                pageNumber: query.pageNumber ?? 0,
                pageSize: query.pageSize ?? 10,
                direction: query.direction ?? 'DESC',
                // 스웨거에 property/properties가 혼재되어 있어 둘 다 전달 (서버가 무시해도 OK),
                property: query.property ?? 'create_at',
            },
        });
        return data;
    } catch (error: any) {
        // 필요 시 로그 남기기
        // console.error('❌ [택시 목록 조회 실패]', error.response?.data || error);
        throw error;
    }
};


export const searchTaxi = async (
    params: TaxiSearchParams
): Promise<TaxiListResponsePage> => {
    try {
        const { data } = await axiosInstance.get<TaxiListResponsePage>('/taxi/search', {
            params: {
                pageNumber: params.pageNumber ?? 0,
                pageSize: params.pageSize ?? 10,
                subDepartureId: params.subDepartureId,
                subArrivalId: params.subArrivalId,
            },
        });
        return data;
    } catch (error: any) {
        throw error;
    }
};

/**
 * 택시N빵 상세 보기
 * GET /taxi/detail?taxiId=...
 */
export const getTaxiDetail = async (taxiId: string): Promise<TaxiDetailResponse> => {
    try {
        const { data } = await axiosInstance.get<TaxiDetailResponse>('/taxi/detail', {
            params: { taxiId },
        });
        return data;
    } catch (error: any) {
        throw error;
    }
};

/**
 * 택시N빵 생성
 * POST /taxi/create
 */
export const createTaxi = async (
    payload: TaxiCreateRequest
): Promise<TaxiCreateResponse> => {
    try {
        const { data } = await axiosInstance.post<TaxiCreateResponse>(
            '/taxi/create',
            payload
        );
        return data;
    } catch (error: any) {
        throw error;
    }
};

/**
 * 택시N빵 삭제
 * DELETE /taxi
 * body: { taxiId }
 *
 * ※ 일부 서버는 DELETE + body를 제한하는 경우가 있어 문제가 생기면
 *    쿼리스트링(/taxi?taxiId=...) 버전을 서버와 합의해야 합니다.
 */
export const deleteTaxi = async (taxiId: string): Promise<void> => {
    try {
        await axiosInstance.delete('/taxi', {
            data: { taxiId } as TaxiDeleteRequest,
            // axios는 DELETE에서도 data 전송 가능
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        throw error;
    }
};
