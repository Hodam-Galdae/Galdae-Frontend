import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  alertText: {
    fontSize: theme.fontSize.size12,
    fontWeight: '500',
    color: theme.colors.red,
    marginTop: 6,
    position: 'absolute',
    left: 0,
    bottom: 10,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
  subTitle: {
    fontSize: theme.fontSize.size16,
    color: theme.colors.black,
    fontWeight: '500',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 30,
    height: 42,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 42,
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
    paddingRight: 70,
    borderColor: theme.colors.lightGray,
    position: 'absolute',
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
  checkBtn: {
    position: 'absolute',
    right: 10,
    top: '50%', // 세로 중앙 정렬
    transform: [{translateY: -14}],
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    zIndex: 999,
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBtnText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.gray1,
  },
  genderBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  genderBtn: {
    width: 81,
    marginRight: 8,
  },
  bankContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    width: '100%',
    paddingLeft: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  bankSelector: {
    height: 42,
    marginBottom: 8,
  },
  bankText: {
    color: theme.colors.gray2,
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
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
