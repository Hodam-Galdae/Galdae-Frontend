import { StyleSheet } from 'react-native';
import { theme } from './theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.grayV2,
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.gray2,
    marginHorizontal: 12,
  },
});

export default styles;
