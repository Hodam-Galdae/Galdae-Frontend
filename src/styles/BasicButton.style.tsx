import { StyleSheet } from 'react-native';
//import {} from '../utils/ScreenScaler';
import { theme } from './theme';

export default StyleSheet.create({
    buttonContainer: {
        borderRadius:theme.borderRadius.size10,
        borderWidth: 0,
        // width: (345),
        // height: (42),
      },
    buttonText:{
        fontSize:theme.fontSize.size16,
        fontWeight: '500',
    },
    contentContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 필요에 따라 가운데 정렬
    },
});
