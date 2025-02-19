import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: theme.colors.lightGray,
    },
    list: {
        flex: 1,
        paddingLeft: 15,
    },
    addBtn: {
        width: 30,
        height: 30,
        backgroundColor: theme.colors.brandSubColor,
        marginRight: 10,
        borderRadius: 999,
    },
    sendBtn: {
        width: 34,
        height: 34,
        backgroundColor: theme.colors.brandColor,
        marginLeft: 12,
        borderRadius: 999,
    },
    input: {
        flex: 1,
        height: 'auto',
        flexWrap: 'wrap',
        borderRadius: 10,
        backgroundColor: '#E9E9E9',
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.black,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        width: '100%',
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
