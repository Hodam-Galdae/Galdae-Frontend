import { StyleSheet } from 'react-native';
import {} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
      padding: (15),
      position:'relative',
    },
    notiButton:{
      width:'100%',
      borderRadius:0,
      height: (26),
    },
    notiText:{
      fontSize:theme.fontSize.size16,
      fontWeight: '500',
    },
    madeGaldaeContainer:{
      marginBottom:20,
    },
    madeGaldae:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
      marginBottom:10,
    },
    startGaldae:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
    },
    newGaldaeList:{
      marginRight: 8,
      padding:8,
      alignItems:'center',

      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.size10,
      borderColor:theme.colors.brandColor,
      borderWidth:1,
      width:86,
      height:84,

    },
    newGaldaeTimeText:{
      fontSize: theme.fontSize.size10,
      marginBottom: 6,
      color:theme.colors.gray2,
    },
    newGaldaeDepartText:{
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
      marginBottom:5,
    },
    newGaldaeDestText:{
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
    },
    newGaldaeArrowIcon:{
      marginBottom:5,
    },
    startGaldaeEx:{
      marginTop:(2),
      fontSize:theme.fontSize.size14,
      fontWeight: '500',
      color:theme.colors.gray2,
      marginBottom:(14),
    },
    borderedBox:{
      width:'100%',
      height:(174),
      justifyContent:'center',
      borderColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:2,
      paddingHorizontal:(35),

    },
    startAndEnd:{
      alignItems:'flex-start',
      justifyContent:'center',
      flexDirection:'row',
      gap:(30),
      marginBottom:(16),
    },
    startContain:{ //고정 width 설정해야할듯
      alignItems:'center',
      width:(85),
    },
    start:{
      height:(18),
      marginBottom:(12),
    },
    mainPosName: {
      fontSize: theme.fontSize.size18,
      //marginBottom: (4),
      fontWeight: '700',
      lineHeight: (22), // 예시 값
    },
    subPosName: {
      fontSize: theme.fontSize.size16,
      fontWeight: '500',
      color: theme.colors.gray1,
      lineHeight: (22), // mainPosName과 동일하게 지정
    },
    switchBtn:{
      marginTop:(40),
    },
    switchIcon:{
      width:(24),
      height:(24),
    },
    startContainer:{
      alignSelf:'center',
    },
    startTime:{
      fontSize:theme.fontSize.size14,
      color:theme.colors.brandColor,
      fontWeight:'500',
      marginTop:(8),
    },
    startDateTime:{
      marginTop:(4),
      fontSize:theme.fontSize.size16,
      fontWeight:'700',
    },
    line:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
    },
    generateButton:{
      width:'100%',
      marginTop:(10),
      borderRadius:theme.borderRadius.size10,
      height: (42),
    },
    generateText:{
      fontSize:theme.fontSize.size16,
      fontWeight: '700',
    },
    advertiseBox:{
      width:'100%',
      height:(80),
      borderRadius:theme.borderRadius.size10,
      backgroundColor:theme.colors.red,
      marginTop:(20),
    },
    nowGaldaeTitle:{
      marginTop:(20),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    nowGaldae:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
    },

    filters:{
      flexDirection:'row',
      marginTop:(18),
      gap:(8),
    },
    nowGaldaeList:{
      marginTop:14,
      position:'relative',
    },
    borderedListBox:{
      width:'100%',
      height:195,
      borderColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:1,
      paddingStart:24,
      paddingTop:14,
      marginBottom:12,
    },
    galdaeOwner:{
      fontSize:theme.fontSize.size12,
      fontWeight:'700',
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
    timeContainer:{
      flexDirection:'row',
      gap:(8),
      marginTop:(6),
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
    toastPopup:{
        paddingVertical:9,
        paddingHorizontal:26,
        borderRadius:theme.borderRadius.size30,
        backgroundColor:theme.colors.brandColor,
        justifyContent:'center',
        alignItems:'center',
        alignSelf: 'center', // 가로 중앙 정렬
        position:'absolute',
        bottom:(20),
        color:theme.colors.white,
        fontSize:theme.fontSize.size14,
        fontWeight:'500',
    },
});

