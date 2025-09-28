// src/modules/redux/slice/subscribeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
    PagingQuery,
    PageResponse,
    SubscribeListItem,
    SubscribeDetailResponse,
    SubscribeCreateRequest,
    SubscribeCreateResponse,
    SubscribeDeleteRequest,
    TypeServiceItem,
} from '../../../types/subScribeTypes';
import {
    getSubscribeList,
    deleteSubscribe,
    getSubscribeTypeService,
    searchSubscribe,
    getSubscribeDetail,
    createSubscribe,
} from '../../../api/subScribeApi';

/* ========== Thunks ========== */

// 목록 조회
export const fetchSubscribeList = createAsyncThunk<
    PageResponse<SubscribeListItem>,
    PagingQuery | undefined
>('subscribe/fetchList', async (query) => {
    const res = await getSubscribeList(query ?? {});
    return res;
});

// 검색 (searchKeyword 필수)
export const fetchSubscribeSearch = createAsyncThunk<
    PageResponse<SubscribeListItem>,
    { pageNumber?: number; searchKeyword: string }
>('subscribe/fetchSearch', async (params) => {
    const res = await searchSubscribe(params);
    return res;
});

// 타입-서비스 목록
export const fetchSubscribeTypeService = createAsyncThunk<
    TypeServiceItem[],
    void
>('subscribe/fetchTypeService', async () => {
    const res = await getSubscribeTypeService();
    return res;
});

// 상세
export const fetchSubscribeDetail = createAsyncThunk<
    SubscribeDetailResponse,
    string
>('subscribe/fetchDetail', async (subscribeId) => {
    const res = await getSubscribeDetail(subscribeId);
    return res;
});

// 생성
export const createSubscribeGroup = createAsyncThunk<
    SubscribeCreateResponse,
    SubscribeCreateRequest
>('subscribe/create', async (payload) => {
    const res = await createSubscribe(payload);
    return res;
});

// 삭제
export const removeSubscribeGroup = createAsyncThunk<
    string, // 성공 시 삭제된 subscribeId 반환
    SubscribeDeleteRequest
>('subscribe/remove', async (payload) => {
    await deleteSubscribe(payload);
    return payload.subscribeId;
});

/* ========== State ========== */

interface SubscribeState {
    // 목록
    listPage: PageResponse<SubscribeListItem> | null;
    listLoading: boolean;
    listError: string | null;

    // 검색
    searchPage: PageResponse<SubscribeListItem> | null;
    searchKeyword: string | null;
    searchLoading: boolean;
    searchError: string | null;

    // 타입-서비스
    typeService: TypeServiceItem[];
    typeServiceLoading: boolean;
    typeServiceError: string | null;

    // 상세
    detail: SubscribeDetailResponse | null;
    detailLoading: boolean;
    detailError: string | null;

    // 생성
    createResult: SubscribeCreateResponse | null;
    createLoading: boolean;
    createError: string | null;

    // 삭제 진행중 map
    deletingIds: Record<string, boolean>;
}

const emptyPage = (): PageResponse<SubscribeListItem> => ({
    pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 0,
        offset: 0,
        sort: { sorted: false, empty: true, unsorted: true },
        unpaged: false,
    },
    first: true,
    last: true,
    size: 0,
    content: [],
    number: 0,
    sort: { sorted: false, empty: true, unsorted: true },
    numberOfElements: 0,
    empty: true,
});

const initialState: SubscribeState = {
    listPage: null,
    listLoading: false,
    listError: null,

    searchPage: null,
    searchKeyword: null,
    searchLoading: false,
    searchError: null,

    typeService: [],
    typeServiceLoading: false,
    typeServiceError: null,

    detail: null,
    detailLoading: false,
    detailError: null,

    createResult: null,
    createLoading: false,
    createError: null,

    deletingIds: {},
};

