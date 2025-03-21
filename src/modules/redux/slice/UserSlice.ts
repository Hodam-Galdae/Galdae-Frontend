import { createSlice } from '@reduxjs/toolkit';

/**
 * UserSlice의 관리하는 상태값(State)을 정의합니다.
 */
const initialState = {
  nickname: '',
  bankType: '',
  accountNumber: '',
  depositor: '',
  token: '',
  university: '',
};

/**
 * TemplateUserSlice에서 관리하는 Reducer 메서드를 관리합니다.
 */
const UserSlice = createSlice({
    name: 'templateUser',
    initialState,
    reducers: {
        // 모든 사용자 정보를 상태에 저장합니다.
        setUser(state, action) {
            state.nickname = action.payload.nickname;
            state.bankType = action.payload.bankType;
            state.accountNumber = action.payload.accountNumber;
            state.depositor = action.payload.depositor;
            state.token = action.payload.token;
        },

        setToken(state, action) {
            state.token = action.payload;
        },

        setUniversity(state, action) {
            state.university = action.payload;
        },
    },
});

/**
 * Reducer 메서드를 정의하여 외부에서 Redux의 상태를 변경할 수 있도록 구성합니다.
 */
export const { setUser, setToken, setUniversity } = UserSlice.actions;

export default UserSlice.reducer;
