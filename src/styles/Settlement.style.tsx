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
  header: {
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: theme.fontSize.size22,
    color: theme.colors.blackV0,
    fontWeight: '700',
  },
  account: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.blue2,
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
    color: theme.colors.gray2,
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
    textDecorationLine: 'underline',
  },
  userRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
  },
  userIcon: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 18,
  },
  userText: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    marginRight: 19,
  },
  userName: {
    flex: 1,
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
  },
  userCost: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
    textAlign: 'right',
  },
  notificationBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.yellow2,
    borderRadius: 15,
  },
  notificationText: {
    color: theme.colors.Galdae,
    fontSize: theme.fontSize.size12,
    fontWeight: '600',
  },
});
