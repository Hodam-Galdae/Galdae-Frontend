import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
      },
      text: {
        fontSize:theme.fontSize.size14,
        fontWeight: '500',
      },
});
