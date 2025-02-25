
import { StyleSheet ,Platform} from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({

    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
        lineHeight: Platform.select({
          android: 40,
        }),
    },
    main:{
       flex:1,
    },
    galdaeList:{
        paddingVertical:30,
        paddingHorizontal:15,
        flex:1,
    },

    nowGaldaeList:{
      marginTop:14,
      position:'relative',
    },
    noData:{
      height:'100%',
      alignItems:'center',
      justifyContent:'center',
      gap:12,
    },

});
