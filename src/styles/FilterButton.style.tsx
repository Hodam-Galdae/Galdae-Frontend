import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    filterBtn:{
        borderWidth:1,
        paddingHorizontal:8,
        paddingVertical:1,
        alignItems:'center',
        justifyContent:'center',
        height:22,
      },
      filterText:{
        marginBottom:3,
        fontWeight:'700',
        fontSize:theme.fontSize.size14,
      },
      filterIcon:{
        width:12,
        height:12,
      },
});
