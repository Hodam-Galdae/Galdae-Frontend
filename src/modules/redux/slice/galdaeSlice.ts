// modules/redux/slice/galdaeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '../../../api/postApi';
import { GetPostsRequest } from '../../../types/postTypes';
import { GaldaeItemType } from '../../../types/getTypes';

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
      const response = await getPosts(params);
      // API 응답의 content가 GaldaeItemType[] 형태라고 가정합니다.
      return response.content as GaldaeItemType[];
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
    builder.addCase(fetchGaldaePosts.fulfilled, (state, action: PayloadAction<GaldaeItemType[]>) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchGaldaePosts.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default galdaeSlice.reducer;
