
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({

    borderedListBox:{
      width:'100%',
      borderColor:theme.colors.grayV0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:1,
      paddingStart:24,
      paddingTop:14,
      paddingBottom: 18,
      marginBottom:12,
    },
    borderedListBoxComplete:{
      width:'100%',
      borderColor:theme.colors.grayV2,
      borderRadius:theme.borderRadius.size10,
      backgroundColor:theme.colors.grayV2,
      borderWidth:1,
      paddingStart:24,
      paddingTop:14,
      paddingBottom: 18,
      marginBottom:12,
    },
    galdaeOwner:{
      fontSize:theme.fontSize.size12,
      fontWeight:'700',
    },
    galdaeOwnerCom:{
      fontSize:theme.fontSize.size12,
      fontWeight:'700',
      color:theme.colors.grayV2,
    },
    fromContainer:{
      flexDirection:'row',
      marginTop:(8),
      gap:(8),
    },
    fromMainLocation:{
      fontSize:theme.fontSize.size16,
      fontWeight:'700',
    },
    fromMainLocationCom:{
      fontSize:theme.fontSize.size16,
      fontWeight:'700',
      color: theme.colors.grayV2,
    },
    fromSubLocation:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
    },
    departureTime:{
      color:theme.colors.blackV0,
      fontWeight:'500',
      fontSize:theme.fontSize.size14,
    },
    departureTimeCom:{
      color:theme.colors.grayV1,
      fontWeight:'500',
      fontSize:theme.fontSize.size14,
    },
    fromSubLocationCom:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
      color:theme.colors.grayV1,
    },
    toContainer:{
      flexDirection:'row',
      gap:(8),
      marginTop:(7),
      alignItems:'center',
    },
    fromToLine:{
      width:(20),
      alignItems:'center',
    },
    tags:{
      flexDirection:'row',
      gap:(4),
      marginTop:(16),
      alignItems:'center',
    },
    timeContainer:{
      flexDirection:'row',
      gap:(8),
      marginTop:(6),
      alignItems:'center',
    },
});
