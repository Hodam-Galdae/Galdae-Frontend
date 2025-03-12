import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';
export default StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 58,
      backgroundColor: theme.colors.white,
      // iOS 전용 그림자
      shadowColor: theme.colors.gray1,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      // Android 전용 그림자
      elevation: 4,
      zIndex:999,
    },
      backContainer:{
        position: 'absolute',  // 절대 위치로 설정
        left: 20,
        bottom: 13,
      },
      logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 13,
        alignItems: 'center',
        justifyContent: 'center',
      },
      notificationContainer: {
        position: 'absolute',  // 절대 위치로 설정
        right: 20,
        bottom: 13,
      },


});
