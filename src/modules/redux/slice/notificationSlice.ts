import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotifications, checkNotification } from '../../../api/notiApi';

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

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
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
  },
});

export default notificationSlice.reducer;
