import {StyleSheet} from 'react-native';
import {} from '../utils/ScreenScaler';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    padding: 15,
    position: 'relative',
  },
  // 헤더 스타일
  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: theme.colors.white,
  },

  madeGaldaeContainer: {
    marginBottom: 20,
  },
  madeGaldae: {
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
    marginBottom: 10,
  },
  // 서비스 섹션 스타일
  serviceTitle: {
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
    color: theme.colors.blackV1,
    marginBottom: 12,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  serviceButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 6,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 62,
    backgroundColor: theme.colors.grayV3,
    borderRadius: 99,
  },
  serviceIcon: {
    width: 32,
    height: 32,
  },
  serviceButtonText: {
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
    color: theme.colors.blackV0,
    textAlign: 'center',
  },
  newGaldaeList: {
    marginRight: 8,
    padding: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    borderColor: theme.colors.Galdae,
    borderWidth: 1,
    width: 90,
  },
  newGaldaeTimeText: {
    fontSize: theme.fontSize.size10,
    marginBottom: 6,
    color: theme.colors.grayV2,
  },
  newGaldaeDepartText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    marginBottom: 5,
    maxWidth: 80,
    //backgroundColor:theme.colors.Galdae,
  },
  noData: {
    //height:'100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    //backgroundColor:theme.colors.Galdae,
  },
  newGaldaeDestText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    maxWidth: 80,
  },
  newGaldaeArrowIcon: {
    marginBottom: 5,
  },
  // 빠른 갈대 관련 스타일
  // startGaldaeEx: {
  //   marginTop: 2,
  //   fontSize: theme.fontSize.size14,
  //   fontWeight: '500',
  //   color: theme.colors.grayV2,
  //   marginBottom: 14,
  // },
  // borderedBox: {
  //   width: '100%',
  //   justifyContent: 'center',
  //   borderColor: theme.colors.grayV0,
  //   borderRadius: theme.borderRadius.size10,
  //   borderWidth: 2,
  //   paddingHorizontal: 35,
  //   paddingVertical: 18,
  // },
  // startAndEnd: {
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   gap: 30,
  //   marginBottom: 16,
  // },
  // startContain: {
  //   alignItems: 'center',
  //   maxWidth: (screenWidth - 52) / 2 - 40,
  // },
  // start: {
  //   marginBottom: 12,
  // },
  // mainPosName: {
  //   fontSize: theme.fontSize.size18,
  //   fontWeight: '700',
  //   lineHeight: 22,
  // },
  // subPosName: {
  //   fontSize: theme.fontSize.size16,
  //   fontWeight: '500',
  //   color: theme.colors.grayV1,
  //   lineHeight: 22,
  // },
  // switchBtn: {
  //   marginTop: 40,
  // },
  // switchIcon: {
  //   width: 24,
  //   height: 24,
  // },
  // startContainer: {
  //   alignSelf: 'center',
  // },
  // startTime: {
  //   fontSize: theme.fontSize.size14,
  //   color: theme.colors.Galdae,
  //   fontWeight: '500',
  //   marginTop: 8,
  // },
  // startDateTime: {
  //   marginTop: 4,
  //   fontSize: theme.fontSize.size16,
  //   fontWeight: '700',
  // },
  // line: {
  //   borderTopWidth: 1,
  //   borderColor: theme.colors.grayV0,
  // },
  // generateButton: {
  //   width: '100%',
  //   marginTop: 10,
  //   borderRadius: theme.borderRadius.size10,
  //   height: 42,
  // },
  // generateText: {
  //   fontSize: theme.fontSize.size16,
  //   fontWeight: '700',
  // },
  advertiseBox: {
    width: '100%',
    height: 80,
    borderRadius: theme.borderRadius.size10,
    backgroundColor: theme.colors.red,
    marginTop: 20,
  },
  nowGaldaeTitle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nowGaldae: {
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
  },

  filters: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
  },
  nowGaldaeList: {
    marginTop: 14,
    position: 'relative',
    //height:500,
    // backgroundColor:theme.colors.grayV0,
  },
  borderedListBox: {
    width: '100%',
    height: 195,
    borderColor: theme.colors.grayV0,
    borderRadius: theme.borderRadius.size10,
    borderWidth: 1,
    paddingStart: 24,
    paddingTop: 14,
    marginBottom: 12,
  },
  galdaeOwner: {
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
  },
  fromContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  fromMainLocation: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },
  fromSubLocation: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
  },
  toContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 7,
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    alignItems: 'center',
  },
  fromToLine: {
    width: 20,
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  toastPopup: {
    paddingVertical: 9,
    paddingHorizontal: 26,
    borderRadius: theme.borderRadius.size30,
    backgroundColor: theme.colors.Galdae,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // 가로 중앙 정렬
    position: 'absolute',
    bottom: 20,
    color: theme.colors.white,
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
});
