import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
        // alignItems: 'center',
        backgroundColor: theme.colors.white,
    },
    bar: {
        width: '100%',
        height: 7,
        backgroundColor: theme.colors.gray0,
    },
    progress: {
        backgroundColor: theme.colors.brandColor,
        height: 7,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
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
    nextButton:{
        width: screenWidth - 30,
        borderRadius:theme.borderRadius.size10,
        height: 42,
        marginLeft: 15,
        marginBottom: 40,
    },
    nextText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },
});
