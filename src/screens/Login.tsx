/* eslint-disable react-native/no-inline-styles */
// Login.tsx
import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styles from '../styles/Login.style';
import {theme} from '../styles/theme';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import {login} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  // loginWithGoogle,
  loginWithKakao,
  loginWithNaver,
  AuthResponse,
  loginWithApple,
} from '../api/authApi';
import NaverLogin from '@react-native-seoul/naver-login';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUserInfo} from '../api/membersApi';
import {useDispatch} from 'react-redux';
import {setUser} from '../modules/redux/slice/UserSlice';
import Loading from '../components/Loading';
import appleAuth from '@invertase/react-native-apple-authentication';

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  ReviewInProgress: undefined;
  Login: undefined;
  SignUp: {data: Readonly<boolean>};
  MainTab: undefined; // 메인 탭 네비게이터 화면
};

// 로그인 화면에 사용할 네비게이션 타입 지정 (Login 스크린의 네비게이션 객체)
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC = () => {
  // useNavigation에 LoginScreenNavigationProp 제네릭을 적용합니다.
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithKakao = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = (await login()).accessToken;
      const response = await loginWithKakao(token);
      console.log('🔵 [카카오 로그인] 성공:', response);
      await EncryptedStorage.setItem('accessToken', response.accessToken);
      await EncryptedStorage.setItem(
        'refreshToken',
        response.refreshToken || '',
      );
      handleGoNextPage(response);
    } catch (err) {
      console.error('login err : ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { successResponse } = await NaverLogin.login();
      console.log('🔵 [네이버 로그인] 성공:', successResponse);
      const response = await loginWithNaver(successResponse?.accessToken || '');
      console.log('🔵 [네이버 로그인] 성공:', response);
      await EncryptedStorage.setItem('accessToken', response.accessToken);
      await EncryptedStorage.setItem(
        'refreshToken',
        response.refreshToken || '',
      );
      handleGoNextPage(response);
    } catch (err) {
      console.error('login err : ', err);
    } finally {
      setIsLoading(false);
    }
  };

  // const signInWithGoogle = async (): Promise<void> => {
  //   try {
  //     setIsLoading(true);
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     await GoogleSignin.signIn();
  //     const {accessToken} = await GoogleSignin.getTokens();
  //     const response = await loginWithGoogle(accessToken || '');
  //     await EncryptedStorage.setItem('accessToken', response.accessToken);
  //     await EncryptedStorage.setItem(
  //       'refreshToken',
  //       response.refreshToken || '',
  //     );
  //     handleGoNextPage(response);
  //   } catch (err) {
  //    // console.error('login err : ', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const signInWithApple = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        nonceEnabled: false,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {authorizationCode} = appleAuthRequestResponse;
        const response = await loginWithApple(authorizationCode || '');
        console.log('🔵 [애플 로그인] 성공:', response);
        await EncryptedStorage.setItem('accessToken', response.accessToken);
        await EncryptedStorage.setItem(
          'refreshToken',
          response.refreshToken || '',
        );
        handleGoNextPage(response);
      }
    } catch (err) {
      console.error('login err : ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoNextPage = async (response: AuthResponse) => {
    const user = await getUserInfo();
    console.log('🔵 [handleGoNextPage] 성공:', user);
    await EncryptedStorage.setItem('memberId', user.id);
    dispatch(setUser({...user, token: 'Bearer ' + response.accessToken}));
    console.log('🔵 [handleGoNextPage] response:', response);
    // 학생 인증 완료
    if (response.isSelectedUniversity === true) {
      console.log('🔵 [handleGoNextPage] 인증:', response.isJoined);
      navigation.replace('MainTab');
      return;
    }

    if (response.isSelectedUniversity === false) {
      console.log('🔵 [handleGoNextPage] 미인증:', response.isJoined);
      navigation.replace('SignUp', {data: response.isJoined});
      return;
    }

    // if (response.isAuthenticated === 'PENDING') {
    //   console.log('🔵 [handleGoNextPage] 대기:', response.isJoined);
    //   navigation.replace('ReviewInProgress');
    //   return;
    // }
  };

  const images = [
    require('../assets/school/school1.png'),
    require('../assets/school/school2.png'),
    require('../assets/school/school3.png'),
    require('../assets/school/school4.png'),
  ];

  useEffect(() => {
    //TODO: 환경변수
    GoogleSignin.configure({
      webClientId:
        '1034543222691-3m9roadnkpqs562p6q2dj3qblv2ps69h.apps.googleusercontent.com',
    });

    NaverLogin.initialize({
      appName: '갈대',
      consumerKey: 'dOTesTTr7nptiY1g3mc_',
      consumerSecret: 'RUk2LWOr4F',
      serviceUrlSchemeIOS: 'com.hodam.galdaeApp',
      disableNaverAppAuthIOS: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.allImagesImage}>
        <Swiper
          controlsProps={{
            dotActiveStyle: {backgroundColor: theme.colors.white},
            nextTitle: '',
            prevTitle: '',
          }}
          containerStyle={styles.allImagesImage}>
          {images.map((item, i) => (
            <View key={i}>
              <Image source={item} style={styles.allImagesImage} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={{alignItems: 'center'}}>
        <BasicText text="안녕하세요" style={styles.title} />
        <BasicText
          text="같이 갈 그대,"
          style={{
            ...styles.title,
            color: theme.colors.Galdae,
            marginBottom: 39,
          }}
        />
        <View style={styles.textWrapper}>
          <SVG name="GaldaeLogo" />
          <BasicText text="입니다" style={{...styles.title, marginLeft: 10}} />
        </View>
      </View>

      <View style={{marginBottom: 30}}>
        <TouchableOpacity onPress={signInWithApple}>
          <View style={[styles.button, {backgroundColor: theme.colors.blackV0}]}>
            <SVG style={styles.icon} name="Apple" />
            <BasicText
              style={[styles.btnText, {color: theme.colors.white}]}
              text="애플 로그인"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithNaver}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: '#03C75A',
              },
            ]}>
            <SVG style={styles.icon} name="Naver" />
            <BasicText style={[styles.btnText, {color: theme.colors.white}]} text="네이버 로그인" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithKakao}>
          <View style={[styles.button, {backgroundColor: '#FEE500'}]}>
            <SVG style={styles.icon} name="Kakao" />
            <BasicText style={styles.btnText} text="카카오 로그인" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
