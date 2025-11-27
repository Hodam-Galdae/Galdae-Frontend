# iOS 빌드 속도 최적화 가이드

## 자동 적용된 최적화 (Podfile)

다음 설정들이 Podfile의 `post_install` 훅을 통해 자동으로 적용되었습니다:

### Debug 빌드 최적화
- ✅ `GCC_OPTIMIZATION_LEVEL = 0` - C/Objective-C 최적화 비활성화
- ✅ `SWIFT_OPTIMIZATION_LEVEL = -Onone` - Swift 최적화 비활성화
- ✅ `SWIFT_COMPILATION_MODE = incremental` - 증분 컴파일 활성화
- ✅ `DEBUG_INFORMATION_FORMAT = dwarf` - dSYM 생성 스킵

### 빌드 속도 향상
- ✅ `COMPILER_INDEX_STORE_ENABLE = NO` - 인덱싱 스토어 비활성화
- ✅ `CLANG_ENABLE_MODULE_DEBUGGING = NO` - 모듈 디버깅 비활성화

---

## Xcode에서 추가 설정 (메인 프로젝트)

Xcode를 열고 다음 설정을 확인/적용하세요:

### 1. 병렬 빌드 설정

**위치:** Xcode > Settings (⌘,) > Locations

- **Build System**: New Build System (기본값)

**위치:** Product > Scheme > Edit Scheme... > Build

- ✅ **Parallelize Build** 체크 확인

### 2. Build Settings (Galdae 타겟)

**위치:** Galdae 프로젝트 선택 > Galdae 타겟 > Build Settings

#### Debug Configuration에만 적용:

```
Debug Information Format
  - Debug: DWARF
  - Release: DWARF with dSYM File

Optimization Level
  - Debug: None [-O0]
  - Release: Fastest, Smallest [-Os]

Swift Compiler - Code Generation
  - Optimization Level (Debug): No Optimization [-Onone]
  - Optimization Level (Release): Optimize for Speed [-O]

  - Compilation Mode (Debug): Incremental
  - Compilation Mode (Release): Whole Module

Enable Index-While-Building Functionality
  - No (빌드 속도 향상, 인덱싱 약간 느림)

Enable Testability (Debug only)
  - Yes

Build Active Architecture Only
  - Debug: Yes (시뮬레이터만 사용 시)
  - Release: No
```

### 3. 빌드 캐시 활성화

터미널에서 실행:

```bash
# Xcode 빌드 시스템 디버그 로깅 (선택사항)
defaults write com.apple.dt.XCBuild EnableDebugActivityLogs -bool YES

# DerivedData 정리 (빌드가 이상할 때만)
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### 4. ccache 설치 및 설정 (선택사항)

**ccache는 C/C++/Objective-C 컴파일 결과를 캐시합니다.**

```bash
# Homebrew로 설치
brew install ccache

# ccache 설정
ccache --max-size=5G

# Xcode에서 ccache 사용하려면 xcconfig에 추가:
# CC=$(brew --prefix ccache)/libexec/cc
# CXX=$(brew --prefix ccache)/libexec/c++
```

**주의:** React Native 0.77+에서는 ccache가 일부 빌드 이슈를 일으킬 수 있으므로 필요시에만 사용하세요.

### 5. 프로젝트 클린 전략

빌드가 느려지거나 이상할 때만 실행:

```bash
# 방법 1: Metro 캐시 클린 (빠름, 먼저 시도)
npm run clean:metro

# 방법 2: iOS 빌드 클린 (보통)
npm run clean:ios

# 방법 3: DerivedData 삭제 (강력)
rm -rf ~/Library/Developer/Xcode/DerivedData/Galdae-*

# 방법 4: 전체 재설치 (가장 느림, 최후의 수단)
cd ios && rm -rf Pods Podfile.lock && pod install
```

---

## 빌드 시간 측정

현재 빌드 시간을 측정하려면:

```bash
# Clean build 시간 측정
time xcodebuild clean build \
  -workspace ios/Galdae.xcworkspace \
  -scheme Galdae-Dev \
  -configuration DevDebug \
  -sdk iphonesimulator \
  -arch x86_64

# 또는 npm 스크립트로
time npm run ios
```

---

## 예상 빌드 시간 개선

적용 전후 비교 (대략적인 예상):

| 상황 | 이전 | 이후 | 개선 |
|------|------|------|------|
| Clean Build | 3-5분 | 2-3분 | ~40% |
| Incremental Build | 30-60초 | 10-20초 | ~60% |
| Pod Install | 20-30초 | 20-30초 | - |

**실제 시간은 Mac 사양, 의존성 개수에 따라 다릅니다.**

---

## 추가 팁

### 개발 워크플로우 최적화

1. **시뮬레이터 사용 시 아키텍처 제한**
   - Build Settings > Build Active Architecture Only (Debug) = Yes

2. **Fast Refresh 최대한 활용**
   - Metro가 실행 중이면 대부분의 JS/TS 변경은 전체 빌드 없이 반영됨

3. **네이티브 변경 최소화**
   - Podfile, Info.plist, 네이티브 코드 변경만 전체 빌드 필요
   - JS/TS 변경은 Fast Refresh로 즉시 반영

4. **Release 빌드는 필요할 때만**
   - 개발 중에는 Debug 스키마 사용
   - 프로덕션 테스트/배포 직전에만 Release 빌드

5. **백그라운드 인덱싱 제어**
   - Xcode를 닫고 빌드하면 인덱싱 오버헤드 제거
   - 터미널에서 `xcodebuild` 직접 사용 가능

---

## 트러블슈팅

### 빌드가 여전히 느린 경우

1. **DerivedData 삭제 후 재빌드**
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData
   ```

2. **Pods 재설치**
   ```bash
   cd ios
   rm -rf Pods Podfile.lock build
   pod install
   ```

3. **Xcode 재시작**
   - 가끔 Xcode가 캐시를 제대로 관리하지 못할 수 있음

4. **Mac 재시작**
   - 메모리 부족이나 프로세스 충돌 시

### 빌드 에러 발생 시

일부 최적화 설정이 특정 라이브러리와 충돌할 수 있습니다:

1. Podfile의 최적화 블록 일부를 주석 처리
2. `pod install` 재실행
3. 문제가 해결되면 어떤 설정이 문제인지 확인

---

## 적용 후 확인사항

✅ 체크리스트:

- [ ] `pod install` 성공적으로 완료
- [ ] Debug 빌드가 정상적으로 실행됨
- [ ] Fast Refresh가 정상 작동
- [ ] 앱이 시뮬레이터/실제 기기에서 실행됨
- [ ] 빌드 시간이 개선됨
- [ ] Release 빌드도 정상 작동 (테스트 필요시)

---

## 참고자료

- [Xcode Build Settings Reference](https://developer.apple.com/documentation/xcode/build-settings-reference)
- [React Native Build Speed Tips](https://reactnative.dev/docs/build-speed)
- [CocoaPods Performance](https://guides.cocoapods.org/using/using-cocoapods#what-is-happening-behind-the-scenes)
