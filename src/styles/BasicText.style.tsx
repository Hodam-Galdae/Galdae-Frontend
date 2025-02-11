import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
//import {theme} from '../styles/theme';

export default StyleSheet.create({
    text: {
        //color: theme.colors.text,
        marginVertical: moderateScale(8),
        fontSize: moderateScale(14),
      },
});
