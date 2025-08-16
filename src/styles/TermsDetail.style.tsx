import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: theme.fontSize.size22,
    color: theme.colors.blackV0,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 30,
    color: theme.colors.blackV0,
    paddingLeft: 20,
  },
  sub: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.grayV2,
    marginBottom: 100,
    paddingHorizontal: 20,
  },
});
