import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        width: 146,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.grayV3,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 20,
    },
    tag: {
        borderWidth: 0,
        color: theme.colors.GaldaeDark,
        backgroundColor: theme.colors.yellow2,
        fontSize: theme.fontSize.size14,
        marginBottom: 12,
        paddingVertical:6,
    },
    tagText: {
        color: theme.colors.GaldaeDark,
        fontSize: theme.fontSize.size14,
    },
    tagDestination: {
        borderWidth: 0,
        color: theme.colors.blue,
        backgroundColor: theme.colors.Galdae3,
        fontSize: theme.fontSize.size14,
        marginBottom: 12,
        paddingVertical:6,
    },
    tagDestinationText: {
        color: theme.colors.blue,
        fontSize: theme.fontSize.size14,

    },
    title: {
        fontSize: theme.fontSize.size18,
        //marginBottom: (4),
        fontWeight: '700',
        lineHeight: (22), // 예시 값
    },
    subTitle: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.blackV3,
        lineHeight: (22), // mainPosName과 동일하게 지정
    },
});
