import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {theme} from '../styles/theme';
export default StyleSheet.create({
  mainTabContainer: {
    flexDirection: 'column',
    backgroundColor: theme.colors.Galdae,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 32,
    borderBottomLeftRadius: theme.borderRadius.size30,
    borderBottomRightRadius: theme.borderRadius.size30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.Galdae,

    // iOS 전용 그림자
    shadowColor: theme.colors.grayV1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android 전용 그림자
    elevation: 4,
    zIndex: 999,
    ...(Platform.OS === 'ios' && {
      paddingTop: 20,
    }),
  },

  backContainer: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    height: 30,
  },
  notificationContainer: {
    width: 30,
    height: 30,
  },
  mainTitle: {
    fontSize: theme.fontSize.size22,
    fontWeight: 'bold',
    color: theme.colors.white,
    lineHeight: Platform.select({
      android: 40,
    }),
  },
  universityName: {
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
    color: theme.colors.white,
    paddingBottom: 4,
  },
  universityLocation: {
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
    color: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.size30,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
});
