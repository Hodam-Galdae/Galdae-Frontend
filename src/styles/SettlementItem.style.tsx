
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    dateContainer:{
      flexDirection:'row',
      marginBottom:8,
      marginTop:10,
    },
    settleContainer:{
      width:'100%',
      paddingHorizontal:16,
      height:68,
      backgroundColor:theme.colors.grayV3,
      borderRadius:theme.borderRadius.size10,
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',
    },
    locationContainer:{
      flexDirection:'row',
      alignItems:'center',
      gap:4,
      height: Platform.select({
        android: 20,
      }),
    },
    position:{
      fontSize:theme.fontSize.size18,
      fontWeight:'700',
      bottom: Platform.select({
        android: 2,
      }),
    },
    dateText:{
      color:theme.colors.blackV0,
    },
    bankContainer:{
      alignItems:'flex-end',
    },
    settleText:{
      fontSize:theme.fontSize.size20,
      fontWeight:'700',
    },
    accountText:{
      fontSize:theme.fontSize.size12,
    },
});
