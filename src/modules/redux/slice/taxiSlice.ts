// src/store/slice/taxiSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    getTaxiList,
    searchTaxi as apiSearchTaxi,
    getTaxiDetail as apiGetTaxiDetail,
    createTaxi as apiCreateTaxi,
    deleteTaxi as apiDeleteTaxi,
} from '../../../api/taxiApi';
import type {
    TaxiListItem,
    TaxiListResponsePage,
    TaxiDetailResponse,
    TaxiCreateRequest,
    TaxiCreateResponse,
} from '../../../types/taxiType';

/* =========================
 * Thunks
 * ========================= */

// 목록 조회
export const fetchTaxiList = createAsyncThunk<
    TaxiListResponsePage,
    { pageNumber?: number; pageSize?: number; direction?: 'ASC' | 'DESC'; property?: string } | undefined
>('taxi/fetchList', async (query) => {
    const data = await getTaxiList(query ?? {});
    return data;
});

// 검색
export const searchTaxi = createAsyncThunk<
    TaxiListResponsePage,
    Parameters<typeof apiSearchTaxi>[0]
>('taxi/search', async (params) => {
    const data = await apiSearchTaxi(params);
    return data;
});

// 상세
export const fetchTaxiDetail = createAsyncThunk<TaxiDetailResponse, string>(
    'taxi/fetchDetail',
    async (taxiId) => {
        const data = await apiGetTaxiDetail(taxiId);
        return data;
    }
);

// 생성
export const createTaxi = createAsyncThunk<TaxiCreateResponse, TaxiCreateRequest, {
    rejectValue: string;
}>(
    'taxi/create',
    async (payload, { rejectWithValue }) => {
        try {
            const data = await apiCreateTaxi(payload);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 삭제
export const deleteTaxi = createAsyncThunk<void, string>(
    'taxi/delete',
    async (taxiId) => {
        await apiDeleteTaxi(taxiId);
    }
);

/* =========================
 * State
 * ========================= */

interface PageMeta {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
}

interface TaxiState {
    // 목록/검색
    list: TaxiListItem[];
    page: PageMeta | null;
    loadingList: boolean;
    loadingSearch: boolean;

    // 상세
    detail: TaxiDetailResponse | null;
    loadingDetail: boolean;

    // 생성/삭제
    creating: boolean;
    deleting: boolean;

    // 에러
    error: string | null;

    // 검색 마지막 파라미터(필요 시 다시 조회용)
    lastSearchParams: any | null;
}

const initialState: TaxiState = {
    list: [],
    page: null,
    loadingList: false,
    loadingSearch: false,

    detail: null,
    loadingDetail: false,

    creating: false,
    deleting: false,

    error: null,
    lastSearchParams: null,
};

/* =========================
 * Slice
 * ========================= */

const taxiSlice = createSlice({
    name: 'taxi',
    initialState,
    reducers: {
        clearTaxiDetail(state) {
            state.detail = null;
            state.error = null;
        },
        clearTaxiList(state) {
            state.list = [];
            state.page = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // 목록
        builder
            .addCase(fetchTaxiList.pending, (state) => {
                state.loadingList = true;
                state.error = null;
            })
            .addCase(fetchTaxiList.fulfilled, (state, action: PayloadAction<TaxiListResponsePage>) => {
                state.loadingList = false;
                state.list = action.payload.content ?? [];
                state.page = {
                    pageNumber: action.payload.number,
                    pageSize: action.payload.size,
                    totalElements: action.payload.numberOfElements, // 서버 totalElements 없어서 근사치
                    totalPages: action.payload.sort ? 0 : 0, // 서버 스펙상 없으면 0 유지
                    isLast: action.payload.last,
                };
            })
            .addCase(fetchTaxiList.rejected, (state, action) => {
                state.loadingList = false;
                state.error = action.error.message ?? '목록 조회 실패';
            });

        // 검색
        builder
            .addCase(searchTaxi.pending, (state, action) => {
                state.loadingSearch = true;
                state.error = null;
                state.lastSearchParams = action.meta.arg ?? null;
            })
            .addCase(searchTaxi.fulfilled, (state, action: PayloadAction<TaxiListResponsePage>) => {
                state.loadingSearch = false;
                state.list = action.payload.content ?? [];
                state.page = {
                    pageNumber: action.payload.number,
                    pageSize: action.payload.size,
                    totalElements: action.payload.numberOfElements,
                    totalPages: 0,
                    isLast: action.payload.last,
                };
            })
            .addCase(searchTaxi.rejected, (state, action) => {
                state.loadingSearch = false;
                state.error = action.error.message ?? '검색 실패';
            });

        // 상세
        builder
            .addCase(fetchTaxiDetail.pending, (state) => {
                state.loadingDetail = true;
                state.error = null;
            })
            .addCase(fetchTaxiDetail.fulfilled, (state, action: PayloadAction<TaxiDetailResponse>) => {
                state.loadingDetail = false;
                state.detail = action.payload;
            })
            .addCase(fetchTaxiDetail.rejected, (state, action) => {
                state.loadingDetail = false;
                state.error = action.error.message ?? '상세 조회 실패';
            });

        // 생성
        builder
            .addCase(createTaxi.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createTaxi.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createTaxi.rejected, (state, action) => {
                state.creating = false;
                state.error = action.error.message ?? '생성 실패';
            });

        // 삭제
        builder
            .addCase(deleteTaxi.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteTaxi.fulfilled, (state, action) => {
                state.deleting = false;
                // 낙관적 갱신: 목록에서 제거 (payload가 없으므로 meta.arg 사용)
                const deletedId = action.meta.arg;
                state.list = state.list.filter((i) => i.taxiId !== deletedId);
            })
            .addCase(deleteTaxi.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.error.message ?? '삭제 실패';
            });
    },
});

export const { clearTaxiDetail, clearTaxiList } = taxiSlice.actions;
export default taxiSlice.reducer;

/* =========================
 * Selectors (옵션)
 * ========================= */

export const selectTaxiList = (state: any) => state.taxi?.list ?? [];
export const selectTaxiPage = (state: any) => state.taxi?.page ?? null;
export const selectTaxiDetail = (state: any) => state.taxi?.detail ?? null;

export const selectTaxiLoadingList = (state: any) => state.taxi?.loadingList ?? false;
export const selectTaxiLoadingSearch = (state: any) => state.taxi?.loadingSearch ?? false;
export const selectTaxiLoadingDetail = (state: any) => state.taxi?.loadingDetail ?? false;
export const selectTaxiCreating = (state: any) => state.taxi?.creating ?? false;
export const selectTaxiDeleting = (state: any) => state.taxi?.deleting ?? false;
export const selectTaxiError = (state: any) => state.taxi?.error ?? null;
