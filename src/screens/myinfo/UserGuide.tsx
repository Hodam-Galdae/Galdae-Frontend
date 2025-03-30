import React from 'react';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payment.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const UserGuide: React.FC<HomeProps> = () => {
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    return (
      <View style={styles.container}>
            <Header
            leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
            title={<BasicText text="이용 가이드" style={styles.headerText}/>}
            />

            <View style={styles.content}>
                <BasicText text="준비중입니다" style={styles.title}/>
            </View>
      </View>
    );
};

export default UserGuide;

