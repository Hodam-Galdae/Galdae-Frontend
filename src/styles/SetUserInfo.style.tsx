import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
    color: theme.colors.black,
    marginBottom: 20,
    marginTop: 30,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {
    position: 'relative',
    width: 68,
    height: 68,
  },
  profile: {
    width: 68,
    height: 68,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  camera: {
    width: 28,
    height: 28,
    backgroundColor: theme.colors.white,
    borderRadius: 999,
    position: 'absolute',
    bottom: -68,
    right: 0,
  },
});
