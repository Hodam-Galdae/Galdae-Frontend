/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import {moderateScale} from "../utils/ScreenScaler";
import {Platform, StatusBar, StyleSheet} from 'react-native';


const stylesheet = StyleSheet.create({
    emptyView1: {
        height: moderateScale(55)
    },
    emptyView2: {
        height: moderateScale(16)
    },
    emptyView3: {
        height: moderateScale(24)
    },
    emptyView4: {
        height: moderateScale(0)
    },
    emptyView5: {
        width: moderateScale(0)
    },
    emptyView6: {
        height: moderateScale(0)
    },
    emptyView7: {
        height: moderateScale(0)
    },
    LottieContainer:{
        width:"100%",
        height:"100%"
    },
    MainContainer:{
        display: "flex",
        flexDirection : "column",
        width:"100%",
        height:"100%"
    },
    basicRound: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Number.MAX_SAFE_INTEGER,
    },
    rowAndCentered: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center'
    },
    JuaFont:{
        fontFamily: "Jua-Regular",
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    borderRadius10:{
        borderRadius:10,
    },
    //작은 텍스트 버튼
    smallBorderTextBtn:{
        borderWidth:1,
        height:moderateScale(22),
        paddingHorizontal:moderateScale(8),
        paddingVertical:moderateScale(1),
        alignItems:'center',
        justifyContent:'center',
      },
    //작은 텍스트 버튼의 텍스트
    smallBorderBtnText:{
        fontWeight:'700',
        fontSize:12,
        textAlign:'center',
        textAlignVertical:'center',
         // Android에서는 textAlignVertical, iOS에서는 lineHeight를 이용하여 중앙 정렬
    ...Platform.select({
        android: {
          textAlignVertical: 'center',
        },
        ios: {
          lineHeight: moderateScale(20),
        },
    }),
    },
    smallBorderTextTag:{
        marginBottom:moderateScale(3),
        borderRadius:(10),
        borderWidth:1
    },
});

export default stylesheet;
