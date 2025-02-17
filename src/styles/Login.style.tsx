import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    allImagesImage: {
        width: '100%',
        height: 270,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: theme.colors.black,
    },
    textWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});
