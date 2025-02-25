import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingRight: 15,
    },
    box: {
        width: 225,
        borderRadius: 10,
        backgroundColor: theme.colors.white,
        paddingBottom: 14,
    },
    backImage: {
        height: 84,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.brandColor,
        justifyContent: 'center',
        marginBottom: 14,
    },
    text: {
        color: theme.colors.black,
        fontSize: theme.fontSize.size16,
        fontWeight: 400,
        marginBottom: 20,
        paddingLeft: 16,
    },
    button: {
        borderRadius: 10,
        backgroundColor: theme.colors.gray0,
        paddingVertical: 10,
        marginHorizontal: 16,
    },
    buttonText: {
        color: theme.colors.gray2,
        fontSize: theme.fontSize.size16,
    },
    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 6,
    },
    userImage: {
        width: 28,
        height: 28,
        marginRight: 6,
    },
    userText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.black,
        fontWeight: '500',
    },
    timeText: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.gray1,
        fontWeight: '500',
        marginHorizontal: 6,
    },
    boxWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
