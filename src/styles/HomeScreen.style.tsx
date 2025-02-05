
import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/ScreenScaler';

export default StyleSheet.create({
    container: {
      flex: moderateScale(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
    },
  });
