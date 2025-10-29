# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

갈대는 배달, 택시, OTT 구독 등의 비용 분담 서비스를 위한 React Native 모바일 애플리케이션입니다. 사용자가 그룹을 만들고, 실시간 채팅을 하며, 함께 정산할 수 있습니다.

**기술 스택:**
- React Native 0.77
- TypeScript
- Redux Toolkit (상태 관리)
- React Navigation (bottom tabs + stack navigation)
- WebSocket (STOMP) (실시간 채팅)
- Firebase Cloud Messaging (푸시 알림)
- 멀티 환경 설정 (dev/prod)

## 개발 명령어

### 앱 실행

**개발 환경:**
```bash
# iOS
npm run ios:dev
# 또는: ENVFILE=.env.development react-native run-ios --scheme Galdae-Dev

# Android
npm run android:dev
# 또는: cd android && ./gradlew app:installDevDebug -PreactNativeDevServerPort=8081
```

**프로덕션 환경:**
```bash
# iOS
npm run ios:prod
# 또는: ENVFILE=.env.production react-native run-ios --scheme Galdae-Prod

# Android
npm run android:prod
# 또는: cd android && ./gradlew app:installProdDebug -PreactNativeDevServerPort=8081
```

**Metro 서버 시작:**
```bash
npm start
# 또는: react-native start
```

### 빌드

```bash
# Android
npm run build:android:dev    # Debug 빌드
npm run build:android:prod   # Release 빌드

# iOS
npm run build:ios:dev        # Debug 빌드
npm run build:ios:prod       # Release 빌드
```

### iOS 설정

**최초 클론 후 또는 네이티브 의존성 업데이트 후 필수:**
```bash
bundle install                # Ruby 의존성 설치 (최초 1회만)
cd ios && bundle exec pod install    # CocoaPods 의존성 설치
```

### 클린

```bash
npm run clean:metro    # Metro bundler 캐시 삭제
npm run clean:android  # Android 빌드 클린
npm run clean:ios      # iOS 빌드 클린
```

### 테스트 & 코드 품질

```bash
npm run lint    # ESLint 실행
npm test        # Jest 테스트 실행
npm run cm      # Commitizen (conventional commits)
```

## 아키텍처

### 디렉토리 구조

```
src/
├── api/              # API 레이어 (axios instance, 모든 API 호출)
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── button/       # 버튼 컴포넌트 (BasicButton, SVGButton 등)
│   ├── popup/        # 모달/팝업 컴포넌트
│   └── tag/          # 태그 컴포넌트
├── screens/          # 화면 컴포넌트
│   ├── category/     # 카테고리별 화면
│   │   ├── delivery/ # 배달 공유 화면
│   │   ├── ott/      # OTT 구독 공유 화면
│   │   └── taxi/     # 택시 공유 화면
│   └── myinfo/       # 사용자 프로필/설정 화면
├── modules/redux/    # Redux 상태 관리
│   ├── slice/        # Redux Toolkit slices
│   ├── store/        # Redux store 설정
│   └── RootReducer.ts
├── types/            # TypeScript 타입 정의
├── styles/           # 컴포넌트별 스타일 (StyleSheet)
├── hooks/            # 커스텀 React hooks
├── utils/            # 유틸리티 함수
├── constants/        # 상수 (예: 은행 옵션)
├── assets/           # 정적 자원
└── config/           # 설정 파일
```

### 상태 관리 (Redux)

Redux Toolkit을 사용하며, 도메인별로 slice를 분리했습니다:

- `UserSlice` - 사용자 인증 상태
- `myInfoSlice` - 사용자 프로필 정보
- `homeGaldaeSlice` - 홈 화면 그룹 목록
- `taxiSlice` - 택시 공유 상태
- `orderSlice` - 배달 주문 상태
- `subscribeSlice` - OTT 구독 상태
- `galdaeSlice` - 일반 그룹 상태
- `myGaldaeSlice` - 사용자가 참여한 그룹
- `myCreatedGaldaeSlice` - 사용자가 만든 그룹
- `postDetailSlice` - 그룹 상세 화면 상태
- `placesSlice` - 위치/장소 데이터
- `frequentSlice` - 자주 가는 경로
- `notiSlice` - 알림

