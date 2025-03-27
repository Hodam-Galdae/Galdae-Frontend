// modules/redux/slice/galdaeSlice.ts
/**
 * 실시간 갈대 redux
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '../../../api/postApi';
import { GetPostsRequest } from '../../../types/postTypes';
import { GaldaeItemType,GaldaeApiResponse } from '../../../types/getTypes';

interface GaldaeState {
  posts: GaldaeItemType[];
  loading: boolean;
  error: string | null;
}

const initialState: GaldaeState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchGaldaePosts = createAsyncThunk(
  'galdae/fetchGaldaePosts',
  async (params: GetPostsRequest, thunkAPI) => {
    try {
      const response:GaldaeApiResponse = await getPosts(params);
      return response; // 전체 응답을 반환
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const galdaeSlice = createSlice({
  name: 'galdae',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGaldaePosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchGaldaePosts.fulfilled,
      (
        state,
        action: PayloadAction<
          GaldaeApiResponse,
          string,
          { arg: GetPostsRequest }
        >
      ) => {
        state.loading = false;
        const requestedPage = action.meta.arg.pageNumber;

        if (requestedPage === 0) {
          state.posts = action.payload.content;
        } else {
          // 🧠 posts 배열에 직접 push! (immer가 불변성 자동 처리해줌)
          action.payload.content.forEach(post => {
            state.posts.push(post);
          });
        }
      }
    );
    builder.addCase(fetchGaldaePosts.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default galdaeSlice.reducer;
