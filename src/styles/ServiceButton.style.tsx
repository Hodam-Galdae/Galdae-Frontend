import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    serviceButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
    },
    serviceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 62,
        height: 62,
        backgroundColor: theme.colors.grayV3,
        borderRadius: 99,
    },
    serviceIcon: {
        width: 32,
        height: 32,
    },
    serviceButtonText: {
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.blackV0,
        textAlign: 'center',
    },
});
