
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    main:{
        height:'100%',
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    btns:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginTop:(18),
      marginBottom:8,
    },
    filters:{
        flexDirection:'row',
        alignItems:'center',
        gap:(8),

    },
    arrayBtn:{
      alignItems:'center',
    },
    galdaeList:{
        paddingTop:30,
        paddingHorizontal:15,
    },
    search:{
      width:'100%',
      justifyContent:'space-between',
    },
    searchBtn:{
      height:42,
      borderWidth:2,
      borderColor:theme.colors.lightGray,
      borderRadius:theme.borderRadius.size10,
    },
    searchText:{
      marginLeft:20,
      fontSize:theme.fontSize.size14,
      fontWeight:'500',
    },
    searchSVG:{
      marginRight:20,
    },
    scroll:{
        height:'75%',
    },
    nowGaldaeList:{
      marginTop:14,
      position:'relative',
      height:'100%',
    },
    noData:{
      height:'75%',
      alignItems:'center',
      justifyContent:'center',
      gap:12,
    },
    borderedListBox:{
      width:'100%',
      height:195,
      borderColor:theme.colors.gray0,
      borderRadius:theme.borderRadius.size10,
      borderWidth:1,
      paddingStart:24,
      paddingTop:14,
      marginBottom:12,
    },
    galdaeOwner:{
      fontSize:theme.fontSize.size12,
      fontWeight:'700',
    },
    fromContainer:{
      flexDirection:'row',
      marginTop:(8),
      gap:(8),
    },
    fromMainLocation:{
      fontSize:theme.fontSize.size16,
      fontWeight:'700',
    },
    fromSubLocation:{
      fontSize:theme.fontSize.size16,
      fontWeight:'500',
    },
    toContainer:{
      flexDirection:'row',
      gap:(8),
      marginTop:(7),
      alignItems:'center',
    },
    fromToLine:{
      width:(20),
      alignItems:'center',
    },
    tags:{
      flexDirection:'row',
      gap:(4),
      marginTop:(16),
      alignItems:'center',
    },
    timeContainer:{
      flexDirection:'row',
      gap:(8),
      marginTop:(6),
      alignItems:'center',
    },
});
