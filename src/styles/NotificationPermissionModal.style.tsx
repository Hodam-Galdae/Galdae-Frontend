import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPopUp: {
    width: 300,
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
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    width: 260,
  },
  laterBtn: {
    width: 126,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
  },
  laterBtnText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
  confirmBtn: {
    width: 126,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
  },
  confirmBtnFullWidth: {
    width: 260,
  },
  confirmBtnText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
});
