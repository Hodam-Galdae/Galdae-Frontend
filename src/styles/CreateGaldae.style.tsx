
import { StyleSheet, Dimensions,Platform } from 'react-native';
import {moderateScale} from '../utils/ScreenScaler';
// import {} from '../utils/ScreenScaler';

import {theme} from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
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
    warnText: {
        fontWeight:'500',
        color: theme.colors.red,
        fontSize: theme.fontSize.size12,
        marginTop: 10,
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
        marginBottom: 12,
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
        marginBottom: 30,
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
    timeBox: {
        width: '100%',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        marginBottom: 30,
    },
    timeText: {
        fontSize: theme.fontSize.size18,
        color: theme.colors.black,
        fontWeight:'500',
    },
    subTitle: {
        color: theme.colors.gray1,
        fontSize: theme.fontSize.size14,
        marginBottom: 8,
    },
    additionalButton: {
        paddingHorizontal: 22,
        paddingVertical: 6,
        backgroundColor: theme.colors.lightGray,
        marginRight: 8,
    },
    additionalButtonText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.gray1,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:8,
        marginBottom: 20,
    },
    selectBtn:{
        paddingVertical:6,
        paddingHorizontal:22,
    },
    selectText:{
      fontWeight:'500',
      fontSize:theme.fontSize.size14,
    },
    additionalIcon: {
        marginRight: 4,
        width: 12,
        height: 12,
    },
    personWrapper: {
        width: screenWidth - 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 90,
    },
    personBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personText: {
        fontSize: theme.fontSize.size18,
        color: theme.colors.black,
        marginRight: 4,
        fontWeight:'700',
    },
    personSubText: {
        fontSize: theme.fontSize.size14,
        color: theme.colors.gray1,
        fontWeight:'500',
    },
    plusBtn: {
        width: 26,
        height: 26,
        backgroundColor: theme.colors.gray0,
        borderRadius: 999,
    },
    plusIcon: {
        width: 16,
        height: 16,
    },
    numberText: {
        fontSize: theme.fontSize.size24,
        color: theme.colors.black,
        marginHorizontal: 10,
    },
    oftenBox: {
        width: screenWidth - 30,
        height: 43,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.lightGray,
        borderRadius: 10,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    checkBtn: {
        marginLeft: 16,
        marginRight: 10,
    },
    checkText: {
        fontSize: theme.fontSize.size16,
        color: theme.colors.gray1,
    },
});
