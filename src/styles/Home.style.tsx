import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      },
      title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        marginBottom: moderateScale(16),
      },
      subtitle: {
        fontSize: moderateScale(18),
        color: '#333',
      },
      button: {
        width: moderateScale(50),
        height: moderateScale(36)
      }
});
