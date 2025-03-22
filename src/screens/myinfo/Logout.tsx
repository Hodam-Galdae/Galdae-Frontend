import React from 'react';
import {  View ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Logout.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../styles/theme';
import { logoutMember } from '../../api/membersApi';
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
    Login: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Logout: React.FC<HomeProps> = () => {
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    const handleLogout = async () => {
      // 실제 프로젝트에서는 토큰을 Redux나 AsyncStorage 등에서 가져옵니다.
      const token = 'Bearer your-access-token'; // 실제 엑세스 토큰으로 대체
      try {
        await logoutMember(token);
        // 로그아웃 성공 시, 상태 초기화 후 로그인 화면으로 이동하거나 적절히 처리합니다.
        Alert.alert('로그아웃', '정상적으로 로그아웃 되었습니다.');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('로그아웃 실패', '로그아웃에 실패하였습니다. 다시 시도해주세요.');
      }
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

