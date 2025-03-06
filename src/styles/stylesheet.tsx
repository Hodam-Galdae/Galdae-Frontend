/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import {} from "../utils/ScreenScaler";
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
        paddingHorizontal:(10),
        paddingVertical:(1),
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
            //paddingTop: (1), // 미세 조정: 필요 시 수정
            //paddingBottom: (1),
        },
        ios: {
          //lineHeight: (10),
        },
    }),
    },
    smallBorderTextTag:{
       // marginBottom:(3),
        borderRadius:theme.borderRadius.size10,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:(8),
        paddingVertical:(1),
    },
    floatingBtn:{
        width:(62),
        height:(62),
        backgroundColor:theme.colors.brandColor,
        borderRadius: '50%',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:(50),
        right:(20),
    },
});

export default stylesheet;
