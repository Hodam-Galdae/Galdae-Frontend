// redux/slices/frequentRouteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFrequentRoutes } from '../../../api/membersApi';

export interface FrequentRoute {
  departure: string;
  arrival: string;
  createdAt: string;
}

interface FrequentRouteState {
  routes: FrequentRoute[];
  loading: boolean;
  error: string | null;
}

const initialState: FrequentRouteState = {
  routes: [],
  loading: false,
  error: null,
};

export const fetchFrequentRoutes = createAsyncThunk(
  'frequentRoutes/fetchFrequentRoutes',
  async (_, thunkAPI) => {
    try {
      const response = await getFrequentRoutes();
      // API가 배열 형태의 데이터를 반환한다고 가정합니다.
      return response as FrequentRoute[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const frequentRouteSlice = createSlice({
  name: 'frequentRoutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFrequentRoutes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFrequentRoutes.fulfilled, (state, action: PayloadAction<FrequentRoute[]>) => {
      state.loading = false;
      state.routes = action.payload;
    });
    builder.addCase(fetchFrequentRoutes.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default frequentRouteSlice.reducer;
