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
    height: 300,
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  title: {
    fontSize: theme.fontSize.size18,
    color: theme.colors.black,
    fontWeight: '700',
    marginBottom: 10,
    width: '100%',
    marginTop: 30,
  },
});
