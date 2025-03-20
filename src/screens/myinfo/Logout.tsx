import React from 'react';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Logout.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../styles/theme';

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
    WithDraw:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Logout: React.FC<HomeProps> = () => {
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const handleLogout = () =>{

    };
    const handleWithDraw = () =>{
      navigation.navigate('WithDraw');
    };
    return (
      <View style={styles.container}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="로그아웃" style={styles.headerText}/>}
        />
        <View style={styles.content}>
          <BasicText text="정말 로그아웃 할까요?" style={styles.title}/>
          <View style={styles.logoutBtnContainer}>
            <BasicButton
              text="회원탈퇴"
              buttonStyle={styles.logoutBtn}
              textStyle={styles.logoutText}
              //loading={loading}
              onPress={handleWithDraw}
              enabledColors={
                {
                  backgroundColor:theme.colors.white,
                  textColor:theme.colors.brandColor,
                  borderColor:theme.colors.brandColor,
                }
              }
            />
            <BasicButton
              text="로그아웃"
              buttonStyle={styles.logoutBtn}
              textStyle={styles.logoutText}
              //loading={loading}
              onPress={handleLogout}
            />
          </View>
        </View>

      </View>
    );
};

export default Logout;

