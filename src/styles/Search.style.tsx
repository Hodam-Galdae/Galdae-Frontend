import { StyleSheet } from 'react-native';
import {} from '../utils/ScreenScaler';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: (10),
        width: '100%',
      },
      input: {
        width: '100%',
        height: (40),
        borderRadius: theme.borderRadius.size10,
        borderWidth: 2,
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.gray2,
      },
      button: {
        position: 'absolute',
        right: (20),
        bottom: (10),
      },
      icon: {
        width: (18),
        height: (18),
      },
});
