
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
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
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
    input:{
        borderRadius:0,
        borderWidth:0,
        borderBottomWidth:1,
        borderColor:theme.colors.transparent,
        borderBottomColor:theme.colors.black,
        fontWeight:'500',
        color:theme.colors.black,
        fontSize:theme.fontSize.size16,
        paddingHorizontal:2,
        marginBottom:18,
    },
    redText:{
        fontWeight:'500',
        fontSize:theme.fontSize.size14,
        color:theme.colors.red,
    },
});
