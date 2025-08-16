import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  allImagesImage: {
    width: '100%',
    height: 270,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.blackV0,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 244,
    borderRadius: 4,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  btnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.blackV0,
  },
});
