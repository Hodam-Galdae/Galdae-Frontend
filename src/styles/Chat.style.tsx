import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  noData: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sectionHeader: {
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
  },
  sectionTitle: {
    fontSize: theme.fontSize.size18,
    fontWeight: '700',
    color: theme.colors.blackV0,
  },
});
