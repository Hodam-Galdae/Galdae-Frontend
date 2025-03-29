import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../../api/postApi';
import type { GetPostsRequest } from '../../../types/postTypes';
import type { GaldaeApiResponse, GaldaeItemType } from '../../../types/getTypes';

export const fetchHomeGaldaePosts = createAsyncThunk(
  'realtimeGaldae/fetch',
  async (_: void, { rejectWithValue }) => {
    const params: GetPostsRequest = {
      pageNumber: 0,
      pageSize: 3,
      direction: 'ASC',
      properties: ['departureTime'],
    };
    try {
      const data: GaldaeApiResponse = await getPosts(params);
      return data.content; // GaldaeItemType[]
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface RealtimeGaldaeState {
  posts: GaldaeItemType[];
  loading: boolean;
  error: string | null;
}

const initialState: RealtimeGaldaeState = {
  posts: [],
  loading: false,
  error: null,
};

const homeGaldaeSlice = createSlice({
  name: 'homeGaldaeSlice',
  initialState,
  reducers: {
    // 필요하면 추가 reducer 작성
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeGaldaePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeGaldaePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchHomeGaldaePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching posts';
      });
  },
});

export default homeGaldaeSlice.reducer;
