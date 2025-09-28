
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';
// import {} from '../utils/ScreenScaler';

import { theme } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: 15,
  },
  header: {
    backgroundColor: theme.colors.Galdae,
  },
  generateButton: {
    width: screenWidth - 30,
    borderRadius: theme.borderRadius.size30,
    height: 42,
    marginBottom: 40,
    paddingVertical: 12,
  },
  generateText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },

  searchDate: {
    marginBottom: 2,
    marginLeft: 14,
  },
  searchList: {
    height: 500,
  },
  searchListWrapper: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.grayV3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: (12),
    paddingBottom: 15,
    paddingTop: 8,
  },
  searchListBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.red,
    gap: (30),
  },

  searchKeyword: {
    marginLeft: 14,
  },
  searchIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
    // backgroundColor: theme.colors.red,   // (디버그용이었으면 제거 권장)
  },

  // ✨ 인풋 우측에 아이콘 공간 확보
  searchInput: {
    paddingRight: 44,           // 아이콘 너비 + 여백
    borderRadius: theme.borderRadius.size30,
    backgroundColor: theme.colors.white,
  },

  // (선택) InputText 컨테이너 스타일 prop이 있다면 같이 맞춥니다.
  // searchInputContainer: { height: 44 },

  // ✨ 아이콘 버튼 절대 배치
  searchIconBtn: {
    position: 'absolute',
    right: 10,
    bottom: -3,
    transform: [{ translateY: -11 }], // 아이콘 세로 중앙 맞춤(아이콘 높이의 절반)
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,     // 안드로이드에서 겹침 이슈가 있으면
    elevation: 2,   // ✨ 추가 (안드로이드 zIndex 보조)
  },

  // ✨ 아이콘 자체 크기
  searchIconSvg: {
    width: 22,
    height: 22,
  },
  mainTitle: {
    fontSize: theme.fontSize.size22,
    fontWeight: 'bold',
    lineHeight: Platform.select({
      android: 40,
    }),
  },
  title: {
    fontSize: theme.fontSize.size18,
    fontWeight: 'bold',
    color: theme.colors.blackV0,
    marginBottom: 20,
  },
  switchBtn: {
    width: 24,
    height: 24,
  },
  switchIcon: {
    width: 24,
    height: 24,
  },
  positionBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 30,
    marginBottom: 40,
  },
  buttonStyle: {
    borderWidth: 1,
    height: moderateScale(30),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.size30,
    marginBottom: 30,
  },
  positionIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  startContain: { //고정 width 설정해야할듯
    alignItems: 'center',
  },
  arrowRight: {
    marginTop: 30,
  },
  start: {
    marginTop: 7,
    marginBottom: (10),
  },
  mainPosName: {
    fontSize: theme.fontSize.size18,
    //marginBottom: (4),
    fontWeight: '700',
    lineHeight: (22), // 예시 값
  },
  subPosName: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.grayV1,
    lineHeight: (22), // mainPosName과 동일하게 지정
  },
  startContainer: {
    alignSelf: 'center',
  },
});
