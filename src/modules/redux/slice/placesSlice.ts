// modules/redux/slice/placesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaces } from '../../../api/placesApi';
import type { MajorPlace } from '../../../types/placesApiTypes';

interface PlacesState {
  insidePlaces: MajorPlace[];
  outsidePlaces: MajorPlace[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  insidePlaces: [],
  outsidePlaces: [],
  loading: false,
  error: null,
};

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPlaces();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.insidePlaces = [];
      state.outsidePlaces = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.insidePlaces = action.payload.insidePlaces;
        state.outsidePlaces = action.payload.outsidePlaces;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPlaces } = placesSlice.actions;
export default placesSlice.reducer;
