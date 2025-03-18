import axiosInstance from './axiosInstance';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  isJoined: boolean;
}

interface JoinRequest {
  nickname: string;
  gender: string;
  bankType?: string;
  accountNumber?: string;
  depositor?: string;
}

interface CheckNicknameResponse {
  available: boolean;
}

// ✅ 카카오 로그인
export const loginWithKakao = async (kakaoToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/kakao', {'token': kakaoToken});
  return response.data;
};

// ✅ 구글 로그인
export const loginWithGoogle = async (googleToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/google', {'token': googleToken});
  return response.data;
};

// ✅ 애플 로그인
export const loginWithApple = async (appleToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/apple', { 'token': appleToken });
  return response.data;
};

// ✅ 회원가입
export const join = async (data: JoinRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/join', data);
  return response.data;
};

// ✅ 닉네임 중복 체크
export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await axiosInstance.post<CheckNicknameResponse>('/auth/check/nickname', { nickname });
  return response.data;
};
