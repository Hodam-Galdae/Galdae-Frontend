import {StyleSheet} from 'react-native';
import {theme} from '../styles/theme';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 99,
    paddingHorizontal: 18,
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: theme.fontSize.size14,
    color: theme.colors.blackV0,
    fontWeight: '500',
  },
});
