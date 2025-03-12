
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
    gradient:{
      borderRadius: 10,
      //padding: 2, // 그라데이션 border 두께
      width: 286,
      height: 156,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      marginTop:40,
      marginBottom:40,
    },
    hasAccountContainer:{
      width:282,
      height:152,
      backgroundColor:theme.colors.sub2,
      borderRadius:theme.borderRadius.size10,
      borderWidth:0,
      gap:14,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
    },
    bankContainer:{
      flexDirection:'row',
      alignItems:'center',
      gap:8,
    },
    bankText:{
      fontSize:theme.fontSize.size20,
      fontWeight:'500',
    },
    accountText:{
      fontSize:theme.fontSize.size22,
      fontWeight:'700',
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
