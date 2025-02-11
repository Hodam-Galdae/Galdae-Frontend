import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {

      },
      notiButton:{
        width:'100%',
        borderRadius:0,
        height: moderateScale(26),
      },
      notiText:{
        fontSize:14,
        fontWeight: '500',
      },
      startGaldae:{
        fontSize:18,
        fontWeight: '700',
      },
      startGaldaeEx:{
        fontSize:12,
        fontWeight: '500',
        color:theme.colors.gray1,
      },
      button: {
        width: moderateScale(50),
        height: moderateScale(36)
      }
});
