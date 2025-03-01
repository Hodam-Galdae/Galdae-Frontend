
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
        paddingTop:30,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
    },
    warnTexts:{
        marginTop:50,
    },
    warnText:{
        color:theme.colors.gray2,
        fontWeight:'500',
    },
    margin:{
        marginTop:20,
    },
    logoutBtnContainer:{
      alignSelf:'center',
      position:'absolute',
      width:'100%',
      gap:10,
      bottom:40,
    },
    logoutBtn:{
        width:'100%',
        borderRadius:theme.borderRadius.size10,
        height:42,
        borderWidth:2,
    },
    logoutText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },
});
