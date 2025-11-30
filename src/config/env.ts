import { Platform } from 'react-native';
import development from './env.development';

// Android: package name으로 환경 판단 (com.hodam.galdae.dev -> dev)
// iOS: bundle identifier로 환경 판단 (com.hodam.galdaeApp.dev -> dev)
// Local: 수동으로 변경하여 사용 (USE_LOCAL = true로 설정)
const USE_LOCAL = false; // 로컬 백엔드 사용 시 true로 변경

const getConfig = () => {
  console.log('🔧 [ENV Config] 환경 설정 감지 시작');
  console.log('🔧 [ENV Config] Platform:', Platform.OS);
  console.log('🔧 [ENV Config] USE_LOCAL:', USE_LOCAL);
  console.log('🔧 [ENV Config] __DEV__:', __DEV__);

  // ⚠️ 임시: 항상 DEVELOPMENT 환경 사용
  console.log('⚠️ [ENV Config] 임시로 항상 DEVELOPMENT 환경 사용');
  console.log('🔧 [ENV Config] Using DEVELOPMENT environment (forced)');
  console.log('🔧 [ENV Config] API URL:', development.API_BASE_URL);
  return development;

  // // 로컬 환경 사용 설정이 켜진 경우
  // if (USE_LOCAL) {
  //   console.log('🔧 [ENV Config] Using LOCAL environment');
  //   return local;
  // }

  // if (Platform.OS === 'android') {
  //   const { PackageInfo } = NativeModules;
  //   console.log('🔧 [ENV Config] Android PackageInfo:', PackageInfo);
  //   console.log('🔧 [ENV Config] Package Name:', PackageInfo?.packageName);
  //   if (PackageInfo && PackageInfo.packageName) {
  //     // .dev suffix가 있으면 development 환경
  //     const isDev = PackageInfo.packageName.endsWith('.dev');
  //     console.log('🔧 [ENV Config] Is Dev (Android):', isDev);
  //     console.log('🔧 [ENV Config] Using', isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'environment');
  //     return isDev ? development : production;
  //   }
  // }

  // if (Platform.OS === 'ios') {
  //   const { AppInfo } = NativeModules;
  //   console.log('🔧 [ENV Config] iOS AppInfo:', AppInfo);
  //   console.log('🔧 [ENV Config] AppInfo keys:', AppInfo ? Object.keys(AppInfo) : 'null');
  //   console.log('🔧 [ENV Config] Bundle Identifier:', AppInfo?.bundleIdentifier);

  //   if (AppInfo && AppInfo.bundleIdentifier) {
  //     const bundleId = AppInfo.bundleIdentifier;
  //     console.log('🔧 [ENV Config] Full Bundle ID:', bundleId);

  //     // .dev suffix가 있으면 development 환경
  //     const isDev = bundleId.endsWith('.dev');
  //     console.log('🔧 [ENV Config] Is Dev (iOS):', isDev);
  //     console.log('🔧 [ENV Config] Using', isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'environment');
  //     console.log('🔧 [ENV Config] Selected API URL:', isDev ? development.API_BASE_URL : production.API_BASE_URL);
  //     return isDev ? development : production;
  //   } else {
  //     console.warn('⚠️ [ENV Config] AppInfo.bundleIdentifier를 가져올 수 없습니다. Fallback 사용.');
  //     console.warn('⚠️ [ENV Config] AppInfo object:', JSON.stringify(AppInfo));
  //   }
  // }

  // // 기본값: __DEV__로 판단
  // console.warn('⚠️ [ENV Config] Native Module에서 환경을 감지할 수 없어 __DEV__ 플래그 사용');
  // console.log('🔧 [ENV Config] Using', __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION', 'environment (fallback)');
  // return __DEV__ ? development : production;
};

const config = getConfig();

export default config;
