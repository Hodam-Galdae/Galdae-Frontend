import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    headerStyle: {
        backgroundColor: theme.colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: theme.fontSize.size20,
        fontWeight: '700',
        color: theme.colors.blackV0,
        alignSelf: 'center',
    },
    nextButton: {
        marginTop: 100,
        width: 230,
        borderRadius: theme.borderRadius.size12,
        height: 48,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.grayV0,
    },
    nextText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        alignSelf: 'center',
        color: theme.colors.blackV0,
    },
    mainButton: {
        width: 230,
        marginTop: 10,
        // width: '100%',
        borderRadius: theme.borderRadius.size12,
        height: 48,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: theme.colors.grayV0,
        borderWidth: 1,
        borderColor: theme.colors.grayV0,
    },
    mainText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        alignSelf: 'center',
        color: theme.colors.blackV0,
    },
});
