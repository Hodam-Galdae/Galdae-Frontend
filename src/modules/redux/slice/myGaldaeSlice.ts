// modules/redux/slice/myGaldaeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMyPostHistory } from '../../../api/membersApi';
import { MyPostHistory } from '../../../types/getTypes';

interface MyGaldaeState {
  history: MyPostHistory[];
  loading: boolean;
  error: string | null;
}

const initialState: MyGaldaeState = {
  history: [],
  loading: false,
  error: null,
};

export const fetchMyGaldaeHistory = createAsyncThunk(
  'myGaldae/fetchMyGaldaeHistory',
  async (_, thunkAPI) => {
    try {
      const response = await getMyPostHistory();
      console.log(`내 갈대기록 : 
        
        `,response );
      return response as MyPostHistory[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const myGaldaeSlice = createSlice({
  name: 'myGaldae',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyGaldaeHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchMyGaldaeHistory.fulfilled,
      (state, action: PayloadAction<MyPostHistory[]>) => {
        state.loading = false;
        state.history = action.payload;
      }
    );
    builder.addCase(fetchMyGaldaeHistory.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default myGaldaeSlice.reducer;
