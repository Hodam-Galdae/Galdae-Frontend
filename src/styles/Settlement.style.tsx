import {StyleSheet} from 'react-native';
import {theme} from '../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
  },
  account: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.Galdae2,
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 10,
    flexDirection: 'row',
  },
  accountIcon: {
    marginRight: 3,
  },
  accountText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '400',
    color: theme.colors.blackV0,
    textDecorationLine: 'underline',
  },
  costTitle: {
    fontSize: theme.fontSize.size28,
    fontWeight: '700',
    color: theme.colors.blackV0,
    marginBottom: 4,
  },
  costSubTitle: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.grayV2,
    marginBottom: 15,
  },
  galleryBtn: {
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: theme.colors.grayV3,
  },
  galleryIcon: {
    marginRight: 4,
  },
  galleryText: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    backgroundColor: theme.colors.grayV0,
    height: 1,
    opacity: 0.5,
    marginBottom: 30,
  },
  allCostText: {
    color: theme.colors.Galdae,
    fontSize: theme.fontSize.size14,
    fontWeight: '700',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 26,
  },
  userIcon: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  userText: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    marginRight: 19,
  },
});
