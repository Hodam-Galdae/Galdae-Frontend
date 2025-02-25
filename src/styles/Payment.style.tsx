
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
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
    },
    borderBox:{
        width:'100%',
        height:195,
        borderColor:theme.colors.gray0,
        borderRadius:theme.borderRadius.size10,
        borderWidth:1,
        marginBottom:12,
        alignItems:'center',
        justifyContent:'center',
    },
    noGaldaeText:{
        fontSize:theme.fontSize.size14,
        color:theme.colors.gray1,

    },
    nowGaldaeTitle:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom:12,
    },
    nowGaldae:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
    },
    more:{
      fontSize:theme.fontSize.size14,
    },
    freqText:{
      fontSize:theme.fontSize.size20,
      fontWeight: '700',
      marginTop:20,
      marginBottom:12,
    },
    searchList:{
      height:440,
    },
    searchListBox:{
        position:'relative',
        width:'100%',
        height:104,
        borderRadius:10,
        borderWidth:2,
        borderColor:theme.colors.lightGray,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        gap:(50),
        marginBottom:(12),
    },
    searchDate:{
        position:'absolute',
        top:8,
        left:14,
    },
    startContain:{ //고정 width 설정해야할듯
        alignItems:'center',
        width:(85),
    },
    arrowRight:{
      marginTop:30,
    },
    start:{
      marginTop:7,
      height:(18),
      marginBottom:(10),
    },
    mainPosName: {
      fontSize: theme.fontSize.size18,
      //marginBottom: (4),
      fontWeight: '700',
      lineHeight: (22), // 예시 값
    },
    subPosName: {
      fontSize: theme.fontSize.size16,
      fontWeight: '500',
      color: theme.colors.gray1,
      lineHeight: (22), // mainPosName과 동일하게 지정
    },
    startContainer:{
      alignSelf:'center',
    },
    generateButton:{
        width: '100%',
        borderRadius:theme.borderRadius.size10,
        height: 42,
        marginBottom: 40,
    },
    generateText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },
    main:{
        height:'100%',
    },
    galdaeList:{
        paddingTop:30,
        paddingHorizontal:15,
    },
    scroll:{
        height:'85%',
    },
    nowGaldaeList:{
      marginTop:14,
      position:'relative',
      height:'100%',
    },
    noData:{
      height:'100%',
      alignItems:'center',
      justifyContent:'center',
      gap:12,
    },
    notiTitleContainer:{
      marginTop:30,
      marginBottom:30,
      backgroundColor:theme.colors.lightGray,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      width:'100%',
      paddingVertical:11,
      borderRadius:theme.borderRadius.size10,
      gap:10,
    },
    notiTitleText:{
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
      color:theme.colors.gray2,
    },
    notiTag:{
      paddingHorizontal:10,

    },
    tagContainer:{
      flexDirection:'row',
      alignItems:'center',
    },
    notiTagText:{
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
    },
    notiBox:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
      paddingVertical:14,
      paddingHorizontal:18,
      gap:10,
      justifyContent:'flex-start',
    },
    notiBoxContent:{
      flexDirection:'row',
      justifyContent:'space-between',
    },
    notiBoxContentText:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
      color:theme.colors.black,
    },
    line:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
    },
    notiDetailContainer:{
      width:'100%',
      backgroundColor:theme.colors.lightGray,
      padding:20,
      gap:20,
    },
    texts:{
      fontWeight:'500',
      fontSize:theme.fontSize.size14,
    },
});
