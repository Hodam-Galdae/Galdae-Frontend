
import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    container: {
        height: '100%',
    },
    headerText: {
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
            android: 40,
        }),
    },
    headerStyle: {
        backgroundColor: theme.colors.white,
    },
    content: {
        paddingHorizontal: 15,
        paddingTop: 30,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    title: {
        fontSize: theme.fontSize.size20,
        fontWeight: '700',
    },
    warnTexts: {
        marginTop: 18,
    },
    warnText: {
        color: theme.colors.blackV3,
        fontWeight: '500',
    },
    surveyBtnContainer: {
        gap: 10,
        marginTop: 32,
    },
    surveyBtnIcon: {
        width: 20,
        height: 20,
        backgroundColor: theme.colors.grayV3,
        borderRadius: 999,
        position: 'absolute',
        left: 16,
        bottom: 10,
    },
    surveyBtnIconChecked: {
        width: 20,
        height: 20,
        backgroundColor: theme.colors.blue,
        borderRadius: 999,
        position: 'absolute',
        left: 16,
        bottom: 10,
    },

    surveyIconAnchor: {
        position: 'absolute',
        left: 16,
        bottom: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    surveyIconDot: {
        width: 20,
        height: 20,
        borderRadius: 999,
        backgroundColor: theme.colors.grayV3,
    },
    // SVGButton을 쓸 경우(옵션)
    iconButton: {
        position: 'absolute',
        left: 16,
        bottom: 10,
        width: 20,
        height: 20,
        padding: 0,          // 내부 여백 제거 (SVGButton 구현에 따라 필요)
        alignItems: 'center',
        justifyContent: 'center',
    },
    surveyBtn: {
        width: '100%',
        borderRadius: theme.borderRadius.size12,
        height: 42,
        paddingHorizontal: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayV0,
        position: 'relative',
    },
    surveyBtnIcon2: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    surveyBtnText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV1,
    },
    margin: {
        marginTop: 20,
    },
    logoutBtnContainer: {
        alignSelf: 'center',
        position: 'absolute',
        width: '100%',
        gap: 10,
        bottom: 40,
    },
    logoutBtn: {
        width: '100%',
        borderRadius: theme.borderRadius.size30,
        height: 42,
        borderWidth: 2,
    },
    logoutText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },
});
