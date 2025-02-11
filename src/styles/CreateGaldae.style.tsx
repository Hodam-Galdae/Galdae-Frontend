import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        paddingLeft: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        paddingBottom: moderateScale(12),
    }
});
