import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        width: moderateScale(146),
        height: moderateScale(112),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
    },
    tag: {
        width: moderateScale(50),
        height: moderateScale(18),
        borderColor: theme.colors.brandColor,
        borderWidth: 1,
        color: theme.colors.brandColor,
        fontSize: theme.fontSize.size14,
        marginBottom: moderateScale(12),
    },
    title: {
        fontSize: theme.fontSize.size18,
        //marginBottom: (4),
        fontWeight: '700',
        lineHeight: (22), // 예시 값
    },
    subTitle: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.gray1,
        lineHeight: (22), // mainPosName과 동일하게 지정
    },
});
