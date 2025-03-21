// modules/redux/slice/postDetailSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostDetail } from '../../../api/postApi';

interface PlaceDetail {
    majorPlace: string;
    subPlace: string;
    latitude: string;
    longtitude: string;
    image: string;
  }
interface userInfo {
    isAuthenticated : boolean;
    nickname: string;
    profileImage:string;
    university:string;
}
  // 갈대 상세 정보 타입
interface PostDetail {
    departure: PlaceDetail;
    arrival: PlaceDetail;
    departureTime: string; // ISO 8601 형식의 문자열
    passengerGenderType: string; // 예: 'SAME'
    arrangeTime: string;         // 예: 'POSSIBLE'
    totalPassengerCount: number;
    passengerCount: number;
    isParticipated: boolean;
    userInfo: userInfo; // 필요한 경우 더 구체적으로 정의 가능
  }

interface PostDetailState {
  postDetail: PostDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostDetailState = {
  postDetail: null,
  loading: false,
  error: null,
};

export const fetchPostDetail = createAsyncThunk(
  'postDetail/fetchPostDetail',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await getPostDetail({ postId });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    clearPostDetail: (state) => {
      state.postDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetail = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
