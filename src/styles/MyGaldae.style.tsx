
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

    searchList:{
      height:440,
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
});
