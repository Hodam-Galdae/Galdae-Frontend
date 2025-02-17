import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        width: 146,
        height: 112,
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
        borderColor: theme.colors.brandColor,
        borderWidth: 1,
        color: theme.colors.brandColor,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        borderRadius: 999,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.black,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.gray1,
    },
});
