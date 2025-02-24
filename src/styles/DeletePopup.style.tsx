import { StyleSheet } from 'react-native';
//import {  } from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  textPopUp: {
    width:250,
    height: 152,
    position: 'relative',
    backgroundColor: theme.colors.brandColor,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUpcontent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  // 취소 아이콘은 터치 영역을 위해 wrapper로 사용합니다.
  cancelIconWrapper: {
    position: 'absolute',
    top:20,
    right: 20,
  },
  cancelIcon: {
    // 아이콘 자체의 크기나 추가 스타일이 필요하면 여기에 지정합니다.
    width: 20,
    height: 20,
  },
  cancelBtn: {
    width:220,
    height: 32,
  },
  cancelBtnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },
  textPopUpText: {
    marginBottom:20,
  },
});