**Redux 상태 접근:**
```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';

const data = useSelector((state: RootState) => state.taxiSlice.data);
```

**액션 디스패치:**
```typescript
import { useAppDispatch } from '../modules/redux/store';
const dispatch = useAppDispatch();
```

### 내비게이션

React Navigation을 사용한 하이브리드 구조:

1. **Root Stack Navigator** (`App.tsx`) - 모든 화면 포함
2. **Bottom Tab Navigator** (`MainTab.tsx`) - 3개 탭: 홈, 채팅, 내정보
3. **카테고리별 플로우** - 스택 내에 중첩

**내비게이션 타입 안전성:**
```typescript
type RootStackParamList = {
  ScreenName: { param1: string; param2: number } | undefined;
};
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
```

### API 레이어

모든 API 호출은 `src/api/`에 중앙화되어 있습니다. axios instance (`axiosInstance.ts`)에서 처리:

- **자동 토큰 주입** - EncryptedStorage에서
- **토큰 갱신** - 401 에러 시
- **요청/응답 로깅** - axios-logger 사용
- **Multipart form-data** - 특정 엔드포인트용
- **Base URL 설정** - 환경 변수에서

**API 모듈:**
- `authApi.ts` - 인증 (로그인, 회원가입)
- `chatApi.ts` - 채팅 메시지, 멤버, 채팅방 정보
- `membersApi.ts` - 사용자 프로필 작업
- `taxiApi.ts` - 택시 그룹 CRUD
- `orderApi.ts` - 배달 주문 CRUD
- `subScribeApi.ts` - OTT 구독 CRUD
- `searchApi.ts` - 검색 기능
- `questionApi.ts` - FAQ/문의
- `reportApi.ts` - 신고
- `notiApi.ts` - 알림
- `placesApi.ts` - 위치 서비스
- `onboardingApi.ts` - 온보딩 플로우

**환경 설정:**
- Base URL은 `src/api/axiosInstance.ts`에 설정
- Dev: `http://52.78.169.186`
- WebSocket: `ws://52.78.169.186:8081/ws`

### 실시간 채팅 (WebSocket)

채팅 기능은 `useWebSocket` hook을 통해 STOMP over WebSocket 사용 (`src/hooks/useWebSocket.tsx`):

- **구독:** `/topic/chatroom/{chatroomId}` (메시지)
- **발행:** `/send` 엔드포인트
- **메시지 타입:** `MESSAGE`, `IMAGE`, `MONEY`
- **안읽음 수 추적:** `/topic/chatCount/{chatroomId}`를 통한 실시간 추적

**WebSocket 메시지 포맷:**
```typescript
{
  message: string,
  type: 'MESSAGE' | 'IMAGE' | 'MONEY',
  sender: string,
  senderImage: string,
  time: string (ISO 8601)
}
```

### 인증 & 저장소

- **EncryptedStorage** (`react-native-encrypted-storage`) 저장 항목:
  - `accessToken` - JWT 액세스 토큰
  - `refreshToken` - JWT 리프레시 토큰
  - `memberId` - 사용자 ID

- **토큰 갱신 플로우:** Axios 인터셉터가 갱신된 토큰으로 실패한 요청을 자동으로 재시도

### 멀티 환경 설정

앱은 두 가지 환경(Dev/Prod)을 지원하며 각각 별도로:
- **iOS schemes:** `Galdae-Dev`, `Galdae-Prod` (Xcode에서 설정)
- **Android product flavors:** `Dev`, `Prod` (Gradle에서 설정)
- **환경 파일:** `.env.development`, `.env.production`
- **iOS 설정 파일:** `ios/Configs/GaldaeDev.xcconfig`, `ios/Configs/GaldaeProd.xcconfig`

### SVG 처리

