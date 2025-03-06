
import { Platform, StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    main:{
      flex: 1,

    },
    headerTitle:{
        flexDirection:'row',
        gap:4,
        alignItems:'center',
        top: Platform.select({
            android:5,
        }),
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight:Platform.select({
            android:50,
        }),
    },
    content: {
      flex: 1,
      position:'relative',
      padding: 15,
    },
    advertiseBox:{
      width:'100%',
      height:(80),
      borderRadius:theme.borderRadius.size10,
      backgroundColor:theme.colors.red,
      marginTop:(20),
    },
    borderedListBox:{
        width:'100%',
        height:195,
        paddingTop:20,
        marginBottom:50,
      },
      galdaeOwner:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
        marginBottom:20,
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
      fromSubLocation:{
        fontSize:theme.fontSize.size16,
        fontWeight:'500',
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
      map:{
        width:'100%',
        height:180,
        backgroundColor:theme.colors.brandColor,
        borderRadius:theme.borderRadius.size10,
      },
      userInfo:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
        marginBottom:10,
        marginTop:30,
      },
      profile:{
        width:62,
        height:62,
        borderRadius:999,
        backgroundColor:theme.colors.brandColor,
      },
      profileImg:{
        width: '100%',
        height: '100%',
        borderRadius:999,
      },
      userInfoText:{
        marginLeft:20,
        flexDirection:'column',
      },
      universityText:{
        fontSize:theme.fontSize.size12,
        color:theme.colors.gray2,
        fontWeight:'500',
      },
      nameText:{
        fontSize:theme.fontSize.size18,
        fontWeight:'700',
        color:theme.colors.brandColor,
      },
      badge:{
        marginRight:20,
      },
      userInfos:{
        flexDirection:'row',
        alignItems:'center',
      },
      userInfoBox:{
        width:'100%',
        height:96,
        justifyContent:'space-between',
        borderWidth:2,
        flexDirection:'row',
        alignItems:'center',
        borderColor:theme.colors.lightGray,
        borderRadius:theme.borderRadius.size10,
        paddingStart:20,
      },
      participateContainer:{
        alignSelf:'center',
        width:'100%',
        marginTop:35,
        marginBottom:35,
        //height:42,
      },
      participateBtn:{
        width:'100%',
        borderRadius:theme.borderRadius.size10,
        height:42,
      },
      participateText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
      },


});
