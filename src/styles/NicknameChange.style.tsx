
import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        backgroundColor: theme.colors.white,
    },
    headerText: {
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
            android: 40,
        }),
    },
    subTitle: {
        fontSize: theme.fontSize.size18,
        fontWeight: '700',
        color: theme.colors.blackV0,
        marginBottom: 8,
    },
    content: {
        paddingHorizontal: 15,
        paddingTop: 12,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
    },
    generateButton: {
        width: '100%',
        borderRadius: theme.borderRadius.size30,
        height: 42,
        marginBottom: 40,
    },
    generateText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '700',
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 10,
        height: 46,
        width: '100%',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 42,
        paddingLeft: 20,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        paddingRight: 70,
        borderColor: theme.colors.grayV2,
        position: 'absolute',
        fontSize: theme.fontSize.size14,
        color: theme.colors.gray2,
        fontWeight: '500',

        ...Platform.select({
          android: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          },
        }),
    },
    redText: {
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
        color: theme.colors.red,
    },
    checkBtn: {
        position: 'absolute',
        right: 10,
        top: '50%', // 세로 중앙 정렬
        transform: [{ translateY: -14 }],
        backgroundColor: theme.colors.grayV3,
        borderRadius: 8,
        zIndex: 999,
        width: 80,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBtnText: {
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.gray2,
    },
    alertText: {
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
        color: theme.colors.red,
        marginTop: 6,
    },
    subTitle2: {
        fontSize: theme.fontSize.size18,
        fontWeight: '700',
        color: theme.colors.blackV0,
        marginBottom: 8,
        marginTop: 30,
    },
    alertText2: {
        fontSize: theme.fontSize.size12,
        fontWeight: '500',
        color: theme.colors.blue,
        marginTop: 6,
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
});
