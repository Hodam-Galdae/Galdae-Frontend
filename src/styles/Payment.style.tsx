
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    container:{
        height:'100%',
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    content:{
        paddingHorizontal:15,
        paddingTop:12,
        flex: 1,

        backgroundColor: theme.colors.white,
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
    },
    hasAccountContainer:{
      width:275,
      height:145,
      backgroundColor:theme.colors.sub2,
      borderRadius:theme.borderRadius.size10,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      marginTop:40,
      marginBottom:40,
    },
    bankContainer:{
      flexDirection:'row',
    },
    accountContainer:{
      width:275,
      height:145,
      backgroundColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      marginTop:40,
      marginBottom:40,
    },
    addContainer:{
      width:30,
      height:30,
      borderRadius:999,
      backgroundColor:theme.colors.white,
      justifyContent:'center',
      alignItems:'center',
    },
    btns:{
      flexDirection:'row',
      justifyContent:'center',
      marginBottom:30,
      gap:4,
    },
    btn:{
      paddingHorizontal:22.5,
      paddingVertical:11,

    },
    text:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
    },
    settleText:{
      fontSize:theme.fontSize.size20,
      fontWeight:'700',
      marginBottom:10,
    },
});
