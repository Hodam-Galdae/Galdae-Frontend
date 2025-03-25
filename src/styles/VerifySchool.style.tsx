import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
  },
  nextButton: {
    marginTop: 40,
    width: '100%',
    borderRadius: theme.borderRadius.size10,
    height: 42,
    marginBottom: 40,
  },
  nextText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
  },
  title: {
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
    color: theme.colors.black,
    marginTop: 30,
    marginBottom: 12,
  },
  selector: {
    // marginBottom: 70,
  },
  selectorBox: {
    height: 55,
  },
  verifyContainer: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: '100%',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  verifyTitle: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.black,
    marginBottom: 6,
  },
  verifyContent: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.gray2,
    marginBottom: 8,
  },
  verifyAlert: {
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
    color: theme.colors.black,
  },
  alert: {
    color: theme.colors.red,
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
    marginTop: 8,
    position: 'absolute',
    bottom: -10,
    left: 0,
  },
});
