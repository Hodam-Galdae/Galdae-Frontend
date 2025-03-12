import { combineReducers } from '@reduxjs/toolkit';
import templateUserSlice from './slice/UserSlice';

/**
 * 사용 목적에 따라서 Slice 단위로 분리하여서 Root Reducer를 구성합니다.
 */
const RootReducer = combineReducers({
    user: templateUserSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
