import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotifications, checkNotification, checkAllNotifications } from '../../../api/notiApi';

export interface Notification {
  notificationId: number;
  title: string;
  isChecked: boolean;
  daysBetween: number;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error?: string;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const data = await getNotifications();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkNotificationThunk = createAsyncThunk(
  'notification/checkNotification',
  async (notificationId: number, thunkAPI) => {
    try {
      await checkNotification(notificationId);
      return notificationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkAllNotificationsThunk = createAsyncThunk(
  'notification/checkAllNotifications',
  async (_, thunkAPI) => {
    try {
      await checkAllNotifications();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // Optimistic update: 즉시 모든 알림을 읽음 처리
    markAllAsCheckedOptimistic: state => {
      state.notifications = state.notifications.map(noti => ({
        ...noti,
        isChecked: true,
      }));
    },
    // Rollback: API 실패 시 이전 상태로 복구
    rollbackNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(checkNotificationThunk.fulfilled, (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.map(noti =>
        noti.notificationId === id ? { ...noti, isChecked: true } : noti
      );
    });
    // checkAll은 optimistic update를 사용하므로 fulfilled에서는 아무것도 하지 않음
    // 성공 시 fetchNotifications로 최신 데이터를 가져옴
    builder.addCase(checkAllNotificationsThunk.fulfilled, _state => {
      // 이미 optimistic update로 UI가 업데이트됨
      // 추가 작업 없음 (fetchNotifications로 최신 데이터 가져올 예정)
    });
  },
});

export const { markAllAsCheckedOptimistic, rollbackNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
