
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    background:{
        backgroundColor: theme.colors.transparent,
    },
    container: {

      shadowColor: 'rgba(156, 156, 156, 20)',
      shadowOffset: { width: 20, height: 20 },
      shadowOpacity:20,
      shadowRadius: 20,
      elevation: 20,
      paddingHorizontal: (30),
      borderTopLeftRadius: (20),
      borderTopRightRadius: (20),
      //position:'relative',
    },
    handleContainer: {
        alignItems: 'center',
    },
    handle: {
        width: 100,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: theme.colors.gray0,
        marginTop:12,
        marginBottom: 33, // ✅ 여백을 추가하여 쉽게 터치 가능
    },
    content: {
      //height:'100%',
      //position:'relative',
    },
    start:{
      fontWeight:700,
      marginBottom:10,
    },
    landMarkContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      gap:23,
    },
    picture:{
      width: 150,
      height:150,
      backgroundColor:theme.colors.lightGray,
      borderRadius:10,
      marginTop:21,
      position:'relative',
      overflow: 'hidden', // ✅ 이거 추가
    },
    toBigPicIcon:{
      bottom:10,
      right:10,
      position:'absolute',

    },
    landMarkTag:{
      height:26,
      width:86,
      borderRadius:30,
    },
    landMark:{
      width: 150,
      marginTop:32,
    },
    title:{
      fontWeight:'700',
      marginTop:10,
    },
    subTitle:{
      marginTop:5,
    },
    selects:{
      marginTop:21,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:23,
      //backgroundColor:theme.colors.gray0,
    },
    selectContainer:{
      width: '100%',
      height:226,
      borderRadius:10,
      borderWidth:2,
      borderColor:theme.colors.lightGray,
      //backgroundColor:theme.colors.black,
    },
    select:{
      alignItems:'center',
      marginTop:20,
      gap:13,
      justifyContent:'center',
      //backgroundColor:theme.colors.red,
      width:'100%',
    },
    selectBtn:{
      paddingVertical:6,
      paddingHorizontal:22,
      //backgroundColor:theme.colors.caption1,
  },
    selectText:{
      fontSize:theme.fontSize.size18,
      fontWeight:'500',
    },
    confirmButton:{

      paddingHorizontal:16,
      height:42,
      alignSelf:'flex-end',
    },
    confirmText:{

    },
    modalOverlay: {
      flex: 1,
      //position:'relative',
      backgroundColor: theme.colors.popupBackGround,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal:15,

    },
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.popupBackGround,
      paddingVertical: 40,
      paddingHorizontal:10,
    },

    wvOverlay: {
      flex: 1,
    },
    outsideTouchable: {
      ...StyleSheet.absoluteFillObject, // ← 배경 전체를 덮음
    },
    wvContainer:{
      flex: 1,


    },
    // FastGaldaePopup.style.ts
    webView: {
      flex: 1,
      borderRadius:theme.borderRadius.size10,
    },
    modalContent: {
      width: '100%',
      height:'60%',
      backgroundColor: theme.colors.gray0,
      borderRadius: 10,
      alignItems: 'center',
    },
    closeContainer:{
      position: 'absolute',
      bottom: 96,   // 원하는 위치로 조정 (예: 모달 컨텐츠 상단 바깥쪽)
      right:18, // 원하는 위치로 조정 (예: 모달 컨텐츠 우측 바깥쪽)
    },
    closeMapContainer:{
      position: 'absolute',
      bottom: 10,   // 원하는 위치로 조정 (예: 모달 컨텐츠 상단 바깥쪽)
      right:10, // 원하는 위치로 조정 (예: 모달 컨텐츠 우측 바깥쪽)
    },
    closeButton: {

    },
    closeButtonIcon: {
      width: 30,
      height: 30,
    },
    fullScreenImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    datePicker:{
      marginTop:22,
      marginBottom:40,
    },
    confirmBtnContainer:{
      paddingTop:20,
      alignSelf:'flex-end',
      justifyContent:'flex-end',
    },
    resetBtnContainer:{
      paddingTop:20,
      //alignSelf:'flex-end',
      flexDirection:'row',
      justifyContent:'space-between',
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
  arrayContent:{
    height:200,
    paddingTop:30,
    gap:15,
  },
  font:{
    fontSize:theme.fontSize.size18,
    fontWeight:'500',
  },
  latest:{
    flexDirection:'row',
    alignItems:'center',
    gap:13,
    marginBottom:20,
  },
  line:{
    borderTopWidth:2,
    borderColor:theme.colors.gray0,
    width:'100%',
    height:2,
    marginTop:15,
  },
  time:{
    marginTop:15,
    fontWeight:'600',
    marginBottom:8,
  },
  timePicker:{
    marginTop:22,
  },
  warnText: {
    fontWeight:'500',
    color: theme.colors.red,
    fontSize: theme.fontSize.size12,
    marginTop: 10,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap:8,
    marginBottom: 20,
},
 personWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 90,
    },
    personBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personText: {
        fontSize: theme.fontSize.size18,
        color: theme.colors.black,
        marginRight: 4,
        fontWeight:'700',
    },
    personSubText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.gray1,
        fontWeight:'500',
    },
    plusBtn: {
        width: 26,
        height: 26,
        backgroundColor: theme.colors.gray0,
        borderRadius: 999,
    },
    plusIcon: {
        width: 16,
        height: 16,
    },
    numberText: {
        fontSize: theme.fontSize.size24,
        color: theme.colors.black,
        marginHorizontal: 10,
    },
    selectGender:{
      marginTop:20,
      fontWeight:'500',
      marginBottom:8,
    },
    selectTime:{
      marginTop:20,
      fontWeight:'500',
      marginBottom:8,
    },

  });
