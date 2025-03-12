// SignUp.tsx 테스트
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/SignUp.style';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Agree from './Agree';
import SetUserInfo from './SetUserInfo';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import SVG from '../components/SVG';
import VerifySchool from './VerifySchool';
import SchoolCardVerify from './SchoolCardVerify';
import EmailVerify from './EmailVerify';

type RootStackParamList = {
  SignUp: undefined;
  ReviewInProgress: undefined;
  MainTab: undefined;
  Login: undefined;
  TermsDetail: {data: string};
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [nowStep, setNowStep] = useState<number>(0);
  const loaderValue = useRef(new Animated.Value(0)).current;

  const setNextStep = () => {
    setNowStep(nowStep + 1);
  };

  const setNextStepByIndex = (index: number) => {
    setNowStep(index);
  };

  const goBack = () => {
    if (nowStep === 0) {
      navigation.replace('Login');
      return;
    }
    if (nowStep === 4) {
      setNowStep(2);
      return;
    }

    setNowStep(nowStep - 1);
  };

  const load = useCallback(
    (count: number) => {
      Animated.timing(loaderValue, {
        toValue: (count / steps.length) * 100,
        duration: 500, // 애니메이션이 진행되는 시간
        useNativeDriver: false,
      }).start();
    },
    [loaderValue],
  );

  const width = loaderValue.interpolate({
    inputRange: [0, 100], // 0부터 100까지의 값이 들어오면
    outputRange: ['0%', '100%'], // 0% ~ 100%로 변경한다.
    extrapolate: 'clamp', //extrapolate은 clamp 으로 설정한다.
  });

  const goToTermsDetail = (data: string) => {
    navigation.navigate('TermsDetail', {data: data});
  };

  useEffect(() => {
    load(nowStep);
  }, [load, nowStep]);

  const steps = [
    <Agree setNextStep={setNextStep} goTermsDetailPage={goToTermsDetail} />,
    <SetUserInfo setNextStep={setNextStep} />,
    <VerifySchool setNextStep={setNextStepByIndex} />,
    <SchoolCardVerify
      setNextStep={() => navigation.replace('ReviewInProgress')}
    />,
    <EmailVerify setNextStep={() => navigation.replace('MainTab')} />,
  ];

  return (
    <View style={styles.container}>
      <Header
        title={<SVG name="GaldaeLogo" />}
        leftButton={
          <SVGButton
            onPress={goBack}
            iconName="LeftArrow"
            buttonStyle={{width: 30, height: 30}}
          />
        }
      />
      <View style={styles.bar}>
        <Animated.View style={{...styles.progress, width}} />
      </View>
      {steps[nowStep]}
    </View>
  );
};

export default SignUp;
