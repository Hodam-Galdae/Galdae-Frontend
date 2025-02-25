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
    menuContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:20,
    },
    menuItem: {
      // 각 버튼 사이 간격
      marginRight: 6,
    },
    btnStyle:{
        paddingHorizontal:22,
    },
    textStyle:{
        fontSize:theme.fontSize.size14,
        fontWeight:'400',
    },
});
