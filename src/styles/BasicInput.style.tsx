import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import {theme} from '../styles/theme';

export default StyleSheet.create({
    input: {
        //width: '90%',
        height: 40,
        borderWidth:2,
        borderColor: theme.colors.lightGray,
        paddingHorizontal:12,
        borderRadius:theme.borderRadius.size10,
        fontSize: theme.fontSize.size16,
        fontWeight:'500',
      },
});
