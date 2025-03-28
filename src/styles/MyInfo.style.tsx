import { StyleSheet } from 'react-native';
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
  startGaldae:{
    fontSize:theme.fontSize.size20,
    fontWeight: '700',
    marginBottom:13,
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
    backgroundColor:theme.colors.white,
    position:'relative',
  },
  profileImg:{
    width: '100%',
    height: '100%',
    borderRadius:999,
  },
  profileCamera:{
    position:'absolute',
    bottom:0,
    right:0,
    backgroundColor:theme.colors.white,
    padding:2,
  },
  profileName:{
    flexDirection:'row',
    alignItems:'center',
    gap:4,
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
  nowGaldaeTitle:{
    marginTop:(30),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
  },
  nowGaldae:{
    fontSize:theme.fontSize.size20,
    fontWeight: '700',
  },
  newGaldaeListPassed:{
    marginRight: 8,
    padding:8,
    alignItems:'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.size10,
    width:86,
  },
  newGaldaeList:{
    marginRight: 8,
    padding:8,
    alignItems:'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.size10,
    borderColor:theme.colors.brandColor,
    borderWidth:1,
    width: 86,
  },
  newGaldaeTimeTextPassed:{
    fontSize: theme.fontSize.size10,
    marginBottom: 6,
    color:theme.colors.gray2,
  },
  newGaldaeTimeText:{
    fontSize: theme.fontSize.size10,
    marginBottom: 6,
    color:theme.colors.black,
  },
  newGaldaeDepartText:{
    fontSize:theme.fontSize.size14,
    fontWeight:'500',
    marginBottom:5,
    maxWidth: 80,
    color:theme.colors.black,
  },
  newGaldaeDestText:{
    fontSize:theme.fontSize.size14,
    fontWeight:'500',
    maxWidth: 80,
    color:theme.colors.black,
  },
  newGaldaeDepartTextPassed:{
    fontSize:theme.fontSize.size14,
    fontWeight:'500',
    marginBottom:5,
    maxWidth: 80,
    color:theme.colors.gray2,
  },
  newGaldaeDestTextPassed:{
    fontSize:theme.fontSize.size14,
    fontWeight:'500',
    maxWidth: 80,
    color:theme.colors.gray2,
  },
  newGaldaeArrowIcon:{
    marginBottom:5,
  },
  myInfoTitle:{
    fontSize:theme.fontSize.size20,
    fontWeight: '700',
    marginTop:30,
    marginBottom:20,
  },
  search:{
    width:'100%',
    justifyContent:'space-between',
  },
  searchContent:{
    flexDirection:'row',
    gap:4,
    alignItems:'center',
  },

  searchPos:{
    fontWeight:'700',
  },
  searchText:{
    fontSize:theme.fontSize.size18,
    fontWeight:'500',
    color:theme.colors.black,
  },
  searchSVG:{
    width:18,
    height:18,
  },
  myInfos:{
    gap:30,
  },
  more:{
    fontSize:theme.fontSize.size14,
  },
});
