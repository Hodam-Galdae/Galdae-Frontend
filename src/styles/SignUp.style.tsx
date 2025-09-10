import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
    // alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  headerStyle: {
    backgroundColor: theme.colors.white,
  },
  bar: {
    width: '100%',
    height: 7,
    backgroundColor: theme.colors.grayV0,
  },
  progress: {
    backgroundColor: theme.colors.Galdae,
    height: 7,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
