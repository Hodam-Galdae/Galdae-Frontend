
import { StyleSheet,Platform } from 'react-native';
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
})
