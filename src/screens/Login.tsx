/* eslint-disable react-native/no-inline-styles */
// Login.tsx
import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../api/membersApi';
import {useDispatch} from 'react-redux';
import {setUser} from '../modules/redux/slice/UserSlice';
import {fetchUserInfo} from '../modules/redux/slice/myInfoSlice';
import {AppDispatch} from '../modules/redux/store';
import Loading from '../components/Loading';
import appleAuth from '@invertase/react-native-apple-authentication';
import {requestUserPermission} from '../utils/notification';
import {updateFcmToken} from '../api/notiApi';

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
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleAuthSupported, setIsAppleAuthSupported] = useState(false);

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
      // 임시 디버깅용 에러 모달
      Alert.alert(
        '카카오 로그인 에러 (디버깅용)',
        JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
        [{text: '확인'}]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const naverResult = await NaverLogin.login();
      console.log('🔵 [네이버 로그인] 전체 응답:', naverResult);
      console.log('🔵 [네이버 로그인] successResponse:', naverResult.successResponse);
      console.log('🔵 [네이버 로그인] failureResponse:', naverResult.failureResponse);

      // 임시 디버깅: 전체 응답 확인
      if (!naverResult.successResponse) {
        Alert.alert(
          '네이버 로그인 디버깅',
          `successResponse가 없습니다.\n전체 응답: ${JSON.stringify(naverResult, null, 2)}`,
          [{text: '확인'}]
        );
        return;
      }

      // 임시 디버깅: accessToken 확인
      if (!naverResult.successResponse?.accessToken) {
        Alert.alert(
          '네이버 로그인 디버깅',
          `accessToken이 없습니다.\nsuccessResponse: ${JSON.stringify(naverResult.successResponse, null, 2)}`,
          [{text: '확인'}]
        );
        return;
      }

      const response = await loginWithNaver(naverResult.successResponse.accessToken);
      console.log('🔵 [네이버 로그인] 백엔드 응답:', response);
      await EncryptedStorage.setItem('accessToken', response.accessToken);
      await EncryptedStorage.setItem(
        'refreshToken',
        response.refreshToken || '',
      );
      handleGoNextPage(response);
    } catch (err) {
      console.error('login err : ', err);
      // 임시 디버깅용 에러 모달
      Alert.alert(
        '네이버 로그인 에러 (디버깅용)',
        JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
        [{text: '확인'}]
      );
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
    // 학생 인증 완료
    if (response.isJoined === true) {
      try {
        const user = await getUserInfo();

        // memberId 저장 (토큰 갱신에 필요)
        await EncryptedStorage.setItem('memberId', user.id);

        // 게스트 모드 플래그 제거 및 임시 백업 토큰 삭제 (로그인 완료)
        try {
          await AsyncStorage.removeItem('isGuestMode');
          await EncryptedStorage.removeItem('tempAccessToken');
          await EncryptedStorage.removeItem('tempRefreshToken');
          await EncryptedStorage.removeItem('tempMemberId');
          console.log('✅ [로그인] 게스트 모드 종료 및 임시 토큰 정리');
        } catch (removeError) {
          // iOS에서 존재하지 않는 키 삭제 시 에러 발생할 수 있음 (무시 가능)
          console.log('⚠️ [로그인] 임시 토큰 정리 실패 (무시 가능):', removeError);
        }

        // Redux에 사용자 정보 저장 (UserSlice - 기존 호환성 유지)
        dispatch(setUser({...user, token: 'Bearer ' + response.accessToken}));
        console.log('✅ [로그인] UserSlice 업데이트 완료');

        // myInfoSlice에도 사용자 정보 저장 (게스트 모드 자동 종료)
        try {
          await dispatch(fetchUserInfo()).unwrap();
          console.log('✅ [로그인] myInfoSlice 업데이트 완료 - 게스트 모드 자동 종료됨');
        } catch (userInfoError) {
          console.warn('⚠️ [로그인] myInfoSlice 업데이트 실패 (UserSlice는 업데이트됨):', userInfoError);
          // myInfoSlice 업데이트 실패 시에도 UserSlice는 업데이트되었으므로 계속 진행
        }

        // FCM 토큰 갱신 (권한 체크는 MainTab에서 수행)
        try {
          const fcmToken = await requestUserPermission();
          if (fcmToken) {
            await updateFcmToken(fcmToken);
            console.log('✅ [FCM 토큰] 갱신 성공');
          }
        } catch (fcmError) {
          console.error('⚠️ [FCM 토큰] 갱신 실패 (앱은 정상 동작):', fcmError);
          // FCM 토큰 갱신 실패는 치명적이지 않으므로 앱 실행은 계속 진행
        }

        // 메인 화면으로 이동
        navigation.replace('MainTab');
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        // 에러 발생 시 로그인 화면으로 돌아가기
        navigation.replace('Login');
      }
      return;
    }

    if (response.isJoined === false) {
      navigation.replace('SignUp', {data: response.isJoined});
      return;
    }
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

    // 애플 로그인 지원 여부 확인 (iOS 13+ only)
    setIsAppleAuthSupported(appleAuth.isSupported);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        {isAppleAuthSupported && (
          <TouchableOpacity onPress={signInWithApple}>
            <View style={[styles.button, {backgroundColor: theme.colors.blackV0}]}>
              <SVG style={styles.icon} name="Apple" />
              <BasicText
                style={[styles.btnText, {color: theme.colors.white}]}
                text="애플 로그인"
              />
            </View>
          </TouchableOpacity>
        )}
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
    </SafeAreaView>
  );
};

export default Login;
