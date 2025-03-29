import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyCreatedPosts } from '../../../api/membersApi';
import { MyCreatedPost } from '../../../types/getTypes';

export const fetchMyCreatedGaldae = createAsyncThunk(
    'myCreatedGaldae/fetch',
    async (_, _thunkAPI) => {
      const response: MyCreatedPost[] = await getMyCreatedPosts();
      return response;
    }
);

interface MyCreatedGaldaeState {
  list: MyCreatedPost[];
  loading: boolean;
  error: string | null;
}

const initialState: MyCreatedGaldaeState = {
  list: [],
  loading: false,
  error: null,
};

const myCreatedGaldaeSlice = createSlice({
  name: 'myCreatedGaldae',
  initialState,
  reducers: {
    // 필요한 경우 추가 reducer 작성
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCreatedGaldae.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCreatedGaldae.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyCreatedGaldae.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default myCreatedGaldaeSlice.reducer;
