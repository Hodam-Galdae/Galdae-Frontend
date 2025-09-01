
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';
// import {} from '../utils/ScreenScaler';

import { theme } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        paddingLeft: 24,
        paddingTop: 30,
        paddingRight: 24,
        marginBottom: 100,
    },
    header: {
        backgroundColor: theme.colors.white,
    },
    generateButton: {
        width: screenWidth - 50,
        borderRadius: theme.borderRadius.size30,
        paddingVertical: 12,
        marginBottom: 40,
    },
    generateText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },
    warnText: {
        fontWeight: '500',
        color: theme.colors.red,
        fontSize: theme.fontSize.size12,
        marginTop: 10,
    },
    mainTitle: {
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
            android: 40,
        }),
    },
    title: {
        fontSize: theme.fontSize.size18,
        fontWeight: 'bold',
        color: theme.colors.blackV0,
        marginBottom: 12,
    },
    switchBtn: {
        width: 24,
        height: 24,
    },
    switchIcon: {
        width: 24,
        height: 24,
    },
    positionBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth - 50,
        marginBottom: 30,
    },
    buttonStyle: {
        borderWidth: 1,
        height: moderateScale(30),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.size30,
        marginBottom: 30,
    },
    positionIcon: {
        width: 14,
        height: 14,
        marginRight: 2,
    },
    timeBox: {
        width: '100%',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.grayV3,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        marginBottom: 30,
    },
    timeText: {
        fontSize: theme.fontSize.size18,
        color: theme.colors.blackV0,
        fontWeight: '500',
    },
    subTitle: {
        color: theme.colors.blackV3,
        fontSize: theme.fontSize.size14,
        marginBottom: 8,
    },
    additionalButton: {
        paddingHorizontal: 22,
        paddingVertical: 6,
        backgroundColor: theme.colors.grayV3,
        marginRight: 8,
    },
    additionalButtonText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.blackV3,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    selectBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    selectText: {
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
    },
    additionalIcon: {
        marginRight: 4,
        width: 12,
        height: 12,
    },
    personWrapper: {
        width: screenWidth - 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 27,

    },
    personBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personText: {
        fontSize: theme.fontSize.size18,
        color: theme.colors.blackV0,
        marginRight: 4,
        fontWeight: '700',
    },
    personSubText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.blackV3,
        fontWeight: '500',
    },
    messageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 12,
    },
    messageInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.grayV2,
        borderRadius: 12,
        width: screenWidth - 50,
        height: 170,
        flexShrink: 0,
        padding: 10,
        textAlignVertical: 'top',
        textAlign: 'left',
        marginBottom: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        lineHeight: 24,
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV3,
    },
    plusBtn: {
        width: 26,
        height: 26,
        backgroundColor: theme.colors.grayV0,
        borderRadius: 999,
    },
    plusIcon: {
        width: 16,
        height: 16,
    },
    numberText: {
        fontSize: theme.fontSize.size24,
        color: theme.colors.blackV0,
        marginHorizontal: 10,
    },
    oftenBox: {
        width: screenWidth - 50,
        height: 43,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.grayV3,
        borderRadius: 10,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    checkBtn: {
        marginLeft: 16,
        marginRight: 10,
    },
    checkText: {
        fontSize: theme.fontSize.size16,
        color: theme.colors.grayV1,
    },
});
