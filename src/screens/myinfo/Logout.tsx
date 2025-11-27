import React from 'react';
import {View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../modules/redux/store';
import {resetUser} from '../../modules/redux/slice/UserSlice';
import styles from '../../styles/Logout.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '../../styles/theme';
import {logoutMember} from '../../api/membersApi';

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

type nowGaldaeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Logout: React.FC<HomeProps> = () => {
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const goBack = () => navigation.goBack();

  const handleLogout = async () => {
    try {
      // 1. 백엔드에 로그아웃 요청 (실패해도 계속 진행)
      try {
        await logoutMember();
      } catch (apiError) {
        // API 호출 실패는 무시 (이미 토큰이 만료되었을 수 있음)
        console.log('로그아웃 API 호출 실패 (무시하고 계속 진행):', apiError);
      }

      // 2. EncryptedStorage 완전히 초기화
      try {
        await EncryptedStorage.clear();
        console.log('✅ EncryptedStorage 완전히 초기화됨');
      } catch (e) {
        console.log('EncryptedStorage 초기화 실패 (무시):', e);
      }

      // 3. AsyncStorage 완전히 초기화
      try {
        await AsyncStorage.clear();
        console.log('✅ AsyncStorage 완전히 초기화됨');
      } catch (e) {
        console.log('AsyncStorage 초기화 실패 (무시):', e);
      }

      // 4. Redux 전체 상태 초기화
      dispatch({type: 'RESET_ALL'});
      console.log('✅ Redux 상태 완전히 초기화됨');

      // 5. 로그인 화면으로 이동 (네비게이션 스택 리셋)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );

      Alert.alert('로그아웃', '정상적으로 로그아웃 되었습니다');
    } catch (error) {
      console.error('로그아웃 처리 중 치명적 오류:', error);
      // 치명적 오류가 발생해도 로그인 화면으로 보냄
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
  };

  const handleWithDraw = () => {
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
                  textColor:theme.colors.Galdae,
                  borderColor:theme.colors.Galdae,
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

