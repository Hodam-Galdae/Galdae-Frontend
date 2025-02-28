import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
  },

  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.black,
  },
  subTitle: {
    marginTop: 50,
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.gray2,
  },
  agreeBtnWrapper: {
    width: '100%',
    height: 43,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
  },
  agreeBtn: {
    marginLeft: 16,
    marginRight: 10,
  },
  agreeText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    color: theme.colors.gray1,
  },
  agreeWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  agreeDetailText: {
    color: theme.colors.gray2,
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  agreeIcon: {
    marginRight: 8,
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
});
