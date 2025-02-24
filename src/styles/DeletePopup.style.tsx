import { StyleSheet,Platform } from 'react-native';
//import {  } from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.popupBackGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUp: {
    width:250,
    height: 152,
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS용 섀도우
    shadowColor: 'rgba(156, 156, 156, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    // Android용 섀도우 (elevation은 spread를 직접 지원하지 않습니다)
    elevation: 4,
  },
  createGaldae:{
    width:270,
    height: 225,
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS용 섀도우
    shadowColor: 'rgba(156, 156, 156, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    // Android용 섀도우 (elevation은 spread를 직접 지원하지 않습니다)
    elevation: 4,
  },
  textPopUpcontent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height:150,
    position:'absolute',
  },
  createPopUpcontent:{
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
    height:169,
    position:'absolute',
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
  cancelContainer:{
    width:220,
    height: 32,
    position:'absolute',
    bottom:25,
  },
  cancelBtn: {
    width:220,
    height: 32,
  },
  cancelBtnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },
  titleText:{
    fontWeight: '500',
  },
  textPopUpText: {
    marginBottom:20,
    fontWeight: '500',
  },
  timeText:{
    fontSize:theme.fontSize.size10,
    fontWeight:'500',
  },
  departureText:{
    fontSize:theme.fontSize.size18,
    fontWeight:'700',
    marginBottom: Platform.select({
      android: 5,
    }),
  },
  positionContainer:{
    flexDirection:'row',
    gap:4,
    marginTop:10,
    marginBottom:26,
    alignItems:'center',
  },

});
