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
        paddingHorizontal:18,
    },
    textStyle:{
        fontSize:theme.fontSize.size14,
        fontWeight:'400',
    },
    FAQContainer:{
      borderBottomWidth:1,
      borderColor:theme.colors.gray0,
    },
    FAQItem:{
      flexDirection:'row',
      paddingHorizontal:18,
      paddingVertical:16,
      justifyContent:'space-between',
    },
    FAQText:{
      flexDirection:'row',
      alignItems:'center',
    },
    Q:{
      fontWeight:'900',
      fontSize:theme.fontSize.size16,
    },
    question:{
      fontWeight:'500',
      fontSize:theme.fontSize.size16,
    },
    answerContainer:{
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
