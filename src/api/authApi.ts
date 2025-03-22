import axios from 'axios';
import axiosInstance from './axiosInstance';
import RNFS from 'react-native-fs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  isJoined: boolean;
  isAuthenticate: string;
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
export const join = async (form: any): Promise<AuthResponse|undefined> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/join', form, {
    transformRequest: (data, headers) => {
      return form;
    },
  });
  return response.data;
};

// ✅ 닉네임 중복 체크
export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await axiosInstance.post<CheckNicknameResponse>('/auth/check/nickname', { nickname });
  return response.data;
};

export const emailVerify = async (code: string, univName: string, email: string): Promise<string> => {
  const form = new FormData();
  const universityAuthCommand = {
    university: univName,
    universityAuthType: 'EMAIL',
    email: email,
    code: code,
    studentCard: '',
  };
  const fileName = `${email}.json`;
  const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
  await RNFS.writeFile(filePath, JSON.stringify(universityAuthCommand), 'utf8');

  form.append('universityAuthCommand', {
    uri: `file:///${filePath}`,
    type: 'application/json',
    name: fileName,
  });

  const response = await axiosInstance.post<string>('/auth/university', form, {
    transformRequest: (data, headers) => {
      return form;
    },
  });

  return response.data;
};

export const certifyUniv = async (univName: string, email: string): Promise<boolean> => {
  const data = {
    'key' : '07085e01-05e6-47ea-b14b-5446a66c1fb1',
    email,
    univName,
    'univ_check': true,
  };
  const response = await axios.post('https://univcert.com/api/v1/certify', data);
  return response.data.success;
};
