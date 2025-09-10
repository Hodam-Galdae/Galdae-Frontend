
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    container:{
        height:'100%',
    },
    headerStyle:{
        backgroundColor: theme.colors.white,
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    content:{
        paddingHorizontal:20,
        paddingVertical:30,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
    },
    searchText:{
        fontSize:theme.fontSize.size18,
        fontWeight:'500',
        color:theme.colors.blackV0,
    },
    search:{
        width:'100%',
        justifyContent:'space-between',
    },
    searchSVG:{
      width:18,
      height:18,
    },
    myInfos:{
      gap:24,
    },
    contentText:{
        fontWeight:'500',
        color:theme.colors.gray2,
    },

});
