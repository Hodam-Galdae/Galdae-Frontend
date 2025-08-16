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
        marginTop: 40,
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
        fontSize: theme.fontSize.size20,
        fontWeight: '700',
        color: theme.colors.blackV0,
        marginTop: 30,
        marginBottom: 25,
    },
    selector: {
        marginBottom: 70,
    },
    subTitle: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV0,
        marginBottom: 20,
    },
    alert: {
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
        color: theme.colors.red,
        marginBottom: 4,
    },
    input: {
        borderWidth: 2,
        borderColor: theme.colors.grayV3,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        color: theme.colors.blackV0,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },
    verifyText: {
        width: '100%',
        textAlign: 'center',
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.grayV1,
        marginBottom: 20,
        marginTop: 20,
    },
    againText: {
        width: '100%',
        textAlign: 'center',
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.Galdae,
    }
});
