
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    container:{
        height:'100%',
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    content:{
        paddingHorizontal:15,
        paddingTop:12,
        flex: 1,
        backgroundColor: theme.colors.white,
        position:'relative',
    },
    input:{
        height:42,
        fontSize:theme.fontSize.size14,
        color:theme.colors.grayV2,
        fontWeight:'500',
        marginBottom:8,
    },
    detail:{
        height:312,
        fontSize:theme.fontSize.size14,
        color:theme.colors.grayV2,
        fontWeight:'500',
        textAlignVertical: 'top',  // ② 안드로이드에서 위쪽 정렬
        textAlign: 'left',         // ③ 가로 정렬 (iOS, 안드로이드 동일)
        marginBottom:10,
    },
    answerContainer:{
        marginTop:6,
        height:245,
        fontSize:theme.fontSize.size14,
        color:theme.colors.grayV2,
        fontWeight:'500',
        textAlignVertical: 'top',  // ② 안드로이드에서 위쪽 정렬
        textAlign: 'left',         // ③ 가로 정렬 (iOS, 안드로이드 동일)
        marginBottom:10,
    },
    texts:{
        flexDirection:'row',
    },
    text:{
        fontSize:theme.fontSize.size12,
        fontWeight:'500',
    },
    importText:{
        fontSize:theme.fontSize.size12,
        fontWeight:'500',
        color:theme.colors.red,
        textDecorationLine: 'underline',
    },
    imgContainer:{
        marginTop:10,
        width:57,
        height:57,
        backgroundColor:theme.colors.grayV3,
        borderRadius:theme.borderRadius.size10,
        justifyContent:'center',
        alignItems:'center',
    },
    img:{
        width: '100%',
        height: '100%',
        borderRadius:theme.borderRadius.size10,
    },
    inquiryBtnContainer:{
        alignSelf:'center',
        position:'absolute',
        width:'100%',
        //height:42,
        bottom:40,
    },
    inquiryBtn:{
        width:'100%',
        borderRadius:theme.borderRadius.size10,
        height:42,
    },
    inquiryText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },
    answer:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
        marginTop:30,
    },
});
