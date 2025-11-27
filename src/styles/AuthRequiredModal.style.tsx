import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUp: {
    width: 280,
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'relative',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUpcontent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  cancelIcon: {
    width: 20,
    height: 20,
  },
  textPopUpTitle: {
    fontWeight: '700',
    letterSpacing: -0.36,
    marginBottom: 10,
    textAlign: 'center',
  },
  textPopUpText: {
    fontWeight: '400',
    letterSpacing: -0.28,
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 20,
  },
  confirmBtn: {
    width: 240,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
  },
  confirmBtnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '500',
  },
});
