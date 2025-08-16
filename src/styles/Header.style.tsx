import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {theme} from '../styles/theme';
export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: theme.colors.Galdae,
    // iOS 전용 그림자
    shadowColor: theme.colors.grayV1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingHorizontal: 20,
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
  logoContainer: {
    height: 30,
  },
  notificationContainer: {
    width: 30,
    height: 30,
  },
});
