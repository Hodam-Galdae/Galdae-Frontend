import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPopUp: {
        width: 255,
        height: 188,
        position: 'relative',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.size12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPopUpTitle: {
        fontWeight: '500',
        letterSpacing: -0.32,
        marginBottom: 36,
    },
    textPopUpcontent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
    },
    cancelIconWrapper: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    cancelIcon: {
        // 아이콘 자체의 크기나 추가 스타일이 필요하면 여기에 지정합니다.
        width: 20,
        height: 20,
    },
    cancelBtn: {
        width: 220,
        height: 40,
        borderRadius: 999,
    },
    cancelBtnText: {
        fontSize: theme.fontSize.size18,
        fontWeight: '700',
        letterSpacing: -0.32,
    },
    textPopUpText: {
        marginBottom: 20,
    },

});