`react-native-svg-transformer`를 사용하여 SVG 파일을 컴포넌트로 import:

```typescript
import { SvgProps } from 'react-native-svg';
import MyIcon from '../assets/icons/myicon.svg';

<MyIcon width={24} height={24} />
```

SVG 컴포넌트는 `SVG.tsx` 컴포넌트에서 이름 기반 조회로 중앙화되어 있습니다.

### 스타일 규칙

- **분리된 스타일 파일:** 각 화면/컴포넌트는 `src/styles/`에 대응하는 `.style.tsx` 파일이 있음
- **테마 시스템:** `src/styles/theme.ts`에서 색상 및 간격 중앙화
- **StyleSheet API:** 모든 스타일은 React Native의 `StyleSheet.create()` 사용

**예시:**
```typescript
// 컴포넌트: src/components/Header.tsx
// 스타일: src/styles/Header.style.tsx
import styles from '../styles/Header.style';
```

### 푸시 알림

Firebase Cloud Messaging (FCM)과 Notifee를 사용한 로컬 알림:

- **설정:** `src/utils/notification.tsx`에서 권한 요청 처리
- **포그라운드 메시지:** Notifee를 통해 표시
- **백그라운드/종료 상태:** Firebase에서 처리

### 커스텀 Hooks

- `useWebSocket` - 채팅용 WebSocket 연결 관리
- `useImagePicker` - 카메라/갤러리 이미지 선택
- `useDidMountEffect` - 마운트 후에만 effect 실행 (첫 렌더 스킵)

## 주요 사항

### iOS 고려사항

- **CocoaPods:** npm install 또는 네이티브 의존성 변경 후 `bundle exec pod install` 필수 실행
- **User Script Sandboxing:** 호환성을 위해 Podfile에서 비활성화
- **권한:** `react-native-permissions`를 통해 Podfile에서 Camera 및 PhotoLibrary 권한 설정

### Android 고려사항

- **Gradle 버전:** compileSdkVersion 35, targetSdkVersion 34, minSdkVersion 24
- **Kotlin:** 버전 2.0.21
- **Kakao SDK:** `android/build.gradle`에서 커스텀 Maven 저장소 설정
- **Google Services:** `google-services` 플러그인을 통한 Firebase 설정

### 일반적인 패턴

**화면 컴포넌트 구조:**
```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/ScreenName.style';

type RootStackParamList = { /* navigation params */ };

const ScreenName: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 컴포넌트 로직

  return (
    <View style={styles.container}>
      {/* UI */}
    </View>
  );
};

export default ScreenName;
```

**API 호출 패턴:**
```typescript
import { apiFunction } from '../api/moduleApi';

try {
  const result = await apiFunction(params);
  // 성공 처리
} catch (error) {
  console.error('Error:', error);
  // 에러 처리
}
```

### 서드파티 서비스

- **소셜 로그인:** 카카오, 구글, 애플 (iOS/Android 설정됨)
- **Firebase:** Cloud Messaging, Analytics
- **이미지 처리:** `react-native-image-resizer`, `react-native-image-picker`
- **비디오:** `react-native-video`
- **WebView:** `react-native-webview` (이용약관에 사용)

### 개발 워크플로우

1. **의존성 설치:** `npm install`
2. **iOS 설정:** `cd ios && bundle exec pod install`
3. **Metro 시작:** `npm start`
4. **앱 실행:** `npm run ios:dev` 또는 `npm run android:dev`
5. **변경사항 작업:** TypeScript/TSX 파일 수정
6. **테스트:** `R` 키 또는 Cmd+R (iOS) / Ctrl+M → Reload (Android)로 앱 리로드

### 디버깅

- **Redux 상태:** redux-flipper 사용 (dev 모드에서만)
- **네트워크 요청:** 콘솔에서 axios-logger로 로그 확인
- **React DevTools:** Metro를 통해 사용 가능
- **로그:** 모든 API 요청/응답은 이모지로 쉽게 식별 가능하게 로깅됨 (🚀 요청, ✅ 성공, ❌ 에러)
