// src/api/universityMail.ts
import axiosInstance from './axiosInstance';
import {
    VerifyUniversityRequest,
    SendUniversityMailRequest,
} from '../types/postTypes';

/**
 * 대학교 인증 메일 전송
 * POST /mail/send
 * Body: { email, studentId, department }
 * Response: boolean
 */
export const sendUniversityMail = async (
    payload: SendUniversityMailRequest,
): Promise<boolean> => {
    console.log('🔵 [대학교 인증 메일 전송] 요청 시작');
    console.log('🔵 [대학교 인증 메일 전송] payload:', payload);

    // 이메일 발송은 시간이 오래 걸릴 수 있으므로 timeout을 15초로 설정
    const { data } = await axiosInstance.post<boolean>('/mail/send', payload, {
        timeout: 15000, // 15초
    });
    return data;
};

/**
 * 대학교 인증 코드 검증
 * POST /mail/verify
 * Body: { code }
 * Response: boolean
 */
export const verifyUniversity = async (
    payload: VerifyUniversityRequest,
): Promise<boolean> => {
    console.log('🔵 [대학교 인증 코드 검증] 요청 시작');
    console.log('🔵 [대학교 인증 코드 검증] payload:', payload);
    const { data } = await axiosInstance.post<boolean>('/mail/verify', payload);
    return data;
};
