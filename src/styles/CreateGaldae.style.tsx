import { StyleSheet } from 'react-native';
// import {} from '../utils/ScreenScaler';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    }
});
