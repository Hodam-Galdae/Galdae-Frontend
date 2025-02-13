import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    buttonContainer: {
        borderRadius:theme.borderRadius.size10,
        borderWidth: moderateScale(0),
        // width: moderateScale(345),
        // height: moderateScale(42),
      },
    buttonText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '500',
    },
    contentContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 필요에 따라 가운데 정렬
    },
});
