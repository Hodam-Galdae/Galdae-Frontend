/* eslint-disable react-native/no-inline-styles */
// Login.tsx
import React, {useEffect} from 'react';
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
import { loginWithGoogle, loginWithKakao } from '../api/authApi';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../modules/redux/slice/UserSlice'; // Redux 액션 가져오기

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  Onboarding: undefined;
  CreateGaldae: undefined;
  Login: undefined;
  SignUp: undefined;
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
  const dispatch = useDispatch(); // Redux dispatch 사용

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = (await login()).accessToken;
      const response = await loginWithKakao(token);
      dispatch(setAccessToken(response.accessToken));
      await EncryptedStorage.setItem('accessToken', response.accessToken);
      await EncryptedStorage.setItem('refreshToken', response.refreshToken || '');
      console.log('access token : ' + response.accessToken);
      console.log('refresh token : ' + response.accessToken);
      handleGoToSignUp();
    } catch (err) {
      console.error('login err : ', err);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
      // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // const token = (await GoogleSignin.signIn()).data?.idToken;
      // console.log(token);
      // if(token === null) {
      //   //로그인 에러
      //   return;
      // }
      // const result = await loginWithGoogle(token || '');
      // console.log("api" + result.accessToken);
  };

  const handleGoToSignUp = () => {
    // 로그인 로직 수행 후 메인 탭 네비게이터로 이동 (replace 메서드 사용 가능)
    //navigation.replace('SignUp');
    navigation.navigate('MainTab');
  };

  const images = [
    require('../assets/test.jpg'),
    require('../assets/test.jpg'),
    require('../assets/test.jpg'),
  ];

  useEffect(() => {
    //TODO: 환경변수
    GoogleSignin.configure({
      webClientId:
        '1034543222691-3m9roadnkpqs562p6q2dj3qblv2ps69h.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.container}>
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
            color: theme.colors.brandColor,
            marginBottom: 39,
          }}
        />
        <View style={styles.textWrapper}>
          <SVG name="GaldaeLogo" />
          <BasicText text="입니다." style={{...styles.title, marginLeft: 10}} />
        </View>
      </View>

      <View style={{marginBottom: 30}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.button, {backgroundColor: theme.colors.black}]}>
            <SVG style={styles.icon} name="Apple" />
            <BasicText
              style={[styles.btnText, {color: theme.colors.white}]}
              text="Sign in with Apple"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithGoogle}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.white,
                borderWidth: 1,
                borderColor: '#747775',
              },
            ]}>
            <SVG style={styles.icon} name="Google" />
            <BasicText style={styles.btnText} text="Sign in with Google" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signInWithKakao}>
          <View style={[styles.button, {backgroundColor: '#FEE500'}]}>
            <SVG style={styles.icon} name="Kakao" />
            <BasicText text="Sign in with Kakao" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
