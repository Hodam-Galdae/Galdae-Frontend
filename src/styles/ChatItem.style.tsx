import { StyleSheet } from 'react-native';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingRight: 15,
    },
    messageContainer: {
        maxWidth: '80%',
        borderRadius: theme.borderRadius.size12,
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
        color: theme.colors.blackV0,
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
        color: theme.colors.blackV0,
        fontWeight: '500',
    },
    timeText: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.blackV3,
        fontWeight: '500',
        marginHorizontal: 6,
    },
    enterBox: {
        borderRadius: 999,
        backgroundColor: 'rgba(215, 215, 215, 0.50)',
        paddingVertical: 5,
        paddingHorizontal: 26,
        alignSelf: 'center',
        color: theme.colors.blackV3,
    },
    image: {
        width: 230,
        height: 306,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    unreadText: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.Galdae,
        fontWeight: '500',
        marginHorizontal: 6,
    },
    timeWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    timeWrapperRight:{
        alignItems: 'flex-end',
    },
});
