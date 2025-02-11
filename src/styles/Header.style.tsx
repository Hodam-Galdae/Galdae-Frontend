import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';
export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: moderateScale(102),
        backgroundColor: theme.colors.white,
      },
      logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom:moderateScale(14),
      },
      notificationContainer: {
        position: 'absolute',  // 절대 위치로 설정
        right: moderateScale(10),
        bottom: moderateScale(6),
      },
      test:{

      },

});
