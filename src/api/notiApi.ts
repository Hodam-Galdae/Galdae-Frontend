// src/api/notiApi.ts
import axiosInstance from './axiosInstance';
import {
  Notification,
  UncheckedNotificationResponse,
} from '../types/getTypes';

interface CheckNotificationRequest {
  notificationId: number;
}

/* =========================
 * Notification API 함수들
 * ========================= */

/**
 * 알림 목록 조회 API
 * GET /notification
 *
 * @description 사용자의 모든 알림 목록을 조회합니다.
 * @returns {Promise<Notification[]>} 알림 목록 배열
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * const notifications = await getNotifications();
 * console.log(notifications);
 * // [{ notificationId: 1, title: "알림 제목", isChecked: false, daysBetween: 2 }, ...]
 * ```
 */
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const { data } = await axiosInstance.get<Notification[]>('/notification');
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * 안읽은 알림 유무 조회 API
 * GET /notification/uncheck
 *
 * @description 안읽은 알림이 있는지 확인합니다.
 * @returns {Promise<UncheckedNotificationResponse>} 안읽은 알림 정보 (postId, chatroomId)
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * const uncheckedInfo = await getUncheckedNotification();
 * console.log(uncheckedInfo);
 * // { postId: "uuid", chatroomId: 123 }
 * ```
 */
export const getUncheckedNotification = async (): Promise<UncheckedNotificationResponse> => {
  try {
    const { data } = await axiosInstance.get<UncheckedNotificationResponse>(
      '/notification/uncheck'
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * 알림 확인 API
 * POST /notification/check
 *
 * @description 특정 알림을 읽음 처리합니다.
 * @param {number} notificationId - 확인할 알림 ID
 * @returns {Promise<void>} 성공 시 void 반환
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * await checkNotification(123);
 * console.log("알림 확인 완료");
 * ```
 */
export const checkNotification = async (notificationId: number): Promise<void> => {
  try {
    const requestBody: CheckNotificationRequest = { notificationId };
    await axiosInstance.post('/notification/check', requestBody);
  } catch (error: any) {
    throw error;
  }
};

/**
 * 모든 알림 확인 API
 * PATCH /notification/check-all
 *
 * @description 사용자의 읽지 않은 모든 알림을 한 번에 읽음 처리합니다.
 * @returns {Promise<void>} 성공 시 void 반환
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * await checkAllNotifications();
 * console.log("모든 알림 확인 완료");
 * ```
 */
export const checkAllNotifications = async (): Promise<void> => {
  try {
    await axiosInstance.patch('/notification/check-all');
  } catch (error: any) {
    throw error;
  }
};

/**
 * 알림 생성 API
 * POST /notification
 *
 * @description 새로운 알림을 생성합니다.
 * @param {object} params - 알림 생성 파라미터
 * @param {string} params.memberId - 수신자 UUID
 * @param {string} params.category - 알림 카테고리 (CHAT, POST, CARPOOL 등)
 * @param {string} params.content - 알림 내용
 * @returns {Promise<void>} 성공 시 void 반환
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * await createNotification({
 *   memberId: "user-uuid",
 *   category: "CHAT",
 *   content: "새로운 메시지가 도착했습니다."
 * });
 * ```
 */
export const createNotification = async (params: {
  memberId: string;
  category: string;
  content: string;
}): Promise<void> => {
  try {
    await axiosInstance.post('/notification', params);
  } catch (error: any) {
    throw error;
  }
};

/**
 * FCM 토큰 업데이트 API
 * PATCH /notification/fcm
 *
 * @description 사용자의 FCM 토큰을 업데이트합니다.
 * @param {string} fcmToken - 새로운 FCM 토큰
 * @returns {Promise<void>} 성공 시 void 반환
 * @throws {Error} API 호출 실패 시 에러
 *
 * @example
 * ```typescript
 * await updateFcmToken("new-fcm-token-string");
 * console.log("FCM 토큰 업데이트 완료");
 * ```
 */
export const updateFcmToken = async (fcmToken: string): Promise<void> => {
  try {
    await axiosInstance.patch('/notification/fcm', { fcmToken });
  } catch (error: any) {
    throw error;
  }
};
