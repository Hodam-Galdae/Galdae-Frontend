
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
        //paddingHorizontal:15,
        paddingTop:30,
        flex: 1,

        backgroundColor: theme.colors.white,
    },
    title:{
        marginLeft:15,
        fontSize:theme.fontSize.size18,
        fontWeight:'500',
        marginBottom:10,
    },
    subTitle:{
        marginTop:60,
        marginLeft:15,
        fontSize:theme.fontSize.size18,
        fontWeight:'500',
        marginBottom:10,
    },
    notiContainer:{
        position:'relative',
    },
    read:{
        borderRadius:0,
        justifyContent:'flex-start',
        paddingVertical:23,
        paddingStart:26,
        backgroundColor:theme.colors.white,
    },
    notRead:{
        borderRadius:0,
        justifyContent:'flex-start',
        paddingVertical:23,
        paddingStart:26,
        backgroundColor:theme.colors.notification,
    },
    text:{
        color:theme.colors.black,
        fontWeight:'500',
        fontSize:theme.fontSize.size18,
    },
    circle:{
        width:8,
        height:8,
        borderRadius:999,
        backgroundColor:theme.colors.brandColor,
        position:'absolute',
        top:12,
        right:15,
    },
});
