// src/store/slice/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
    OrderPagingQuery,
    OrderListItem,
    OrderDetailResponse,
    OrderCreateRequest,
    OrderCreateResponse,
    foodType,
} from '../../../types/orderTypes';
import {
    getOrderList,
    searchOrders,
    getOrderDetail,
    createOrder,
    deleteOrder,
    getFoodTypeList,
} from '../../../api/orderApi';

/* =========================
 * Thunks
 * ========================= */

/** 목록 조회 */
export const fetchOrders = createAsyncThunk<
    OrderListItem[],
    OrderPagingQuery | undefined
>('order/fetchList', async (query) => {
    const res = await getOrderList(query ?? {});
    return res;
});
/** 배달 음식 종류 목록 조회 */
export const fetchFoodTypeList = createAsyncThunk<
    foodType[],
    void
>('order/fetchFoodTypeList', async () => {
    const res = await getFoodTypeList();
    return res;
});

/** 검색(식당 이름) */
export const fetchOrdersBySearchKeyword = createAsyncThunk<
    { searchKeyword: string; items: OrderListItem[] },
    { searchKeyword: string } & OrderPagingQuery
>('order/fetchBySearchKeyword', async (params) => {
    const items = await searchOrders(params);
    return { searchKeyword: params.searchKeyword, items };
});

/** 상세 조회 */
export const fetchOrderDetail = createAsyncThunk<
    OrderDetailResponse,
    string
>('order/fetchDetail', async (orderId) => {
    const res = await getOrderDetail(orderId);
    return res;
});

/** 생성 */
export const createOrderGroup = createAsyncThunk<
    OrderCreateResponse,
    OrderCreateRequest
>('order/create', async (payload) => {
    const res = await createOrder(payload);
    return res;
});

/** 삭제 */
export const removeOrderGroup = createAsyncThunk<
    string, // 성공 시 삭제된 orderId 반환
    string
>('order/remove', async (orderId) => {
    await deleteOrder(orderId);
    return orderId;
});

/* =========================
 * State
 * ========================= */

interface OrdersState {
    // 목록
    list: OrderListItem[];
    listLoading: boolean;
    listError: string | null;

    // 배달 음식 종류 목록
    foodTypeList: foodType[];
    foodTypeListLoading: boolean;
    foodTypeListError: string | null;

    // 검색
    searchList: OrderListItem[];
    searchKeyword: string | null;
    searchLoading: boolean;
    searchError: string | null;

    // 상세
    detail: OrderDetailResponse | null;
    detailLoading: boolean;
    detailError: string | null;

    // 생성
    createResult: OrderCreateResponse | null;
    createLoading: boolean;
    createError: string | null;

    // 삭제 진행중인 항목들 (여러 건 동시 처리 대비)
    deletingIds: Record<string, boolean>;
}

const initialState: OrdersState = {
    list: [],
    listLoading: false,
    listError: null,

    foodTypeList: [],
    foodTypeListLoading: false,
    foodTypeListError: null,

    searchList: [],
    searchKeyword: null,
    searchLoading: false,
    searchError: null,

    detail: null,
    detailLoading: false,
    detailError: null,

    createResult: null,
    createLoading: false,
    createError: null,

    deletingIds: {},
};

