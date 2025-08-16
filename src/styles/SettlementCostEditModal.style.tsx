import {StyleSheet} from 'react-native';
//import {  } from '../utils/ScreenScaler';
import {theme} from './theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUp: {
    width: 250,
    // height: 208,
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  // 취소 아이콘은 터치 영역을 위해 wrapper로 사용합니다.
  cancelIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cancelIcon: {
    // 아이콘 자체의 크기나 추가 스타일이 필요하면 여기에 지정합니다.
    width: 20,
    height: 20,
  },
  title: {
    fontSize: theme.fontSize.size16,
    color: theme.colors.blackV0,
    fontWeight: '500',
    marginBottom: 21,
    width: '100%',
    marginTop: 37,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: theme.colors.grayV0,
    borderBottomWidth: 2,
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size22,
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 4,
  },
  btn: {
    backgroundColor: theme.colors.Galdae,
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  btnText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    paddingVertical: 10,
  },
});
