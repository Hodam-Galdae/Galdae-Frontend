
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({


    notiTag:{
      paddingHorizontal:10,

    },
    tagContainer:{
      flexDirection:'row',
      alignItems:'center',
    },
    notiTagText:{
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
    },
    notiBox:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
      paddingVertical:14,
      paddingHorizontal:18,
      gap:10,
      justifyContent:'flex-start',
    },
    notiBoxContent:{
      flexDirection:'row',
      justifyContent:'space-between',
    },
    notiBoxContentText:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
      color:theme.colors.black,
    },
    line:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
    },
    notiDetailContainer:{
      width:'100%',
      backgroundColor:theme.colors.lightGray,
      padding:20,
      gap:20,
    },
    texts:{
      fontWeight:'500',
      fontSize:theme.fontSize.size14,
    },
});
