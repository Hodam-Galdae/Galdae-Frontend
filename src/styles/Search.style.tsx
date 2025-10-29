
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';
// import {} from '../utils/ScreenScaler';

import { theme } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,

    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: 15,
  },

  title2: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.blackV1,
  },
  goToRouteContainer:{
    padding :20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  goToRoute:{
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.blackV2,
  },
  listBox: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: (10),
  },
  emptyContainer: {
    height:'40%',
    justifyContent:'center',
    alignItems:'center',
    gap:12,
  },
  listBoxContent:{
    marginBottom: 10,
  },
  fromToContainer: {
    flexDirection: 'row',
    gap: (4),
    marginTop: (12),
    alignItems: 'center',
  },
  fromContainer: {
    flexDirection: 'row',
    gap: (4),
    //width: '40%',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  toContainer: {
    flexDirection: 'row',
    gap: (4),
    alignItems: 'center',
    //width: '40%',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  fromContainerSearch: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    color: theme.colors.blue,
  },
  fromMainLocation: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    color: theme.colors.blackV1,
  },
  fromMainLocationCom: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    color: theme.colors.blackV3,
  },
  fromSubLocation: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.blackV2,
  },
  fromSubLocationCom: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.blackV3,
  },
  departureTimeContainer: {
    flexDirection: 'row',
    gap: (4),
    marginTop: (4),
    alignItems: 'center',
  },
  departureTimeTitle: {
    color: theme.colors.GaldaeDark,
    fontWeight: '700',
    fontSize: theme.fontSize.size14,
  },
  departureTimeTitleCom:{
    color: theme.colors.blackV3,
    fontWeight: '500',
    fontSize: theme.fontSize.size14,
  },
  departureTime: {
    color: theme.colors.grayV0,
    fontWeight: '500',
    fontSize: theme.fontSize.size14,
  },
  departureTimeCom: {
    color: theme.colors.grayV0,
    fontWeight: '500',
    fontSize: theme.fontSize.size14,
  },
  header: {
    backgroundColor: theme.colors.Galdae,
    position: 'relative',
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
  cancelBtn: {
    width: 22,
    height: 22,
    position: 'absolute',
    right: 10,
    bottom: -3,
    transform: [{ translateY: -11 }], // 아이콘 세로 중앙 맞춤(아이콘 높이의 절반)
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,     // 안드로이드에서 겹침 이슈가 있으면
    elevation: 2,   // ✨ 추가 (안드로이드 zIndex 보조)
  },
  searchDate: {
    marginBottom: 2,
    marginLeft: 14,
  },
  searchList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  searchListWrapper: {

    alignItems: 'center',
    justifyContent: 'center',

  },
  searchKeywordList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  searchKeyword:{
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.blackV3,
    height: 26,
    padding: 1,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchListBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: theme.colors.red,
    gap: (30),
  },

  searchKeywordText: {
    color: theme.colors.blackV3,
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
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  searchListContainer:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  searchRight: {
    width: 0,
  },
  // ✨ 인풋 우측에 아이콘 공간 확보
  searchInput: {
    
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
    fontSize: theme.fontSize.size16,
    fontWeight: 'bold',
    color: theme.colors.blackV1,
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

  borderedListBox: {
    width: '100%',
    borderColor: theme.colors.grayV2,
    borderRadius: theme.borderRadius.size12,
    borderWidth: 1,
    paddingStart:15,
    paddingEnd: 15,
    paddingBottom: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderedListBoxComplete: {
    width: '100%',
    borderColor: theme.colors.grayV3,
    borderRadius: theme.borderRadius.size10,
    backgroundColor: theme.colors.grayV3,
    borderWidth: 1,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galdaeOwner: {
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
  },
  galdaeOwnerCom: {
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
    color: theme.colors.grayV2,
  },

  passengerTimeContainer: {
    flexDirection: 'row',
    gap: (6),
    marginTop: (6),
    alignItems: 'center',

  },

  fromToLine: {
    width: (20),
    height: (20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: (4),
    alignItems: 'center',
  },

  timeContainer: {
    flexDirection: 'row',
    gap: (8),
    marginTop: (6),
    alignItems: 'center',
  },
  timePossible: {
    backgroundColor: theme.colors.blue2,
    borderWidth: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  timePossibleCom: {
    backgroundColor: theme.colors.grayV2,
    borderColor: theme.colors.grayV2,
    borderWidth: 0,
  },
  sameGenderPossible: {
    backgroundColor: theme.colors.Galdae3,
    borderWidth: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  sameGenderPossibleText: {
    color: theme.colors.blue,
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
  },
  timeNotPossible: {
    backgroundColor: theme.colors.yellow2,
    borderColor: theme.colors.grayV2,
    borderWidth: 0,
  },
  timePossibleText: {
    color: theme.colors.blue,
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
  },
  timePossibleTextCom: {
    color: theme.colors.white,
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
  },
  timeNotPossibleText: {
    color: theme.colors.red,
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
  },

  typeContainer: {
    flexDirection: 'row',
    marginTop: (12),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  typePossible: {
    backgroundColor: theme.colors.blue2,
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typePossibleText: {
    color: theme.colors.blue,
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
  },
});
