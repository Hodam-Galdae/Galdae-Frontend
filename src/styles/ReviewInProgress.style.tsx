import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    gradient: {
        width: 600,
        height: 439,
        borderRadius: 999,
        position: 'absolute',
        top: -255,
        left: '50%',
        transform: [{ translateX: -300 }],
    },
    title: {
        fontSize: theme.fontSize.size20,
        color: theme.colors.blackV0,
        marginTop: 130,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
    },
    ballon: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.Galdae,
    },
    alertWrapper: {
        alignItems: 'center',
    },
    ballonText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.white,
        fontWeight: '700',
        textAlign: 'center',
    },
    tri: {
        position: 'absolute',
        top: -10,
    },
    triWrapper: {
        width: 50,
        height: 50,
        marginBottom: 34,
    },
    alert: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.grayV1,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginBottom: 102,
    },
});
