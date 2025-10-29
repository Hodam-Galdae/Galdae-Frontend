import React from 'react';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/TermsOfUse.style';
import Header from '../../components/Header';
import SVGTextButton from '../../components/button/SVGTextButton';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import {theme} from '../../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  TermsOfUseDetail: {index:number}
};
type menu = {
  text:string,
  onPress: ()=> void,
}
type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const TermsOfUse: React.FC<HomeProps> = () => {
  const menus:menu[] = [
    {text: '개인정보 취급방침', onPress: ()=>{navigation.navigate('TermsOfUseDetail',{index: 0});}},
    {text: '위치기반 서비스', onPress: ()=>{navigation.navigate('TermsOfUseDetail',{index: 1});}},
    {text: '전체 이용약관', onPress: ()=>{navigation.navigate('TermsOfUseDetail',{index: 2});}},
    {text: '서비스 이용약관', onPress: ()=>{navigation.navigate('TermsOfUseDetail',{index: 3});}},
    {text: '계정 탈퇴안내', onPress: ()=>{navigation.navigate('TermsOfUseDetail',{index: 4});}},

  ];
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack}/>}
            title={<BasicText text="이용약관" style={styles.headerText}/>}
            style={styles.headerStyle}
            />

            <View style={styles.content}>
            <View style={styles.myInfos}>
          {menus.map(menu=>(
            <SVGTextButton
            key={menu.text}
            text={menu.text}
            iconName="right_line"
            iconPosition="right"
            style={styles.search}
            textStyle={styles.searchText}
            SVGStyle={styles.searchSVG}
            enabledColors={
              {
                backgroundColor:theme.colors.white,
                textColor:theme.colors.grayV2,
              }
            }
            onPress={menu.onPress}
          />
          ))}
        </View>
            </View>
      </View>
    );
};

export default TermsOfUse;

