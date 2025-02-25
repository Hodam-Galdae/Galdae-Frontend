import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
        borderRadius: 10,
        backgroundColor: theme.colors.white,
    },
    text: {
      fontSize: theme.fontSize.size14,
      fontWeight: '400',
      color: theme.colors.gray2,
    },
    selectContainer: {
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropdown: {
      overflow: 'hidden',
    },
});
