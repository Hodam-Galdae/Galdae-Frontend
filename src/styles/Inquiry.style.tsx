
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
    header:{
        backgroundColor: theme.colors.white,
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'500',
        color:theme.colors.blackV0,
    },
    content:{
        paddingTop:86,
        justifyContent:'flex-start',
        alignItems:'center',
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    contact:{
       marginTop:40,
    },
    // content:{
    //     paddingHorizontal:15,
    //     paddingTop:12,
    //     flex: 1,
    //     backgroundColor: theme.colors.white,
    //     position:'relative',
    // },
    inputWrapper: {
        position: 'relative',
        marginBottom: 10,
        height: 46,
        width: '90%',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 42,
        paddingLeft: 20,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        paddingRight: 70,
        borderColor: theme.colors.grayV2,
        position: 'absolute',
        fontSize: theme.fontSize.size14,
        color: theme.colors.gray2,
        fontWeight: '500',
    },
    redText: {
        fontWeight: '500',
        fontSize: theme.fontSize.size14,
        color: theme.colors.red,
    },
    checkBtn: {
        position: 'absolute',
        right: 10,
        top: '50%', // 세로 중앙 정렬
        transform: [{ translateY: -14 }],
        backgroundColor: theme.colors.white,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.colors.Galdae,
        color: theme.colors.Galdae,
        zIndex: 999,
        width: 54,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBtnText: {
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.Galdae,
    },
    // input:{
    //     height:42,
    //     fontSize:theme.fontSize.size14,
    //     color:theme.colors.grayV2,
    //     fontWeight:'500',
    //     marginBottom:8,
    // },
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
