
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
    leftButtonContainer:{
        width: 70,
        alignItems: 'flex-start',
    },
    markAllReadContainer:{
        width: 70,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    markAllReadText:{
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        color: theme.colors.blackV3,
    },
    markAllReadTextActive:{
        color: theme.colors.Galdae,
    },
    content:{
        //paddingHorizontal:15,
        paddingTop:30,
        flex: 1,

        backgroundColor: theme.colors.white,
    },
    header:{
        backgroundColor: theme.colors.white,
    },
    noData:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        gap:12,
        minHeight: 400,
       },
    noDataText:{
        fontSize: theme.fontSize.size14,
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: -0.28, // -2% of 14px
        textAlign: 'center',
        color: theme.colors.blackV3,
    },
    title:{
        marginLeft:15,
        fontSize:16,
        fontWeight:'700',
        lineHeight:16, // 100%
        letterSpacing:-0.32, // -2%
        color:'#191919',
        marginBottom:10,
    },
    subTitle:{
        marginTop:60,
        marginLeft:15,
        fontSize:16,
        fontWeight:'700',
        lineHeight:16, // 100%
        letterSpacing:-0.32, // -2%
        color:'#191919',
        marginBottom:10,
    },
    firstTitle:{
        marginTop:0,
    },
    notiContainer:{
        position:'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconWrapper:{
        width: 44,
        height: 44,
        borderRadius: 99,
        backgroundColor: theme.colors.grayV3,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    iconStyle:{
        width: 24,
        height: 24,
    },
    walletIconStyle:{
        width: 28,
        height: 28,
    },
    serviceIconStyle:{
        width: 18,
        height: 18,
    },
    read:{
        flex: 1,
        borderRadius:0,
        justifyContent:'flex-start',
        paddingVertical:23,
        paddingStart:0,
        paddingEnd:15,
        backgroundColor:theme.colors.white,
    },
    notRead:{
        flex: 1,
        borderRadius:0,
        justifyContent:'flex-start',
        paddingVertical:23,
        paddingStart:0,
        paddingEnd:15,
        backgroundColor:theme.colors.white,
    },
    text:{
        fontFamily: 'NotoSansKR-Medium',
        fontWeight:'500',
        fontSize: theme.fontSize.size14,
        lineHeight: 14, // 100%
        letterSpacing: -0.28, // -2% of 14px
        color:theme.colors.blackV2, // #3D3F4D (읽지 않은 알림)
    },
    readText:{
        fontFamily: 'NotoSansKR-Medium',
        fontWeight:'500',
        fontSize: theme.fontSize.size14,
        lineHeight: 14, // 100%
        letterSpacing: -0.28, // -2% of 14px
        color:theme.colors.blackV3, // #777E91 (읽은 알림)
    },
    circle:{
        width:8,
        height:8,
        borderRadius:999,
        backgroundColor:theme.colors.Galdae,
        position:'absolute',
        top: '50%',
        marginTop: -4, // 높이의 절반만큼 위로 이동하여 중앙 정렬
        right:15,
    },
});
