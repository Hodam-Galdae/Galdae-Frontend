
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    main: {
        flex: 1,
        position: 'relative',

    },
    header: {
        backgroundColor: theme.colors.white,
    },
    headerTitle: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    headerText: {
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        position: 'relative',
        padding: 18,
    },
    advertiseBox: {
        width: '100%',
        height: (80),
        borderRadius: theme.borderRadius.size10,
        backgroundColor: theme.colors.red,
        marginTop: (20),
    },
    borderedListBox: {
        width: '100%',
        padding: 20,
        borderColor: theme.colors.grayV2,
        borderRadius: theme.borderRadius.size12,
        borderWidth: 1,
        flexDirection: 'row',
        gap: (30),
    },
    menuContainer: {
        flexDirection: 'column',
        gap: (15),
        alignItems: 'flex-start',
    },
    menuText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV3,
        textAlign: 'center',
        lineHeight: (25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    galdaeOwner: {
        fontSize: theme.fontSize.size16,
        color: theme.colors.blackV0,
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 10,
    },
    writeUserName: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV0,
        textAlign: 'center',
        lineHeight: (25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    fromContainer: {
        flexDirection: 'row',
        gap: (5),
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    fromMainLocation: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },
    fromSubLocation: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
    },
    fromToLine: {
        width: (20),
        alignItems: 'center',
    },
    tags: {
        flexDirection: 'row',
        gap: (4),
        marginTop: (16),
        alignItems: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: 180,
        //backgroundColor:theme.colors.Galdae,
        borderRadius: theme.borderRadius.size10,
        position: 'relative',
    },
    toBigPicIcon: {
        bottom: 10,
        right: 10,
        padding: 10,
        position: 'absolute',
        // backgroundColor:theme.colors.Galdae,
    },
    userInfo: {
        fontSize: theme.fontSize.size20,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 30,
    },
    profile: {
        width: 62,
        height: 62,
        borderRadius: 999,
        //backgroundColor:theme.colors.Galdae,
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
    },
    userInfoText: {
        marginLeft: 20,
        flexDirection: 'column',
    },
    universityText: {
        fontSize: theme.fontSize.size12,
        color: theme.colors.grayV2,
        fontWeight: '500',
    },
    nameText: {
        fontSize: theme.fontSize.size18,
        fontWeight: '700',
        color: theme.colors.Galdae,
    },
    badge: {
        marginRight: 20,
    },
    userInfos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoBox: {
        width: '100%',
        minHeight: 110,
        justifyContent: 'flex-start',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderColor: theme.colors.grayV2,
        borderRadius: theme.borderRadius.size12,
        padding: 20,
    },
    messageText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV3,
        textAlign: 'center',
        lineHeight: (25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    participateContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        paddingHorizontal: 20,

    },
    participateBtn: {
        width: '100%',
        borderRadius: theme.borderRadius.size30,
        paddingVertical: 12,

    },
    participateText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },


});
