import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent:'space-between',
        height: 73,
        width: 33,
        marginHorizontal: 7,
      },
      big: {
        fontWeight: '500',
        fontSize:theme.fontSize.size16,
      },
      medium: {
        fontSize:theme.fontSize.size18,
      },
      circle:{
        marginBottom:7,
      },
      clickedCircle:{
        backgroundColor: theme.colors.blue,
        fontWeight:'700',
        borderRadius:'50%',
        position:'absolute',
        bottom:0,
        marginBottom:0,
        width:33,
        height:33,
        justifyContent: 'center',
        alignItems: 'center',
      },
      clickedDate:{
        color: theme.colors.white,
        fontWeight:'700',
        fontSize: theme.fontSize.size18,
        justifyContent: 'center',
        alignItems: 'center',
      },

      title: {
        fontSize:theme.fontSize.size16,
        fontWeight: '500',
      },
      dateSection: {
       marginTop:16,
      },
      scroll: {
        //height: 150,
      },
});
