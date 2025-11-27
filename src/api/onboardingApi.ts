// src/api/onboarding.ts
import axiosInstance from './axiosInstance';
import axios from 'axios';
import {
    GetUniversityAreaRequest,
    ReissueTokenRequest,
    //JoinRequest,
    CheckNicknameRequest,
} from '../types/postTypes';
import { UniversityAndRegionList } from '../types/getTypes';

/** 토큰 응답 공통 타입 (/reissue, /join) */
export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiredIn: number;
}

/**
 * 대학교 및 지역 목록 조회
 * GET /on-boarding/university/list
 * 응답 예시:
 * {
 *   "universityList": [{ "universityName": "string" }],
 *   "universityAreaName": "string"
 * }
 */
export const fetchUniversityList = async (): Promise<UniversityAndRegionList> => {
    const { data } = await axiosInstance.get<UniversityAndRegionList>(
        '/on-boarding/university/list',
    );
    return data;
};

/**
 * 지역 및 학교 선택
 * POST /on-boarding/university-area
 * 헤더: AccessToken (자동 첨부됨: axiosInstance)
 * 바디: { university, universityArea }
 * 응답 바디 명시 없음 → 200 OK만 기대
 */
export const selectUniversityArea = async (
    payload: GetUniversityAreaRequest,
): Promise<void> => {
    await axiosInstance.post('/on-boarding/university-area', payload);
};

/**
 * 토큰 재발급
 * POST /on-boarding/reissue
 * 바디: { memberId, refreshToken }
 * 응답: { accessToken, refreshToken, expiredIn }
 *
 * 주의: 인증 불필요 엔드포인트이므로 axiosInstance의 인터셉터 영향을 피하고
 *      baseURL만 재사용해 axios로 직접 호출.
 */
export const reissueToken = async (
    payload: ReissueTokenRequest,
): Promise<TokenResponse> => {
    const baseURL = axiosInstance.defaults.baseURL ?? '';
    const { data } = await axios.post<TokenResponse>(
        `${baseURL}/on-boarding/reissue`,
        payload,
    );
    return data;
};

/**
 * 회원 가입 (Presigned URL 방식)
 * POST /on-boarding/join
 * 헤더: AccessToken (자동 첨부됨)
 * 바디:
 * {
 *   nickname, gender, bankType, accountNumber, depositor, deviceToken, profileImageUrl
 * }
 * 응답: TokenResponse
 *
 * profileImageUrl은 클라이언트가 S3에 직접 업로드한 후 받은 공개 URL입니다.
 */
export interface JoinRequest {
    nickname: string;
    gender: 'FEMALE' | 'MALE' | 'UNKNOWN';
    bankType: string;
    accountNumber: string;
    depositor: string;
    deviceToken?: string; // 선택 사항 (FCM 토큰 획득 실패 시 undefined)
    profileImageUrl?: string; // 선택 사항
}

export const join = async (payload: JoinRequest): Promise<TokenResponse> => {
    console.log('🔵 [회원가입] 요청 시작');
    console.log('🔵 [회원가입] payload:', payload);

    try {
        const response = await axiosInstance.post<TokenResponse>('/on-boarding/join', payload);
        console.log('✅ [회원가입] 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ [회원가입] 실패:', error);
        throw error;
    }
};

/** (선택) 멀티파트 전송이 필요할 때 사용할 대안 버전 — 서버 요구사항이 바뀌면 이걸 쓰세요. */
// export const joinMultipart = async (payload: JoinRequest): Promise<TokenResponse> => {
//   const form = new FormData();
//   form.append('joinRequestDTO', JSON.stringify(payload.joinRequestDTO));
//   form.append('profileImage', payload.profileImage); // 서버 스펙에 맞춰 key/값 조정
//   const { data } = await axiosInstance.post<TokenResponse>('/on-boarding/join', form, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return data;
// };

/**
 * 닉네임 중복 검사
 * POST /on-boarding/check/nickname
 * 바디: { nickname }
 * 응답: boolean
 */
export const checkNickname = async (
    payload: CheckNicknameRequest,
): Promise<boolean> => {
    console.log('🔵 [닉네임 중복 검사] 요청 시작');
    console.log('🔵 [닉네임 중복 검사] payload:', payload);

    const { data } = await axiosInstance.post<boolean>(
        '/on-boarding/check/nickname',
        payload,
    );
    console.log('✅ [닉네임 중복 검사] 성공:', data);
    return data;
};
