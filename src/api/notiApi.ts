import axiosInstance from './axiosInstance';
import {Notification,UncheckedNotificationResponse,CheckNotificationRequest} from '../types/getTypes';

/**
 * 알림 목록 조회 API
 * @returns
 */
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axiosInstance.get<Notification[]>('/notification');
    console.log('✅ 알림 목록 조회 성공:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('❌ 알림 목록 조회 실패:', error);
    throw error;
  }
};
/**
 * 안읽은 알림 유무 API
 * @returns
 */
export const getUncheckedNotification = async (): Promise<UncheckedNotificationResponse> => {
  try {
    const response = await axiosInstance.get<UncheckedNotificationResponse>('/notification/uncheck');
    console.log('✅ 안읽은 알림 조회 성공:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('❌ 안읽은 알림 조회 실패:', error);
    throw error;
  }
};
/**
 * 알림 확인 API
 * @param notificationId
 * @returns
 */
export const checkNotification = async (notificationId: number): Promise<unknown> => {
  try {
    const requestBody: CheckNotificationRequest = { notificationId };
    const response = await axiosInstance.post('/notification/check', requestBody);
    console.log('✅ 알림 확인 성공:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('❌ 알림 확인 실패:', error);
    throw error;
  }
};
