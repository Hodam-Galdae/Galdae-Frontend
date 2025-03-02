
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
    },
    title: {
        color: theme.colors.black,
        fontSize: theme.fontSize.size22,
        fontWeight: '900',
        textAlign: 'center',
    },
    logo: {
        position: 'absolute',
        zIndex: 999,
        bottom: 50,
    },
    hand1: {
        position: 'absolute',
        zIndex: 999,
    },
    hand2: {
        position: 'absolute',
        transform: [{scaleX: -1}, {rotate: '-75.48deg'}],
    },
});
