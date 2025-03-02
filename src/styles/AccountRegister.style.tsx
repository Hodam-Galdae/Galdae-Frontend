
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
        paddingTop:30,
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    title:{
        fontSize:theme.fontSize.size20,
        fontWeight:'700',
        marginBottom:12,
    },
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
        borderRadius: theme.borderRadius.size10,
        marginBottom: 20,
      },
    input:{
        height:42,
        paddingHorizontal:20,
        fontSize:theme.fontSize.size14,
        color:theme.colors.gray2,
        fontWeight:'500',
        marginBottom:8,
    },
    // 은행 선택 드롭다운 스타일
  bankPickerContainer: {
    marginBottom: 40,
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.size10,
    backgroundColor: theme.colors.white,
  },
  bankSVGText:{
    flexDirection:'row',
    gap:8,
  },
  bankPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 42,
  },
  bankPickerText: {
    fontSize: theme.fontSize.size14,
    color: theme.colors.gray2,
    fontWeight:'500',
  },
  bankPickerIcon: {
    // 아이콘에 여백을 주고 싶다면 추가
    // marginLeft: 8,
    width:20,
    height:20,
  },
  bankDropdown: {
    height:300,
  },
  bankDropdownItem: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    flexDirection:'row',
    gap:8,
    alignItems:'center',

  },
  bankDropdownText: {
    fontSize: theme.fontSize.size14,
    color:theme.colors.gray2,
  },
    completeBtnContainer:{
      alignSelf:'center',
      position:'absolute',
      width:'100%',
      gap:10,
      bottom:40,
    },
    completeBtn:{
        width:'100%',
        borderRadius:theme.borderRadius.size10,
        height:42,
        borderWidth:2,
    },
    completeText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '700',
    },
});
