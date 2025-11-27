// src/api/fileApi.ts

import axiosInstance from './axiosInstance';

// ====== Types ======

export type ImageType = 'PROFILE' | 'CHAT' | 'REPORT' | 'QUESTION';

export interface PresignedUrlResponse {
  presignedUrl: string;  // S3 업로드용 Presigned URL
  key: string;            // S3 객체 키
  publicUrl: string;      // 업로드 후 접근 가능한 공개 URL
}

export interface ImageFile {
  uri: string;    // 로컬 파일 URI
  name: string;   // 파일명
  type: string;   // MIME 타입 (예: image/jpeg, image/png)
}

// ====== Helper ======
const getData = <T>(p: Promise<{ data: T }>) => p.then(r => r.data);

// ====== API ======

/**
 * Presigned URL 요청 (범용)
 * @param type 이미지 타입 (PROFILE, CHAT, REPORT, QUESTION)
 * @param fileName 파일명
 * @param contentType MIME 타입
 * @param fileSize 파일 크기 (bytes)
 * @returns Presigned URL 정보
 */
export const getPresignedUrl = (
  type: ImageType,
  fileName: string,
  contentType: string,
  fileSize: number
) =>
  getData<PresignedUrlResponse>(
    axiosInstance.get('/files/presigned-url', {
      params: { type, fileName, contentType, fileSize },
    })
  );

/**
 * 범용 이미지 업로드 함수 (Presigned URL 방식)
 *
 * @param type 이미지 타입
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 공개 URL
 *
 * @example
 * ```typescript
 * // 프로필 이미지 업로드
 * const imageUrl = await uploadImage('PROFILE', {
 *   uri: 'file:///path/to/image.jpg',
 *   name: 'profile.jpg',
 *   type: 'image/jpeg'
 * });
 *
 * // 채팅 이미지 업로드
 * const chatImageUrl = await uploadImage('CHAT', imageFile);
 * ```
 */
export const uploadImage = async (
  type: ImageType,
  file: ImageFile
): Promise<string> => {
  try {
    console.log(`📤 [이미지 업로드] 시작 - 타입: ${type}, 파일: ${file.name}`);

    // 0. 파일 크기 확인 (Blob으로 변환하여 실제 크기 측정)
    console.log('📤 [이미지 업로드] 0단계: 파일 크기 확인');
    const sizeCheckResponse = await fetch(file.uri);
    const sizeCheckBlob = await sizeCheckResponse.blob();
    const fileSize = sizeCheckBlob.size;

    console.log(`📦 [이미지 업로드] 파일 크기: ${(fileSize / 1024 / 1024).toFixed(2)}MB`);

    // 50MB (52428800 bytes) 초과 검증 (클라이언트 측)
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    if (fileSize > MAX_FILE_SIZE) {
      throw new Error(`파일 크기가 50MB를 초과합니다. (현재: ${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
    }

    // 1. Presigned URL 요청
    console.log('📤 [이미지 업로드] 1단계: Presigned URL 요청');
    const { presignedUrl, publicUrl } = await getPresignedUrl(
      type,
      file.name,
      file.type,
      fileSize
    );

    console.log('✅ [이미지 업로드] Presigned URL 발급 완료');
    console.log('🔗 [이미지 업로드] S3 URL:', publicUrl);

    // 2. S3에 직접 업로드 (이미 Blob으로 변환된 상태이므로 재사용)
    console.log('📤 [이미지 업로드] 2단계: S3로 직접 업로드');
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: sizeCheckBlob,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `S3 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`
      );
    }

    console.log('✅ [이미지 업로드] S3 업로드 완료');
    console.log('🔗 [이미지 업로드] 최종 URL:', publicUrl);

    return publicUrl;
  } catch (error) {
    console.error('❌ [이미지 업로드] 실패:', error);
    throw error;
  }
};
