import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {theme} from '../styles/theme';
export default StyleSheet.create({

  headerContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.Galdae,
    paddingHorizontal: 20,
    // iOS 전용 그림자
    shadowColor: theme.colors.grayV1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android 전용 그림자
    elevation: 4,
    zIndex: 999,
    ...(Platform.OS === 'ios' && {
      paddingTop: 20,
    }),
  },
  searchContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.colors.Galdae,
    paddingTop: 12,
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
    width: 30,
    height: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: 30,
  },
  notificationContainer: {
    width: 30,
    height: 30,
  },
  mainTitle: {
    fontSize: theme.fontSize.size22,
    fontWeight: 'bold',
    color: theme.colors.white,
    lineHeight: Platform.select({
      android: 40,
    }),
  },
  headerButton: {
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  universityName: {
    fontSize: theme.fontSize.size22,
    fontWeight: '700',
    color: theme.colors.white,
    paddingBottom: 4,
  },
  universityLocation: {
    fontSize: theme.fontSize.size14,
    fontWeight: '700',
    color: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.size30,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
});
