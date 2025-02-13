import { StyleSheet } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    container: {
      padding: moderateScale(15),
    },
    notiButton:{
      width:'100%',
      borderRadius:0,
      height: moderateScale(26),
    },
    notiText:{
      fontSize:theme.fontSize.size16,
      fontWeight: '500',
    },
    startGaldae:{
      marginTop:moderateScale(5),
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
    },
    startGaldaeEx:{
      marginTop:moderateScale(2),
      fontSize:theme.fontSize.size14,
      fontWeight: '500',
      color:theme.colors.gray2,
      marginBottom:moderateScale(14),
    },
    borderedBox:{
      width:'100%',
      height:moderateScale(174),
      justifyContent:'center',
      borderColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:2,
      paddingHorizontal:moderateScale(35),

    },
    startAndEnd:{
      backgroundColor:theme.colors.gray0,
      alignItems:'flex-start',
      justifyContent:'center',
      flexDirection:'row',
      //gap:moderateScale(40),
      marginBottom:moderateScale(16),
    },
    startContain:{ //고정 width 설정해야할듯
      alignItems:'center',
      backgroundColor:theme.colors.brandColor,
    },
    start:{
      height:moderateScale(18),
      marginBottom:moderateScale(12),
    },
    mainPosName:{
      fontSize:theme.fontSize.size18,
      marginBottom:moderateScale(4),
      fontWeight:'700',
    },
    subPosName:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
      color:theme.colors.gray1,
    },
    switchBtn:{
      marginTop:moderateScale(40),
    },
    switchIcon:{
      width:moderateScale(24),
      height:moderateScale(24),
    },
    startDateTime:{
      alignSelf:'center',
      marginTop:moderateScale(15),
      fontSize:theme.fontSize.size16,
      fontWeight:'700',
    },
    line:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
    },
    generateButton:{
      width:'100%',
      marginTop:moderateScale(10),
      borderRadius:theme.borderRadius.size10,
      height: moderateScale(42),
    },
    generateText:{
      fontSize:theme.fontSize.size16,
      fontWeight: '700',
    },
    advertiseBox:{
      width:'100%',
      height:moderateScale(80),
      borderRadius:theme.borderRadius.size10,
      backgroundColor:theme.colors.red,
      marginTop:moderateScale(20),
    },
    nowGaldaeTitle:{
      marginTop:moderateScale(20),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    nowGaldae:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
    },
    search:{
      position:'relative',
      marginTop:moderateScale(10),
    },
    searchInput:{
      width:'100%',
      height:moderateScale(40),
      borderRadius:theme.borderRadius.size10,
      borderWidth:2,
      fontSize:theme.fontSize.size14,
      fontWeight: '500',
      color:theme.colors.gray2,
    },
    searchBtn:{
      position: 'absolute',
      right: moderateScale(20),
      bottom: moderateScale(10),
    },
    searchIcon:{
      width:moderateScale(18),
      height:moderateScale(18),
    },
    filters:{
      flexDirection:'row',
      marginTop:moderateScale(18),
      gap:moderateScale(8),
    },
    nowGaldaeList:{
      marginTop:moderateScale(14),
      marginBottom:moderateScale(50),
      position:'relative',
    },
    borderedListBox:{
      width:'100%',
      height:moderateScale(195),
      borderColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:1,
      paddingStart:moderateScale(24),
      paddingTop:moderateScale(18),
    },
    galdaeOwner:{
      fontSize:theme.fontSize.size12,
      fontWeight:'700',
    },
    fromContainer:{
      flexDirection:'row',
      marginTop:moderateScale(8),
      gap:moderateScale(8),
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
      gap:moderateScale(8),
      marginTop:moderateScale(6),
      alignItems:'center',
    },
    timeContainer:{
      flexDirection:'row',
      gap:moderateScale(8),
      marginTop:moderateScale(10),
      alignItems:'center',
    },
    fromToLine:{
      width:moderateScale(20),
      alignItems:'center',
    },
    tags:{
      flexDirection:'row',
      gap:moderateScale(4),
      marginTop:moderateScale(16),
      alignItems:'center',
    },
});

