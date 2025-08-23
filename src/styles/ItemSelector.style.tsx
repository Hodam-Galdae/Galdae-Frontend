import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.grayV2,
    borderRadius: theme.borderRadius.size12,
    backgroundColor: theme.colors.white,
  },
  text: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.blackV3,
    width: '80%',
  },
  selectContainer: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dropdown: {
    overflow: 'hidden',
  },
});
