import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
  textPopUp: {
    width: moderateScale(250),
    height: moderateScale(152),
    position: 'relative',
    backgroundColor: theme.colors.brandColor,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUpcontent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(25),
  },
  // 취소 아이콘은 터치 영역을 위해 wrapper로 사용합니다.
  cancelIconWrapper: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
  },
  cancelIcon: {
    // 아이콘 자체의 크기나 추가 스타일이 필요하면 여기에 지정합니다.
    width: moderateScale(20),
    height: moderateScale(20),
  },
  cancelBtn: {
    width: moderateScale(220),
    height: moderateScale(32),
  },
  cancelBtnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },
  textPopUpText: {
    marginBottom: moderateScale(20),
  },
});
