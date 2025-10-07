
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
    header:{
      backgroundColor: theme.colors.white,
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
    noData:{
      //height:'100%',
      height: 170,
       alignItems:'center',
       justifyContent:'center',
       gap:12,
       //backgroundColor:theme.colors.Galdae,
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
      marginTop:40,
      width:282,
      height:152,
      backgroundColor:theme.colors.grayV3,
      borderRadius:theme.borderRadius.size10,
      borderColor:theme.colors.Galdae2,
      borderWidth:2,
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
      backgroundColor:theme.colors.grayV0,
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
      marginTop:40,
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
