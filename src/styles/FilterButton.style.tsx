import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    filterBtn:{
        borderWidth:1,
        paddingHorizontal:moderateScale(8),
        paddingVertical:moderateScale(1),
        alignItems:'center',
        justifyContent:'center',
        height:moderateScale(22),
      },
      filterText:{
        marginBottom:moderateScale(3),
        fontWeight:'700',
        fontSize:theme.fontSize.size14,
      },
      filterIcon:{
        width:moderateScale(12),
        height:moderateScale(12),
      },
});
