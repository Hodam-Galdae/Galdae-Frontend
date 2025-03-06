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
        borderColor: theme.colors.lightGray,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 20,
    },
    tag: {
        borderColor: theme.colors.brandColor,
        borderWidth: 1,
        color: theme.colors.brandColor,
        fontSize: theme.fontSize.size14,
        marginBottom: 12,
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
        color: theme.colors.gray1,
        lineHeight: (22), // mainPosName과 동일하게 지정
    },
});
