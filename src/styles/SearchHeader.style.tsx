import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.Galdae,
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
    // iOS 전용 그림자
    shadowColor: theme.colors.grayV1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android 전용 그림자
    elevation: 4,
    zIndex: 999,
  },

  backButton: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size30,
    paddingHorizontal: 12,
  },

  searchInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  searchIconInside: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
