import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';
export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 102,
        backgroundColor: theme.colors.white,
        shadowColor: theme.colors.gray1,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
      },
      backContainer:{
        position: 'absolute',  // 절대 위치로 설정
        left: 20,
        bottom: 16,
      },
      logoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      notificationContainer: {
        position: 'absolute',  // 절대 위치로 설정
        right: 20,
        bottom: 16,
      },


});
