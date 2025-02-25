import { StyleSheet } from 'react-native';
import {} from '../utils/ScreenScaler';

export default StyleSheet.create({
    logo:{
        width: (120), // 원하는 크기로 조정하세요.
        height: (40),
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom:(14),
        alignItems: 'center',
    },
    notification:{
        marginRight: (20),
    },
});
