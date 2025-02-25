
import { StyleSheet, Dimensions,Platform } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
// import {} from '../utils/ScreenScaler';

import {theme} from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        paddingLeft: 15,
        paddingTop: 30,
        paddingRight:15,
    },
    generateButton:{
        width: screenWidth - 30,
        borderRadius:theme.borderRadius.size10,
        height: 42,
        marginBottom: 40,
    },
    generateText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },

    searchDate:{
        position:'absolute',
        top:8,
        left:14,
    },
    searchList:{
        height:500,
    },
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
        gap:(30),
        marginBottom:(12),
    },
    mainTitle:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    title: {
        fontSize: theme.fontSize.size18,
        fontWeight: 'bold',
        color: theme.colors.black,
        marginBottom: 20,
    },
    switchBtn: {
        width: 24,
        height: 24,
    },
    switchIcon: {
        width: 24,
        height: 24,
    },
    positionBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth - 30,
        marginBottom: 40,
    },
    buttonStyle: {
        borderWidth:1,
        height:moderateScale(30),
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(1),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:theme.borderRadius.size30,
        marginBottom: 30,
    },
    positionIcon: {
        width: 14,
        height: 14,
        marginRight: 2,
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
      startContainer:{
        alignSelf:'center',
      },
});
