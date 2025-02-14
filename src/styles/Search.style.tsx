import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: moderateScale(10),
        width: '100%',
      },
      input: {
        width: '100%',
        height: moderateScale(40),
        borderRadius: theme.borderRadius.size10,
        borderWidth: 2,
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.gray2,
      },
      button: {
        position: 'absolute',
        right: moderateScale(20),
        bottom: moderateScale(10),
      },
      icon: {
        width: moderateScale(18),
        height: moderateScale(18),
      },
});
