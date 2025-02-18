import { StyleSheet, Dimensions } from 'react-native';
import {theme} from '../styles/theme';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        width: width - 30,
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
        borderRadius: 10,
        paddingLeft: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 87,
    },
    wrapper: {
        width: '100%',
        paddingRight: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 12,
        color: theme.colors.gray1,
        fontWeight: '500',
        marginBottom: 2,
    },
    message: {
        width: 24,
        height: 18,
        backgroundColor: theme.colors.brandColor,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.size10,
        fontWeight: '700',
    },
    locationWrapper: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.black,
        marginRight: 3.5,
    },
    locationIcon: {
        marginTop: 2,
        width: 16,
        height: 16,
        marginRight: 4,
    },
    arrowIcon: {
        marginTop: 3,
        width: 14,
        height: 14,
        marginRight: 3.5,
    },
    personWrapper: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    personIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    personText: {
        fontSize: 12,
        color: theme.colors.gray1,
        fontWeight: '500',
    },

});
