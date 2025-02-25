
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
        flex:1,
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
    line:{
      borderTopWidth:1,
      borderColor:theme.colors.gray0,
    },

});
