
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    searchListBox:{
        position:'relative',
        width:'100%',
        borderRadius:10,
        borderWidth:2,
        borderColor:theme.colors.grayV3,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        gap:(50),
        marginBottom:(12),
        paddingVertical: 15,
    },
    startContain:{ //고정 width 설정해야할듯
        alignItems:'center',
    },
    arrowRight:{
      marginTop:30,
    },
    start:{
      marginTop:7,
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
      color: theme.colors.grayV1,
      lineHeight: (22), // mainPosName과 동일하게 지정
    },

});
