import {StyleSheet} from 'react-native';
import {theme} from '../styles/theme';
export default StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.Galdae,
    paddingHorizontal: 20,
    paddingBottom: 12,
    // iOS 전용 그림자
    shadowColor: theme.colors.grayV1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android 전용 그림자
    elevation: 4,
    zIndex: 999,
    // borderWidth:3,
    // borderColor:theme.colors.blue,
  },
  searchContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.colors.Galdae,
    // paddingTop: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: theme.borderRadius.size30,
    borderBottomRightRadius: theme.borderRadius.size30,
  },
  search:{
    width:'100%',
    justifyContent:'space-between',
  },
  searchContent:{
    marginLeft:20,
    flexDirection:'row',
    gap:4,
    alignItems:'center',
  },
  searchSVG:{
    marginRight:20,
  },
  searchBtn:{
    height:42,
    borderWidth:1,
    borderColor:theme.colors.grayV1,
    borderRadius:999,
  },
  searchPos:{
    fontWeight:'700',
  },
  searchText:{
    marginLeft:20,
    fontSize:theme.fontSize.size16,
    fontWeight:'500',
    color:theme.colors.grayV0,
  },
  backContainer: {
    // borderWidth: 1,
    // borderColor: theme.colors.red,
    width: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
  },
  logoContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: theme.colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    // borderColor: theme.colors.red,
  },
  mainTitle: {
    fontSize: theme.fontSize.size22,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  headerButton: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  universityName: {
    fontSize: theme.fontSize.size22,
    fontWeight: '700',
    color: theme.colors.white,
    flexShrink: 0,
    // borderWidth: 1
  },
  universityLocation: {
    fontSize: theme.fontSize.size14,
    fontWeight: '700',
    color: theme.colors.white,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.size30,
    paddingHorizontal: 8,
    // paddingBottom: 2,
    flexShrink: 0,
    borderWidth: 1,
  },
  // 홈 화면 전용 스타일
  homeLeftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  homeLogoContainer: {
    width: 30,
  },


});
