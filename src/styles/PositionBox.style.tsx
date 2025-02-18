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
        borderColor: '#F8F8F8',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
    },
    tag: {
        width: moderateScale(50),
        height: moderateScale(18),
        borderColor: theme.colors.brandColor,
        borderWidth: 1,
        color: theme.colors.brandColor,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: moderateScale(10),
        borderRadius: 999,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.black,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.gray1,
    },
});
