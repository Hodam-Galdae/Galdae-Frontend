// utils/notification.ts
import messaging from '@react-native-firebase/messaging';
import {Linking, Platform} from 'react-native';

export interface PermissionResult {
  granted: boolean;
  token: string | null;
  status: number;
}

export const requestUserPermission = async (): Promise<string | null> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      //console.log('🔓 알림 권한 허용됨:', authStatus);
      try {
        const token = await messaging().getToken();
        //console.log('🎯 FCM 토큰:', token);
        return token;
      } catch (tokenError: any) {
        // iOS 시뮬레이터에서는 APNS 토큰을 사용할 수 없으므로 에러 무시
        if (tokenError.message?.includes('No APNS token')) {
          console.log('ℹ️ iOS 시뮬레이터에서는 FCM 토큰을 사용할 수 없습니다. 실제 기기에서 테스트해주세요.');
        } else {
          console.error('❌ FCM 토큰 획득 실패:', tokenError);
        }
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('❌ 알림 권한 요청 실패:', error);
    return null;
  }
};

// 현재 권한 상태만 확인 (권한 요청은 하지 않음)
export const checkNotificationPermissionStatus =
  async (): Promise<PermissionResult> => {
    try {
      const authStatus = await messaging().hasPermission();
      console.log('📋 [권한 체크] 현재 권한 상태:', authStatus);
      console.log('📋 [권한 체크] 상태 의미:', {
        [-1]: 'UNKNOWN (알 수 없음)',
        0: 'NOT_DETERMINED (아직 요청 안 함)',
        1: 'AUTHORIZED (허용됨)',
        2: 'DENIED (거부됨)',
        3: 'PROVISIONAL (임시 허용, iOS)',
      }[authStatus]);

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // 권한이 허용된 상태 - 토큰 획득 시도
        try {
          const token = await messaging().getToken();
          if (token) {
            console.log('✅ [권한 체크] 알림 권한 허용됨 - 토큰:', token.substring(0, 20) + '...');
            return {granted: true, token, status: authStatus};
          }
        } catch (tokenError: any) {
          // iOS 시뮬레이터에서는 APNS 토큰을 사용할 수 없으므로 에러 무시
          if (tokenError.message?.includes('No APNS token')) {
            console.log('ℹ️ [권한 체크] iOS 시뮬레이터에서는 FCM 토큰을 사용할 수 없습니다.');
            // 시뮬레이터에서는 권한은 허용되었지만 토큰만 없는 상태로 처리
            return {granted: true, token: null, status: authStatus};
          } else {
            console.log('⚠️ [권한 체크] 토큰 획득 실패:', tokenError);
          }
        }
      }

      // 권한이 없거나 거부된 상태
      console.log('🚫 [권한 체크] 알림 권한 없음 - 모달 표시 필요');
      return {granted: false, token: null, status: authStatus};
    } catch (error) {
      console.error('❌ [권한 체크] 확인 실패:', error);
      return {granted: false, token: null, status: -1};
    }
  };

// 실제 권한 요청 (시스템 권한 대화상자 표시)
export const requestUserPermissionWithStatus =
  async (): Promise<PermissionResult> => {
    try {
      console.log('🔔 [권한 요청] requestPermission() 호출 시작');
      const authStatus = await messaging().requestPermission();
      console.log('📋 [권한 요청] requestPermission 결과:', authStatus);

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        try {
          const token = await messaging().getToken();
          if (token) {
            console.log('✅ [권한 요청] 권한 허용됨 - 토큰 획득 성공');
            return {granted: true, token, status: authStatus};
          }
        } catch (tokenError: any) {
          // iOS 시뮬레이터에서는 APNS 토큰을 사용할 수 없으므로 에러 무시
          if (tokenError.message?.includes('No APNS token')) {
            console.log('ℹ️ [권한 요청] iOS 시뮬레이터에서는 FCM 토큰을 사용할 수 없습니다.');
          } else {
            console.log('⚠️ [권한 요청] 토큰 획득 실패:', tokenError);
          }
        }
      }

      console.log('🚫 [권한 요청] 권한 거부됨');
      return {granted: false, token: null, status: authStatus};
    } catch (error) {
      console.error('❌ [권한 요청] 실패:', error);
      return {granted: false, token: null, status: -1};
    }
  };

export const openAppSettings = async (): Promise<void> => {
  try {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings:');
    } else {
      await Linking.openSettings();
    }
  } catch (error) {
    console.error('❌ 설정 열기 실패:', error);
  }
};
