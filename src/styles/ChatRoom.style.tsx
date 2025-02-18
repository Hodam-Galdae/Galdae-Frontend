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
});
