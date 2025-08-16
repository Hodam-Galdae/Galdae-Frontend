import { StyleSheet } from 'react-native';
import { theme } from './theme';
//import { theme } from './theme';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        marginVertical: 16,
        gap:12,
      },
      amPm:{
        flexDirection:'row',
        gap:8,
      },
      amPmBtn:{
        paddingVertical:6,
        paddingHorizontal:22,
      },
      amPmText:{
        fontWeight:'500',
        fontSize:theme.fontSize.size14,
      },
      pickContainer:{
        flex: 1,
      },
      pickerButton: {
        //flex: 1, // 부모 컨테이너의 사용 가능한 공간을 모두 차지
        flexDirection: 'row', // 아이템들을 가로로 배치
        justifyContent: 'space-between', // 양 끝으로 배치
        paddingVertical: 6,
        borderWidth: 2,
        borderColor: theme.colors.grayV3,
        borderRadius: theme.borderRadius.size10,
        //width: '100%',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
      },
      pickBtn:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
      },
      pickerButtonText: {
        fontSize: theme.fontSize.size22,
        color: theme.colors.blackV0,
        marginLeft:26,
      },
      upDownIcon:{
        marginRight:15,
      },
      separate: {
        height:20,
      },
      dropdownMenu: {
        position: 'absolute',
        top: 37, // 버튼 아래쪽에 나타나도록 조정 (버튼 높이에 따라 조절)
        width: '100%',
        maxHeight: 125,
        backgroundColor: theme.colors.white,
        borderWidth: 2,
        borderTopWidth:0,
        borderColor: theme.colors.grayV3,
        borderBottomLeftRadius:10,
        borderBottomEndRadius: 10,
        zIndex: 100,
      },
      dropdownItem: {
        paddingVertical: 3,
        paddingHorizontal: 26,
      },
      dropdownItemText: {
        fontSize: theme.fontSize.size22,
        color: theme.colors.blackV0,
        fontWeight:'500',
      },
});
