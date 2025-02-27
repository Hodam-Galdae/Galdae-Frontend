
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    emptyContainer:{
        height:'80%',
        justifyContent:'center',
        alignItems:'center',
        gap:12,
    },

    historyBox:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between',
        height:60,
        borderWidth:2,
        borderColor:theme.colors.lightGray,
        borderRadius:theme.borderRadius.size10,
        marginBottom:10,
    },
    question:{
        flexDirection:'row',
    },
    Q:{
        fontSize:theme.fontSize.size16,
        fontWeight:'900',
    },
    questionText:{
        fontSize:theme.fontSize.size16,
        fontWeight:'500',
    },
    complete:{
        color:theme.colors.brandColor,
        fontSize:theme.fontSize.size14,
        fontWeight:'500',
    },
    wait:{
        color:theme.colors.gray1,
        fontSize:theme.fontSize.size14,
        fontWeight:'500',
    },
});
