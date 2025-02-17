import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';
export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 102,
        backgroundColor: theme.colors.white,
      },
      logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom:14,
      },
      notificationContainer: {
        position: 'absolute',  // 절대 위치로 설정
        right: 10,
        bottom: 6,
      },
      test:{

      },

});
