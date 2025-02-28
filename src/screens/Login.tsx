// Login.tsx
import React from 'react';
import {View, Button, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';
import styles from '../styles/Login.style';
import {theme} from '../styles/theme';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
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

  const handleGoToMainTab = () => {
    // 로그인 로직 수행 후 메인 탭 네비게이터로 이동 (replace 메서드 사용 가능)
    navigation.replace('SignUp');
    // navigation.navigate('MainTab');
  };

  const images = [
    require('../assets/test.jpg'),
    require('../assets/test.jpg'),
    require('../assets/test.jpg'),
  ];

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
            <View>
              <Image key={i} source={item} style={styles.allImagesImage} />
            </View>
          ))}
        </Swiper>
      </View>
      <BasicText text="안녕하세요" style={{...styles.title, marginTop: 98}} />
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
      <Button title="로그인" onPress={handleGoToMainTab} />
    </View>
  );
};

export default Login;
