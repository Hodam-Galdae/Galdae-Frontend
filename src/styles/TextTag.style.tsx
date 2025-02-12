import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';

export default StyleSheet.create({
    container: {
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
      },
      text: {
        fontSize: 12,
        fontWeight: '500',
      },
});
