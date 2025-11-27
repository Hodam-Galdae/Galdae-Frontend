import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: theme.colors.grayV2,
        borderRadius: 10,
        paddingLeft: 15,
        justifyContent: 'space-between',
        height: 74,
        marginBottom: 10,

    },
    iconLocationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        height: '100%',
        flex: 1,
        overflow: 'hidden',
    },
    taxiIcon: {
        fontSize: 12,
        width: 42,
        height: 42,
    },
    inactiveText: {
        color: theme.colors.blackV2,
    },
    inactiveText2: {
        color: theme.colors.blackV3,
    },
    message: {
        width: 24,
        height: 18,
        backgroundColor: theme.colors.Galdae,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.size10,
        fontWeight: '700',
    },
    locationWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    locationStartWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        maxWidth: '45%',
        overflow: 'hidden',
    },
    locationEndWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        maxWidth: '45%',
        overflow: 'hidden',
    },
    locationText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.blackV0,
        marginRight: 4,
    },
    locationSubText: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.blackV1,
    },
    locationIcon: {
        marginTop: 2,
        width: 16,
        height: 16,
        marginRight: 4,
    },
    arrowIcon: {
        marginTop: 3,
        width: 14,
        height: 14,
        marginRight: 3.5,
    },
    chatWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    lastChat: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.blackV1,
    },
    inactiveLastChatText: {
        color: theme.colors.blackV3,
    },
    chatInfoWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden',
    },
    personWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'flex-end',
        marginRight: 15,
        height: '100%',
    },
    personIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    personText: {
        fontSize: 14,
        color: theme.colors.blackV3,
        fontWeight: '500',
    },

});
