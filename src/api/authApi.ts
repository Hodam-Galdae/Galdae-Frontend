import axios from 'axios';
import axiosInstance from './axiosInstance';
import RNFS from 'react-native-fs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  isJoined: boolean;
  isSelectedUniversity: boolean;
}

interface CheckNicknameResponse {
  available: boolean;
}

export interface SchoolResponse {
  name: string;
}

// ✅ 카카오 로그인
export const loginWithKakao = async (
  kakaoToken: string,
): Promise<AuthResponse> => {
  console.log('🔵 [카카오 로그인] 요청 시작');
  console.log('🔵 [카카오 로그인] kakaoToken:', kakaoToken);

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/kakao', {
      token: kakaoToken,
    });
    console.log('✅ [카카오 로그인] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [카카오 로그인] 실패:', error);
    throw error;
  }
};

// ✅ 구글 로그인
export const loginWithGoogle = async (
  googleToken: string,
): Promise<AuthResponse> => {
  console.log('🔵 [구글 로그인] 요청 시작');
  console.log('🔵 [구글 로그인] googleToken:', googleToken);

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/google', {
      token: googleToken,
    });
    console.log('✅ [구글 로그인] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [구글 로그인] 실패:', error);
    throw error;
  }
};

// ✅ 네이버 로그인
export const loginWithNaver = async (
  naverToken: string,
): Promise<AuthResponse> => {
  console.log('🔵 [네이버 로그인] 요청 시작');
  console.log('🔵 [네이버 로그인] naverToken:', naverToken);

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/naver', {
      token: naverToken,
    });
    console.log('✅ [네이버 로그인] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [네이버 로그인] 실패:', error);
    throw error;
  }
};

// ✅ 애플 로그인
export const loginWithApple = async (
  appleToken: string,
): Promise<AuthResponse> => {
  console.log('🔵 [애플 로그인] 요청 시작');
  console.log('🔵 [애플 로그인] appleToken:', appleToken);

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/apple', {
      token: appleToken,
    });
    console.log('✅ [애플 로그인] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [애플 로그인] 실패:', error);
    throw error;
  }
};

// ✅ 회원가입
export const join = async (form: any): Promise<AuthResponse | undefined> => {
  console.log('🔵 [회원가입] 요청 시작');
  console.log('🔵 [회원가입] form 데이터:', form);

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/join', form, {
      transformRequest: (data, headers) => {
        console.log('🔵 [회원가입] data:', data);
        console.log('🔵 [회원가입] headers:', headers);
        return form;
      },
    });
    console.log('✅ [회원가입] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [회원가입] 실패:', error);
    throw error;
  }
};

export const getSchool = async (): Promise<SchoolResponse[]> => {
  console.log('🔵 [학교 목록 조회] 요청 시작');

  try {
    const response = await axiosInstance.get<SchoolResponse[]>('/auth/university/list');
    console.log('✅ [학교 목록 조회] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [학교 목록 조회] 실패:', error);
    throw error;
  }
};

// ✅ 닉네임 중복 체크
export const checkNickname = async (
  nickname: string,
): Promise<CheckNicknameResponse> => {
  console.log('🔵 [닉네임 중복 체크] 요청 시작');
  console.log('🔵 [닉네임 중복 체크] nickname:', nickname);

  try {
    const response = await axiosInstance.post<CheckNicknameResponse>(
      '/auth/check/nickname',
      { nickname },
    );
    console.log('✅ [닉네임 중복 체크] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [닉네임 중복 체크] 실패:', error);
    throw error;
  }
};

export const certifyCard = async (form: FormData): Promise<void> => {
  console.log('🔵 [학생증 인증] 요청 시작');
  console.log('🔵 [학생증 인증] form 데이터:', form);

  try {
    const response = await axiosInstance.post<string>('/auth/university', form, {
      transformRequest: (data, headers) => {
        console.log('🔵 [학생증 인증] data:', data);
        console.log('🔵 [학생증 인증] headers:', headers);
        return form;
      },
    });
    console.log('✅ [학생증 인증] 성공:', response.data);
  } catch (error) {
    console.error('❌ [학생증 인증] 실패:', error);
    throw error;
  }
};

export const emailVerify = async (
  // code: string,
  univName: string,
  // email: string,
): Promise<string> => {
  console.log('🔵 [이메일 인증] 요청 시작');
  console.log('🔵 [이메일 인증] univName:', univName);

  try {
    const form = new FormData();
    const universityAuthCommand = {
      university: univName,
      // universityAuthType: 'EMAIL',
      // email: email,
      // code: code,
      // studentCard: '',
    };
    console.log('🔵 [이메일 인증] universityAuthCommand:', universityAuthCommand);

    const fileName = `${univName}.json`;
    const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    await RNFS.writeFile(filePath, JSON.stringify(universityAuthCommand), 'utf8');
    console.log('🔵 [이메일 인증] 파일 생성 완료:', filePath);

    form.append('universityAuthCommand', {
      uri: `file://${filePath}`,
      type: 'application/json',
      name: fileName,
    } as any);

    const response = await axiosInstance.post<string>('/auth/university', form, {
      transformRequest: (data, headers) => {
        console.log('🔵 [대학 인증] data:', data);
        console.log('🔵 [대학 인증] headers:', headers);
        return form;
      },
    });

    console.log('✅ [이메일 인증] 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [이메일 인증] 실패:', error);
    throw error;
  }
};

export const certifyUniv = async (
  univName: string,
  email: string,
): Promise<boolean> => {
  console.log('🔵 [대학 인증] 요청 시작');
  console.log('🔵 [대학 인증] univName:', univName);
  console.log('🔵 [대학 인증] email:', email);

  try {
    const data = {
      key: '07085e01-05e6-47ea-b14b-5446a66c1fb1',
      email,
      univName,
      univ_check: true,
    };
    console.log('🔵 [대학 인증] 요청 데이터:', data);

    const response = await axios.post(
      'https://univcert.com/api/v1/certify',
      data,
    );
    console.log('✅ [대학 인증] 성공:', response.data);
    return response.data.success;
  } catch (error) {
    console.error('❌ [대학 인증] 실패:', error);
    throw error;
  }
};