/* ========== Slice ========== */

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState,
    reducers: {
        resetSubscribeDetail(state) {
            state.detail = null;
            state.detailLoading = false;
            state.detailError = null;
        },
        resetSubscribeCreate(state) {
            state.createResult = null;
            state.createLoading = false;
            state.createError = null;
        },
        resetSubscribeSearch(state) {
            state.searchPage = null;
            state.searchKeyword = null;
            state.searchLoading = false;
            state.searchError = null;
        },
        resetSubscribeList(state) {
            state.listPage = null;
            state.listLoading = false;
            state.listError = null;
        },
    },
    extraReducers: (builder) => {
        /* 목록 */
        builder
            .addCase(fetchSubscribeList.pending, (state) => {
                state.listLoading = true;
                state.listError = null;
            })
            .addCase(fetchSubscribeList.fulfilled, (state, action) => {
                state.listLoading = false;
                state.listPage = action.payload;
            })
            .addCase(fetchSubscribeList.rejected, (state, action) => {
                state.listLoading = false;
                state.listError = action.error.message ?? 'Failed to fetch subscribe list';
                state.listPage = state.listPage ?? emptyPage();
            });

        /* 검색 */
        builder
            .addCase(fetchSubscribeSearch.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(fetchSubscribeSearch.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchPage = action.payload;
                // 서버의 요청 파라미터를 알 수 없으므로 키워드는 caller 쪽에서 보관하거나,
                // 이 thunk arg를 meta에서 꺼낼 수도 있음. 여기서는 그대로 유지.
            })
            .addCase(fetchSubscribeSearch.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message ?? 'Failed to search subscribe';
                state.searchPage = state.searchPage ?? emptyPage();
            });

        /* 타입-서비스 */
        builder
            .addCase(fetchSubscribeTypeService.pending, (state) => {
                state.typeServiceLoading = true;
                state.typeServiceError = null;
            })
            .addCase(fetchSubscribeTypeService.fulfilled, (state, action) => {
                state.typeServiceLoading = false;
                state.typeService = action.payload;
            })
            .addCase(fetchSubscribeTypeService.rejected, (state, action) => {
                state.typeServiceLoading = false;
                state.typeServiceError = action.error.message ?? 'Failed to fetch type-service';
            });

        /* 상세 */
        builder
            .addCase(fetchSubscribeDetail.pending, (state) => {
                state.detailLoading = true;
                state.detailError = null;
            })
            .addCase(fetchSubscribeDetail.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.detail = action.payload;
            })
            .addCase(fetchSubscribeDetail.rejected, (state, action) => {
                state.detailLoading = false;
                state.detailError = action.error.message ?? 'Failed to fetch detail';
            });

        /* 생성 */
        builder
            .addCase(createSubscribeGroup.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createSubscribeGroup.fulfilled, (state, action) => {
                state.createLoading = false;
                state.createResult = action.payload;
            })
            .addCase(createSubscribeGroup.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.error.message ?? 'Failed to create';
            });

        /* 삭제 */
        builder
            .addCase(removeSubscribeGroup.pending, (state, action) => {
                const id = action.meta.arg.subscribeId;
                state.deletingIds[id] = true;
            })
            .addCase(removeSubscribeGroup.fulfilled, (state, action: PayloadAction<string>) => {
                const id = action.payload;
                delete state.deletingIds[id];

                // 목록/검색 페이지에서 해당 항목 제거
                if (state.listPage) {
                    state.listPage.content = state.listPage.content.filter(i => i.subscribeId !== id);
                    state.listPage.numberOfElements = state.listPage.content.length;
                    state.listPage.empty = state.listPage.content.length === 0;
                }
                if (state.searchPage) {
                    state.searchPage.content = state.searchPage.content.filter(i => i.subscribeId !== id);
                    state.searchPage.numberOfElements = state.searchPage.content.length;
                    state.searchPage.empty = state.searchPage.content.length === 0;
                }
            })
            .addCase(removeSubscribeGroup.rejected, (state, action) => {
                const id = action.meta.arg.subscribeId;
                delete state.deletingIds[id];
            });
    },
});

export const {
    resetSubscribeDetail,
    resetSubscribeCreate,
    resetSubscribeSearch,
    resetSubscribeList,
} = subscribeSlice.actions;

export default subscribeSlice.reducer;

/* ========== Selectors (optional) ========== */
export const selectSubscribeListPage = (state: any) => state.subscribe.listPage;
export const selectSubscribeListLoading = (state: any) => state.subscribe.listLoading;

export const selectSubscribeSearchPage = (state: any) => state.subscribe.searchPage;
export const selectSubscribeSearchLoading = (state: any) => state.subscribe.searchLoading;

export const selectSubscribeTypeService = (state: any) => state.subscribe.typeService;
export const selectSubscribeTypeServiceLoading = (state: any) => state.subscribe.typeServiceLoading;

export const selectSubscribeDetail = (state: any) => state.subscribe.detail;
export const selectSubscribeDetailLoading = (state: any) => state.subscribe.detailLoading;

export const selectSubscribeCreateResult = (state: any) => state.subscribe.createResult;
export const selectSubscribeCreateLoading = (state: any) => state.subscribe.createLoading;

export const selectSubscribeDeletingIds = (state: any) => state.subscribe.deletingIds;