/* =========================
 * Slice
 * ========================= */

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // 생성 결과/상세/검색 리스트 초기화 등 필요 시 사용
        resetCreateResult(state) {
            state.createResult = null;
            state.createError = null;
            state.createLoading = false;
        },
        resetDetail(state) {
            state.detail = null;
            state.detailError = null;
            state.detailLoading = false;
        },
        resetSearch(state) {
            state.searchList = [];
            state.searchKeyword = null;
            state.searchError = null;
            state.searchLoading = false;
        },
    },
    extraReducers: (builder) => {
        /* 목록 */
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.listLoading = true;
                state.listError = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.listLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.listLoading = false;
                state.listError = action.error.message ?? 'Failed to fetch orders';
            });

        /* 배달 음식 종류 목록 조회 */
        builder
            .addCase(fetchFoodTypeList.pending, (state) => {
                state.foodTypeListLoading = true;
                state.foodTypeListError = null;
            })
            .addCase(fetchFoodTypeList.fulfilled, (state, action) => {
                state.foodTypeListLoading = false;
                state.foodTypeList = action.payload;
            })
            .addCase(fetchFoodTypeList.rejected, (state, action) => {
                state.foodTypeListLoading = false;
                state.foodTypeListError = action.error.message ?? 'Failed to fetch food type list';
            });

        /* 검색 */
        builder
            .addCase(fetchOrdersBySearchKeyword.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(fetchOrdersBySearchKeyword.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchKeyword = action.payload.searchKeyword;
                state.searchList = action.payload.items;
            })
            .addCase(fetchOrdersBySearchKeyword.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message ?? 'Failed to search orders';
            });

        /* 상세 */
        builder
            .addCase(fetchOrderDetail.pending, (state) => {
                state.detailLoading = true;
                state.detailError = null;
            })
            .addCase(fetchOrderDetail.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.detail = action.payload;
            })
            .addCase(fetchOrderDetail.rejected, (state, action) => {
                state.detailLoading = false;
                state.detailError = action.error.message ?? 'Failed to fetch order detail';
            });

        /* 생성 */
        builder
            .addCase(createOrderGroup.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createOrderGroup.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createResult = action.payload;
                // 필요하다면 목록에 낙관적 추가는 서버 스펙에 맞춰 별도 처리
            })
            .addCase(createOrderGroup.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.error.message ?? 'Failed to create order';
            });

        /* 삭제 */
        builder
            .addCase(removeOrderGroup.pending, (state, action) => {
                const id = action.meta.arg;
                state.deletingIds[id] = true;
            })
            .addCase(removeOrderGroup.fulfilled, (state, action: PayloadAction<string>) => {
                const id = action.payload;
                delete state.deletingIds[id];

                // 목록/검색 리스트에서 제거 (orderId를 우리가 직접 들고 있지 않으므로 title-only라면 불가)
                // 스웨거 응답에는 id가 없어 삭제 반영을 정확히 하기 어려움.
                // 실제 구현에서 리스트 아이템에 orderId가 포함되면 아래처럼 필터링 해주세요:
                // state.list = state.list.filter(item => item.orderId !== id);
                // state.searchList = state.searchList.filter(item => item.orderId !== id);
            })
            .addCase(removeOrderGroup.rejected, (state, action) => {
                const id = action.meta.arg;
                delete state.deletingIds[id];
                // 필요 시 전역 에러 처리 로직 추가 가능
            });
    },
});

export const { resetCreateResult, resetDetail, resetSearch } = orderSlice.actions;
export default orderSlice.reducer;

/* =========================
 * Selectors (선택)
 * ========================= */
export const selectOrderList = (state: any) => state.orders.list;
export const selectOrderListLoading = (state: any) => state.orders.listLoading;

export const selectOrderFoodTypeList = (state: any) => state.orders.foodTypeList;
export const selectOrderFoodTypeListLoading = (state: any) => state.orders.foodTypeListLoading;

export const selectOrderSearchList = (state: any) => state.orders.searchList;
export const selectOrderSearchLoading = (state: any) => state.orders.searchLoading;
export const selectOrderSearchKeyword = (state: any) => state.orders.searchKeyword;

export const selectOrderDetail = (state: any) => state.orders.detail;
export const selectOrderDetailLoading = (state: any) => state.orders.detailLoading;

export const selectOrderCreateResult = (state: any) => state.orders.createResult;
export const selectOrderCreateLoading = (state: any) => state.orders.createLoading;

export const selectOrderDeletingIds = (state: any) => state.orders.deletingIds;
