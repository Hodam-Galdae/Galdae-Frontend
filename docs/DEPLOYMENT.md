# 배포 자동화 설정 가이드

이 문서는 Galdae 앱의 GitHub Actions를 통한 자동 배포 설정 방법을 설명합니다.

## 목차

1. [개요](#개요)
2. [사전 준비사항](#사전-준비사항)
3. [Android 설정](#android-설정)
4. [iOS 설정](#ios-설정)
5. [GitHub Secrets 설정](#github-secrets-설정)
6. [배포 실행](#배포-실행)
7. [트러블슈팅](#트러블슈팅)

---

## 개요

### 환경 기반 배포

백엔드와 동일하게 **브랜치에 따라 환경이 자동으로 결정**됩니다:

| 브랜치 | 환경 | Android Flavor | iOS Scheme | Android App ID | iOS Bundle ID |
|--------|------|----------------|------------|----------------|---------------|
| `main` | prod | prod | Galdae-Prod | com.hodam.galdae | com.hodam.galdaeApp |
| `develop` | dev | dev | Galdae-Dev | com.hodam.galdae.dev | com.hodam.galdaeApp.dev |

### 구성된 Workflow

1. **CI (ci.yml)** - PR 및 push 시 자동 실행
   - ESLint 검사
   - TypeScript 타입 검사
   - Jest 테스트 실행
   - Android Debug 빌드
   - iOS Debug 빌드

2. **Beta 배포 (beta-deploy.yml)** - `main` 또는 `develop` 브랜치 push 시 자동 실행
   - 브랜치에 따라 환경(dev/prod) 자동 결정
   - GitHub Environment를 사용하여 환경별 Secrets 분리
   - Android → Google Play Internal Testing
   - iOS → TestFlight

### 배포 플로우

```
코드 작성 → PR 생성 → CI 자동 실행 → Merge
                                 ↓
               develop 브랜치 push → dev 환경 배포
               main 브랜치 push → prod 환경 배포
                                 ↓
                        Beta 배포 자동 실행
                                 ↓
               Google Play Internal Testing / TestFlight
```

### GitHub Environment 설정

환경별로 다른 Secrets를 사용하려면 GitHub Environments를 설정합니다:

1. GitHub 저장소 → **Settings > Environments**
2. **New environment** 클릭
3. `dev`와 `prod` 두 개의 환경 생성
4. 각 환경에 해당하는 Secrets 등록

> **참고:** 환경별로 다른 인증서나 Provisioning Profile을 사용할 경우 각 Environment에 별도로 등록합니다.

---

## 사전 준비사항

### 필수 도구

- **Google Play Console** 계정 (Android)
- **Apple Developer Program** 계정 (iOS, $99/year)
- GitHub 저장소 관리자 권한

### 초기 업로드 (필수)

⚠️ **중요**: Google Play와 App Store 모두 첫 번째 릴리즈는 수동으로 업로드해야 합니다.

#### Android 초기 업로드
```bash
cd android
./gradlew bundleRelease
```
생성된 AAB 파일(`android/app/build/outputs/bundle/release/app-release.aab`)을 Google Play Console에 수동 업로드

#### iOS 초기 업로드
Xcode에서 Archive → Upload to App Store Connect → TestFlight

---

## Android 설정

### 1. Google Play Console 설정

#### 1.1 Service Account 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택 또는 생성
3. **IAM & Admin > Service Accounts** 이동
4. **Create Service Account** 클릭
   - Name: `github-actions-galdae`
   - Role: 선택 안 함 (다음 단계에서 설정)
5. **Create Key** 클릭 → JSON 형식 선택 → 다운로드

#### 1.2 Google Play Console에서 권한 부여

1. [Google Play Console](https://play.google.com/console) 접속
2. **Setup > API access** 이동
3. 위에서 생성한 Service Account 선택
4. **Grant access** 클릭
5. 권한 설정:
   - **Releases**: Create and edit releases
   - **App access**: View app information
6. **Save** 클릭

### 2. Keystore Base64 인코딩

```bash
# 현재 keystore를 base64로 인코딩
cd android/app
base64 -i galdae-key.keystore | pbcopy  # macOS
# 또는
base64 -w 0 galdae-key.keystore > keystore_base64.txt  # Linux
```

출력된 base64 문자열을 복사해두세요.

### 3. Android Secrets

다음 값들을 GitHub Secrets에 등록해야 합니다:

| Secret Name | 설명 | 예시 |
|------------|------|------|
| `ANDROID_KEYSTORE_BASE64` | Base64 인코딩된 keystore 파일 | (위 단계에서 생성) |
| `ANDROID_STORE_PASSWORD` | Keystore 비밀번호 | `galdae` |
| `ANDROID_KEY_ALIAS` | Key alias | `galdae-key` |
| `ANDROID_KEY_PASSWORD` | Key 비밀번호 | `galdae` |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Service Account JSON 파일 내용 전체 | `{"type": "service_account", ...}` |

---

## iOS 설정

### 1. Apple Developer 설정

#### 1.1 App Store Connect API Key 생성

1. [App Store Connect](https://appstoreconnect.apple.com/) 접속
2. **Users and Access > Integrations > App Store Connect API** 이동
3. **Generate API Key** 클릭
   - Name: `GitHub Actions Galdae`
   - Access: `App Manager`
4. **Generate** 클릭
5. API Key 다운로드 (`.p8` 파일)
6. **Issuer ID**와 **Key ID** 복사

#### 1.2 API Key JSON 파일 생성

다운로드한 `.p8` 파일 내용을 사용하여 JSON 파일 생성:

```json
{
  "key_id": "YOUR_KEY_ID",
  "issuer_id": "YOUR_ISSUER_ID",
  "key": "-----BEGIN PRIVATE KEY-----\nYOUR_KEY_CONTENT\n-----END PRIVATE KEY-----",
  "duration": 1200,
  "in_house": false
}
```

- `key_id`: App Store Connect에서 복사한 Key ID
- `issuer_id`: App Store Connect에서 복사한 Issuer ID
- `key`: `.p8` 파일의 전체 내용 (개행 문자는 `\n`으로 표현)

### 2. 인증서 및 Provisioning Profile 준비

#### 방법 1: Xcode에서 Export (권장)

1. Xcode에서 **Preferences > Accounts** 이동
2. Apple ID 추가
3. 팀 선택 후 **Manage Certificates** 클릭
4. **Apple Distribution** 인증서가 있는지 확인 (없으면 생성)

인증서 Export:
```bash
# Keychain Access 앱에서
# "Apple Distribution: Your Name (TEAM_ID)" 인증서를 찾아서
# 우클릭 → Export → .p12 형식으로 저장
# 비밀번호 설정 (나중에 필요)
```

Provisioning Profile Download:
1. [Apple Developer Portal](https://developer.apple.com/account/resources/profiles/list) 접속
2. **Profiles** 이동
3. `com.hodam.galdae` 앱용 **App Store** profile 다운로드

#### 방법 2: Fastlane Match 사용 (고급)

```bash
cd ios
bundle exec fastlane match init
bundle exec fastlane match appstore
```

> **Note**: Match는 팀 환경에 적합하며, Git 저장소에 인증서를 암호화하여 저장합니다.

### 3. Base64 인코딩

```bash
# 인증서 (.p12) 인코딩
base64 -i distribution_certificate.p12 | pbcopy  # macOS

# Provisioning Profile 인코딩
base64 -i Github_Actions_Galdae.mobileprovision | pbcopy  # macOS
```

### 4. iOS Secrets

| Secret Name | 설명 | 예시 |
|------------|------|------|
| `IOS_P12_BASE64` | Base64 인코딩된 .p12 인증서 | (위 단계에서 생성) |
| `IOS_CERTIFICATE_PASSWORD` | .p12 인증서 비밀번호 | `your_password` |
| `IOS_MOBILEPROVISION_BASE64` | Base64 인코딩된 provisioning profile | (위 단계에서 생성) |
| `IOS_PROVISIONING_PROFILE_SPECIFIER` | Provisioning profile 이름 | `match AppStore com.hodam.galdae` |
| `IOS_TEAM_ID` | Apple Developer Team ID | `ABCDE12345` |
| `APPLE_ID` | Apple Developer 계정 이메일 | `developer@hodam.com` |
| `ITC_TEAM_ID` | App Store Connect Team ID | `123456789` |
| `APP_STORE_CONNECT_API_KEY_CONTENT` | API Key JSON 파일 전체 내용 | `{"key_id": "...", ...}` |
| `KEYCHAIN_PASSWORD` | CI용 임시 keychain 비밀번호 | `temp_password_123` (임의 생성) |

#### Team ID 찾는 방법

- **IOS_TEAM_ID**: [Apple Developer Membership](https://developer.apple.com/account/#/membership/) 페이지에서 확인
- **ITC_TEAM_ID**: App Store Connect → 우측 상단 계정 메뉴 → Team ID

---

## GitHub Secrets 설정

### Secrets 등록 방법

1. GitHub 저장소로 이동
2. **Settings > Secrets and variables > Actions** 클릭
3. **New repository secret** 클릭
4. Name과 Value 입력 후 **Add secret**

### 전체 Secrets 목록

#### Android (5개)
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_STORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`

#### iOS (9개)
- `IOS_P12_BASE64`
- `IOS_CERTIFICATE_PASSWORD`
- `IOS_MOBILEPROVISION_BASE64`
- `IOS_PROVISIONING_PROFILE_SPECIFIER`
- `IOS_TEAM_ID`
- `APPLE_ID`
- `ITC_TEAM_ID`
- `APP_STORE_CONNECT_API_KEY_CONTENT`
- `KEYCHAIN_PASSWORD`

### Secrets 검증

```bash
# GitHub CLI 사용 (선택사항)
gh secret list
```

---

## 배포 실행

### 1. CI 자동 실행

PR을 생성하거나 `main`, `develop` 브랜치에 push하면 자동으로 실행됩니다.

```bash
git checkout -b feature/new-feature
# 코드 수정
git commit -m "feat: add new feature"
git push origin feature/new-feature
# PR 생성 → CI 자동 실행
```

### 2. Beta 배포 실행

#### 방법 1: 브랜치 Push (자동 - 권장)

```bash
# Dev 환경 배포 (com.hodam.galdae.dev)
git push origin develop

# Prod 환경 배포 (com.hodam.galdae)
git push origin main
```

브랜치에 따라 환경이 자동으로 결정됩니다:
- `develop` → dev 환경 (Galdae-Dev scheme, dev flavor)
- `main` → prod 환경 (Galdae-Prod scheme, prod flavor)

#### 방법 2: 수동 트리거

1. GitHub 저장소 → **Actions** 탭
2. **Beta Deployment** workflow 선택
3. **Run workflow** 클릭
4. Platform 선택:
   - `android`: Android만 배포
   - `ios`: iOS만 배포
   - `both`: 양쪽 모두 배포
5. **Run workflow** 클릭

> **참고:** 수동 트리거 시에도 현재 브랜치에 따라 환경이 결정됩니다.

### 3. 배포 진행 상황 확인

1. GitHub → **Actions** 탭
2. 실행 중인 workflow 클릭
3. 각 job의 로그 확인

### 4. 배포 완료 후

#### Android
1. [Google Play Console](https://play.google.com/console) 접속
2. **Testing > Internal testing** 이동
3. 새 버전이 업로드된 것을 확인
4. 테스터에게 배포 (Promote to internal testing)

#### iOS
1. [App Store Connect](https://appstoreconnect.apple.com/) 접속
2. **TestFlight** 탭 이동
3. 새 빌드가 "Processing" 상태인지 확인 (보통 10-30분 소요)
4. Processing 완료 후 테스터 그룹에 배포

---

## 트러블슈팅

### Android

#### 문제: `google-play-service-account.json` 파일을 찾을 수 없음
```
해결: GitHub Secrets에 JSON 내용이 올바르게 등록되었는지 확인
전체 JSON 객체를 복사해야 함 (파일 경로가 아님)
```

#### 문제: Signing 에러
```
해결:
1. ANDROID_KEYSTORE_BASE64가 올바른지 확인
2. 비밀번호가 정확한지 확인
3. Key alias가 일치하는지 확인
```

#### 문제: Upload to Play Store 실패
```
해결:
1. 첫 번째 릴리즈는 수동으로 업로드해야 함
2. Service Account 권한 확인
3. Version code가 이전 버전보다 높은지 확인
```

### iOS

#### 문제: Code signing 실패
```
해결:
1. 인증서(.p12)와 Provisioning Profile이 일치하는지 확인
2. Bundle Identifier가 정확한지 확인 (com.hodam.galdaeApp)
3. Team ID가 올바른지 확인
4. Provisioning Profile이 만료되지 않았는지 확인
```

#### 문제: TestFlight 업로드 실패
```
해결:
1. App Store Connect API Key가 올바른지 확인
2. API Key에 적절한 권한이 있는지 확인 (App Manager 이상)
3. 첫 번째 릴리즈는 Xcode에서 수동 업로드 필요
```

#### 문제: CocoaPods 설치 실패
```
해결:
1. Podfile.lock이 저장소에 커밋되어 있는지 확인
2. GitHub Actions에서 Ruby 버전 확인
3. pod install 로그 확인
```

### 공통

#### 문제: Node modules 설치 실패
```
해결:
1. package-lock.json이 저장소에 커밋되어 있는지 확인
2. Node 버전 확인 (18 이상 필요)
```

#### 문제: 빌드 시간 초과
```
해결:
1. GitHub Actions 무료 플랜은 job당 6시간 제한
2. 캐시 설정 확인 (Gradle, CocoaPods)
3. 병렬 빌드 고려
```

---

## 추가 최적화

### 빌드 시간 단축

#### Android
```yaml
# Gradle 캐시 활용 (이미 구성됨)
- uses: actions/cache@v4
  with:
    path: ~/.gradle/caches
```

#### iOS
```yaml
# CocoaPods 캐시 활용 (이미 구성됨)
- uses: actions/cache@v4
  with:
    path: ios/Pods
```

### 알림 설정

Slack 또는 Discord로 배포 알림을 받으려면:

```yaml
# .github/workflows/beta-deploy.yml에 추가
- name: Send Slack notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Beta deployment completed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

GitHub Secrets에 `SLACK_WEBHOOK` 추가 필요

---

## 참고 자료

- [Fastlane 공식 문서](https://docs.fastlane.tools/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Google Play Console 문서](https://support.google.com/googleplay/android-developer)
- [App Store Connect 문서](https://developer.apple.com/app-store-connect/)

---

## 문의

배포 자동화 관련 문제가 있으면 팀 내에서 공유하거나 GitHub Issues에 등록하세요.
