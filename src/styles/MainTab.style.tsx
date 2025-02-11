import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';

export default StyleSheet.create({
    logo:{
        width: moderateScale(120), // 원하는 크기로 조정하세요.
        height: moderateScale(40),
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom:moderateScale(14),
        alignItems: 'center',
    },
    notification:{
        marginRight: moderateScale(20),
    },
});
