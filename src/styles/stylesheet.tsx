/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import {moderateScale} from "../utils/ScreenScaler";
import {Platform, StyleSheet} from 'react-native';
import { theme } from "./theme";

const stylesheet = StyleSheet.create({
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

    //작은 텍스트 버튼
    smallBorderTextBtn:{
        borderWidth:1,
        height:moderateScale(30),
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(1),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:theme.borderRadius.size30,

      },
    //작은 텍스트 버튼의 텍스트
    smallBorderBtnText:{
        fontWeight:'700',
        fontSize:theme.fontSize.size14,
        textAlign:'center',
        textAlignVertical:'center',
         // Android에서는 textAlignVertical, iOS에서는 lineHeight를 이용하여 중앙 정렬
    ...Platform.select({
        android: {
            textAlignVertical: 'center', // 텍스트를 수직 중앙 정렬
            //paddingTop: moderateScale(1), // 미세 조정: 필요 시 수정
            paddingBottom: moderateScale(2),
        },
        ios: {
          //lineHeight: moderateScale(10),
        },
    }),
    },
    smallBorderTextTag:{
       // marginBottom:moderateScale(3),
        borderRadius:theme.borderRadius.size10,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:moderateScale(8),
        paddingVertical:moderateScale(1),
        height:moderateScale(20),
    },
    floatingBtn:{
        width:moderateScale(62),
        height:moderateScale(62),
        backgroundColor:theme.colors.brandColor,
        borderRadius: '50%',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:moderateScale(50),
        right:moderateScale(20),

        //그림자효과...
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default stylesheet;
