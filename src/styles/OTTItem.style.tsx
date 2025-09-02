
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({

    borderedListBox: {
        width: '100%',
        borderColor: theme.colors.grayV2,
        borderRadius: theme.borderRadius.size12,
        borderWidth: 1,
        paddingStart: 15,
        paddingEnd: 15,
        paddingBottom: 18,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    borderedListBoxComplete: {
        width: '100%',
        borderColor: theme.colors.grayV3,
        borderRadius: theme.borderRadius.size10,
        backgroundColor: theme.colors.grayV3,
        borderWidth: 1,
        paddingStart: 15,
        paddingEnd: 15,
        paddingBottom: 18,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    galdaeOwner: {
        fontSize: theme.fontSize.size12,
        fontWeight: '700',
    },
    galdaeOwnerCom: {
        fontSize: theme.fontSize.size12,
        fontWeight: '700',
        color: theme.colors.grayV2,
    },
    fromToContainer: {
        flexDirection: 'row',
        gap: (4),
        marginTop: (12),
        alignItems: 'center',
    },
    fromContainer: {
        flexDirection: 'row',
        gap: (4),
        width: '40%',
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },
    toContainer: {
        flexDirection: 'row',
        gap: (4),
        alignItems: 'center',
        width: '40%',
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },
    fromMainLocation: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
        color: theme.colors.blackV1,
    },
    fromMainLocationCom: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
        color: theme.colors.blackV3,
    },
    fromSubLocation: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV2,
    },
    fromSubLocationCom: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV3,
    },
    departureTimeContainer: {
        flexDirection: 'row',
        gap: (4),
        marginTop: (4),
        alignItems: 'center',
    },
    departureTimeTitle: {
        color: theme.colors.GaldaeDark,
        fontWeight: '700',
        fontSize: theme.fontSize.size14,
    },
    departureTimeTitleCom: {
        color: theme.colors.blackV3,
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
    },
    departureTime: {
        color: theme.colors.grayV0,
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
    },
    departureTimeCom: {
        color: theme.colors.grayV0,
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
    },
    passengerTimeContainer: {
        flexDirection: 'row',
        gap: (6),
        marginTop: (6),
        alignItems: 'center',

    },

    fromToLine: {
        width: (20),
        height: (20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    passengerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tags: {
        flexDirection: 'row',
        gap: (4),
        alignItems: 'center',
    },

    timeContainer: {
        flexDirection: 'row',
        gap: (8),
        marginTop: (6),
        alignItems: 'center',
    },
    timePossible: {
        backgroundColor: theme.colors.blue2,
        borderWidth: 0,
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    timePossibleCom: {
        backgroundColor: theme.colors.grayV2,
        borderColor: theme.colors.grayV2,
        borderWidth: 0,
    },
    timeNotPossible: {
        backgroundColor: theme.colors.grayV2,
        borderColor: theme.colors.grayV2,
        borderWidth: 0,
    },
    timePossibleText: {
        color: theme.colors.blue,
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
    },
    timePossibleTextCom: {
        color: theme.colors.white,
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
    },
    timeNotPossibleText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
    },

    typeContainer: {
        flexDirection: 'row',
        marginTop: (12),
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    typePossible: {
        backgroundColor: theme.colors.yellow2,
        borderWidth: 0,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    typePossibleText: {
        color: theme.colors.Galdae,
        fontSize: theme.fontSize.size12,
        fontWeight: '700',
    },
});
