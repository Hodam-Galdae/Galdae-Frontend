import { StyleSheet } from 'react-native';
import {} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        borderRadius: (10),
        borderWidth: (1),
      },
      text: {
        fontSize:theme.fontSize.size14,
        fontWeight: '500',
      },
});
