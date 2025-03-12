
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    searchListBox:{
        position:'relative',
        width:'100%',
        height:104,
        borderRadius:10,
        borderWidth:2,
        borderColor:theme.colors.lightGray,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        gap:(50),
        marginBottom:(12),
    },
    startContain:{ //고정 width 설정해야할듯
        alignItems:'center',
        width:(85),
    },
    arrowRight:{
      marginTop:30,
    },
    start:{
      marginTop:7,
      height:(18),
      marginBottom:(10),
    },
    mainPosName: {
      fontSize: theme.fontSize.size18,
      //marginBottom: (4),
      fontWeight: '700',
      lineHeight: (22), // 예시 값
    },
    subPosName: {
      fontSize: theme.fontSize.size16,
      fontWeight: '500',
      color: theme.colors.gray1,
      lineHeight: (22), // mainPosName과 동일하게 지정
    },

});
