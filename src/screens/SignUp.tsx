// SignUp.tsx 테스트
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/SignUp.style';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '../styles/theme';
import BasicText from '../components/BasicText';
import BasicButton from '../components/button/BasicButton';
import Agree from './Agree';
import SetUserInfo from './SetUserInfo';

type RootStackParamList = {
  Onboarding: undefined;
  CreateGaldae: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTab: undefined; // 메인 탭 네비게이터 화면
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

  const steps = [<Agree setNextStep={setNextStep} />, <SetUserInfo />];

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

  useEffect(() => {
    load(nowStep);
  }, [load, nowStep]);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Animated.View style={{...styles.progress, width}} />
      </View>
      {steps[nowStep]}
    </View>
  );
};

export default SignUp;
