import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    input: {
        //width: '90%',
        height: moderateScale(40),
        borderWidth: moderateScale(2),
        borderColor: theme.colors.lightGray,
        paddingHorizontal:moderateScale(12) ,
        borderRadius: moderateScale(10),
        fontSize: moderateScale(14),
        fontWeight:'500',
      },
});
