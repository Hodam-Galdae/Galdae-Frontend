import { createSlice } from "@reduxjs/toolkit";

/**
 * UserSlice의 관리하는 상태값(State)을 정의합니다.
 */
const initialState = {
    name: '',
    nickName: '',
    email: '',
    accessToken: '',
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
            state.name = action.payload.name;
            state.nickName = action.payload.nickName;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
        },

        // 사용자 이름을 상태에 저장합니다.
        setName(state, action) {
            state.name = action.payload;
        },

        // 닉네임을 상태에 저장합니다.
        setNickName(state, action) {
            state.nickName = action.payload;
        },

        // 사용자 이메일을 상태에 저장합니다.
        setEmail(state, action) {
            state.email = action.payload;
        },

        // 접근 토큰을 상태에 저장합니다.
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },

    },
});

/**
 * Reducer 메서드를 정의하여 외부에서 Redux의 상태를 변경할 수 있도록 구성합니다.
 */
export const { setUser, setName, setNickName, setEmail, setAccessToken } = UserSlice.actions;

export default UserSlice.reducer;
