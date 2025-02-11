import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    input: {
        //width: '90%',
        height: moderateScale(40),
        borderWidth: moderateScale(1),
        borderColor: theme.colors.disabledBg,
        paddingHorizontal:moderateScale(10) ,
        borderRadius: moderateScale(10),
        fontSize: moderateScale(14),
      },
});
