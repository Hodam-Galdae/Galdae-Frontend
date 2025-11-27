# Firebase 설정 가이드 (간단 버전)

## 📁 파일 위치

### Android (Source Sets - 자동 선택)
```
android/app/src/
├── main/                      # 공통 코드
├── debug/
│   └── google-services.json   # 개발용 Firebase (Debug 빌드 시 자동 사용)
└── release/
    └── google-services.json   # 운영용 Firebase (Release 빌드 시 자동 사용)
```

### iOS
```
ios/
├── GoogleService-Info.dev.plist   # 개발용 Firebase 설정
├── GoogleService-Info.prod.plist  # 운영용 Firebase 설정
└── Galdae/
    └── GoogleService-Info.plist   # 자동 생성됨 (수정하지 마세요)
```

## 🎯 작동 원리

### Android - 완전 자동!
Gradle의 **Source Sets** 기능으로 빌드 타입에 따라 자동 선택:
- **Debug 빌드** → `src/debug/google-services.json` 자동 사용
- **Release 빌드** → `src/release/google-services.json` 자동 사용

**별도 스크립트 불필요!** Gradle이 알아서 처리합니다.

### iOS - npm 스크립트
빌드 전에 적절한 파일을 자동으로 복사:
- **Debug 빌드** → `GoogleService-Info.dev.plist` 복사 후 빌드
- **Release 빌드** → `GoogleService-Info.prod.plist` 복사 후 빌드

### 앱 ID
- **Debug**: `com.hodam.galdae.dev` (개발용)
- **Release**: `com.hodam.galdae` (운영용)

→ **같은 기기에 두 앱을 동시에 설치할 수 있습니다!**

## 🚀 사용법

### Android

```bash
# 개발 (Debug)
npm run android
# → src/debug/google-services.json 자동 사용

# 운영 (Release)
npm run android:release
# → src/release/google-services.json 자동 사용

# 빌드만 하기
npm run build:android:dev   # Dev Release APK
npm run build:android:prod  # Prod Release APK
```

### iOS

```bash
# 개발 (Debug)
npm run ios
# → GoogleService-Info.dev.plist 자동 복사 후 빌드

# 운영 (Release)
npm run ios:release
# → GoogleService-Info.prod.plist 자동 복사 후 빌드
```

## 🔄 Firebase 설정 업데이트 방법

### Android
1. Firebase Console에서 `google-services.json` 다운로드
2. **개발 프로젝트**: `android/app/src/debug/google-services.json`에 덮어쓰기
3. **운영 프로젝트**: `android/app/src/release/google-services.json`에 덮어쓰기

### iOS
1. Firebase Console에서 `GoogleService-Info.plist` 다운로드
2. **개발 프로젝트**: `ios/GoogleService-Info.dev.plist`에 덮어쓰기
3. **운영 프로젝트**: `ios/GoogleService-Info.prod.plist`에 덮어쓰기

⚠️ **주의**: `ios/Galdae/GoogleService-Info.plist`는 자동 생성되므로 직접 수정하지 마세요!

## ✅ 검증

### 빌드하고 확인

```bash
# Android Debug 빌드
npm run android
# 앱 이름: "Galdae (Dev)"
# 앱 ID: com.hodam.galdae.dev

# Android Release 빌드
npm run android:release
# 앱 이름: "Galdae"
# 앱 ID: com.hodam.galdae
```

두 앱이 같은 기기에 동시에 설치됩니다!

## 🛠️ 문제 해결

### Android: Firebase 설정 파일을 찾을 수 없음

```bash
# 파일 존재 확인
ls android/app/src/debug/google-services.json
ls android/app/src/release/google-services.json
```

파일이 없다면 Firebase Console에서 다운로드하여 위 위치에 배치하세요.

### iOS: GoogleService-Info.plist not found

```bash
# 파일 존재 확인
ls ios/GoogleService-Info.dev.plist
ls ios/GoogleService-Info.prod.plist
```

### 잘못된 Firebase 프로젝트에 연결됨

1. 빌드 클린: `npm run clean:android` 또는 `npm run clean:ios`
2. 올바른 파일이 올바른 위치에 있는지 확인
3. 다시 빌드

## 📋 요약

| 구분 | Debug | Release |
|------|-------|---------|
| **Firebase** | Dev | Prod |
| **Android 파일 위치** | `src/debug/google-services.json` | `src/release/google-services.json` |
| **iOS 파일 위치** | `GoogleService-Info.dev.plist` | `GoogleService-Info.prod.plist` |
| **App ID (Android)** | com.hodam.galdae.dev | com.hodam.galdae |
| **App ID (iOS)** | com.hodam.galdae.dev | com.hodam.galdae |
| **앱 이름** | Galdae (Dev) | Galdae |
| **자동 선택?** | ✅ Android 완전 자동<br>✅ iOS npm 스크립트 | ✅ Android 완전 자동<br>✅ iOS npm 스크립트 |

## 💡 핵심 포인트

1. **Android**: Source Sets 덕분에 **완전 자동** - 스크립트 불필요!
2. **iOS**: npm 스크립트로 자동 복사 - Xcode 설정 불필요!
3. **양쪽 모두**: `npm run android` / `npm run ios` 만 사용하면 됨

**매우 간단합니다!** 🎉
