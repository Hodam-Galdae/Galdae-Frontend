import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: theme.colors.white,
    },

    title: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.black,
        paddingLeft: 15,
    },
    subTitle: {
        marginTop: 50,
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.gray2,
        paddingLeft: 15,
    },
    agreeBtnWrapper: {
        width: screenWidth - 30,
        marginLeft: 15,
        height: 43,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
    },
    agreeBtn: {
        marginLeft: 16,
        marginRight: 10,
    },
    agreeText: {
        fontSize: theme.fontSize.size16,
        fontWeight: '500',
        color: theme.colors.gray1,
    },
});
