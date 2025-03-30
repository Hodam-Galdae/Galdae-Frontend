// utils/notification.ts
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log('🔓 알림 권한 허용됨:', authStatus);
    const token = await messaging().getToken();
    //console.log('🎯 FCM 토큰:', token);

    // TODO: 이 토큰을 백엔드 서버에 저장
  }
};
