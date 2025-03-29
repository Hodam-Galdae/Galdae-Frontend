import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../../api/membersApi'; // API 경로에 맞게 수정

export interface UserInfo {
  accountNumber?: string;
  bankType?: string;
  depositor?: string;
  image?: string;
  isAuthenticated?: boolean | null;
  nickname?: string;
  university?: string | null;
}

interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk<UserInfo, void>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
