import { StyleSheet } from 'react-native';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingRight: 15,
    },
    messageContainer: {
        maxWidth: '80%',
        borderRadius: 10,
        padding: 15,
        backgroundColor: theme.colors.white,
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    messageText: {
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.black,
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
        borderRadius: 999,
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
    enterBox: {
        backgroundColor: theme.colors.gray0,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 26,
        alignSelf: 'center',
        color: theme.colors.gray2,
    },
    image: {
        width: 230,
        height: 306,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    unreadText: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.brandColor,
        fontWeight: '500',
        marginHorizontal: 6,
    },
});
