import { combineReducers } from '@reduxjs/toolkit';
import templateUserSlice from './slice/UserSlice';
import myInfoSlice from './slice/myInfoSlice';
import frequentSlice from './slice/frequentRouteSlice';
import galdaeSlice from './slice/galdaeSlice';
import myGaldaeSlice from './slice/myGaldaeSlice';
/**
 * 사용 목적에 따라서 Slice 단위로 분리하여서 Root Reducer를 구성합니다.
 */
const RootReducer = combineReducers({
    user: templateUserSlice,
    myInfoSlice:myInfoSlice,
    frequentSlice:frequentSlice,
    galdaeSlice:galdaeSlice,
    myGaldaeSlice:myGaldaeSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
