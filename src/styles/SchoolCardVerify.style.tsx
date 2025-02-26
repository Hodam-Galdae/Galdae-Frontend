import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
    },
    nextButton: {
        width: '100%',
        borderRadius: theme.borderRadius.size10,
        height: 42,
        marginBottom: 40,
    },
    nextText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.black,
        marginTop: 30,
        marginBottom: 14,
    },
    alertText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.gray1,
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.black,
        marginBottom: 20,
    },
    alert: {
        fontSize: 12,
        fontWeight: '500',
        color: theme.colors.red,
        marginBottom: 30,
    },
    exContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    exWrapper: {
        alignItems: 'center',
    },
    exImage: {
        marginBottom: 10,
    },
    exTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.black,
        marginBottom: 2,
    },
    exSubTitle: {
        fontSize: 12,
        fontWeight: '500',
        color: theme.colors.gray2,
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    svgBtn: {
        width: 70,
        height: 70,
        borderRadius: 999,
        marginRight: 12,
        backgroundColor: theme.colors.lightGray,
    },
});
