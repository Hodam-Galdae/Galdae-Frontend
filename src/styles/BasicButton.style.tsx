import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';

export default StyleSheet.create({
    buttonContainer: {
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(0),
        // width: moderateScale(345),
        // height: moderateScale(42),
      },
    buttonText:{
        fontSize:14,
        fontWeight: '500',
    },
    contentContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
});
