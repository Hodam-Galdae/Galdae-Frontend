
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
    background:{
        backgroundColor: theme.colors.popupBackGround,
    },
    container: {
      shadowColor: 'rgba(156, 156, 156, 10)',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity:0.05,
      shadowRadius: 20,
      elevation: 5,
      height:586,
      backgroundColor: theme.colors.white,
      paddingHorizontal: (30),
      borderTopLeftRadius: (20),
      borderTopRightRadius: (20),
    },
    handleContainer: {
        alignItems: 'center',
        marginTop:12,
        marginBottom: 33,
    },
    handle: {
        width: 68,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: theme.colors.gray0,
    },
    content: {
      height:500,
      position:'relative',
    },
    start:{
      fontWeight:700,
    },
    landMarkContainer:{
      flexDirection:'row',
      justifyContent:'center',
      gap:23,
    },
    picture:{
      width: '100%',
      height:150,
      backgroundColor:theme.colors.lightGray,
      borderRadius:10,
      marginTop:21,
      justifyContent:'flex-end',
      alignItems:'flex-end',
    },
    toBigPicIcon:{
      marginBottom:12,
      marginRight:12,

    },
    landMarkTag:{
      height:26,
      width:86,
      borderRadius:30,
    },
    landMark:{
      width: '100%',
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
    },
    selectContainer:{
      width: '100%',
      height:226,
      borderRadius:10,
      borderWidth:2,
      borderColor:theme.colors.lightGray,
    },
    select:{
      alignItems:'center',
      marginTop:20,
      gap:13,
      justifyContent:'center',
    },
    selectBtn:{
      width:102,
    },
    selectText:{
      fontSize:theme.fontSize.size18,
      fontWeight:'500',
    },
    confirmButton:{
      width:60,
      paddingHorizontal:16,
      height:42,
      alignSelf:'flex-end',
      marginTop:12,
    },
    confirmText:{

    },
    modalOverlay: {
      flex: 1,
      position:'relative',
      backgroundColor: theme.colors.popupBackGround,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal:15,

    },
    modalContent: {
      width: '100%',
      height:506,
      backgroundColor: theme.colors.gray0,
      borderRadius: 10,
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 15,   // 원하는 위치로 조정 (예: 모달 컨텐츠 상단 바깥쪽)
      left:160, // 원하는 위치로 조정 (예: 모달 컨텐츠 우측 바깥쪽)
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
      alignSelf:'flex-end',
      justifyContent:'flex-end',
      bottom:0,
      position:'absolute',
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
