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
import {RouteProp, useRoute} from '@react-navigation/native';
import Loading from '../components/Loading';

type RootStackParamList = {
  SignUp: {data: Readonly<boolean>};
  ReviewInProgress: undefined;
  MainTab: undefined;
  Login: undefined;
  TermsDetail: {data: number};
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'SignUp'>>();
  const [nowStep, setNowStep] = useState<number>(0);
  const [nowPageName, setNowPageName] = useState<string>('agree');
  const loaderValue = useRef(new Animated.Value(0)).current;
  const isJoinedRef = useRef(params.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setNextStepByName = (name: string) => {
    setNowPageName(name);
    setNowStep(nowStep + 1);
  };

  const goBack = () => {
    if (nowStep === 0) {
      navigation.replace('Login');
    } else if (nowPageName === 'setUserInfo') {
      setNowPageName('Agree');
    } else if (nowPageName === 'verifySchool') {
      if (isJoinedRef.current) {
        navigation.replace('Login');
      }
      setNowPageName('setUserInfo');
    } else if (nowPageName === 'schoolCardVerify') {
      setNowPageName('verifySchool');
    } else if (nowPageName === 'emailVerify') {
      setNowPageName('verifySchool');
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

  const goToTermsDetail = (data: number) => {
    navigation.navigate('TermsDetail', {data: data});
  };

  useEffect(() => {
    if (isJoinedRef.current) {
      setNowPageName('verifySchool');
      setNowStep(2);
    }
  }, []);

  const steps = [
    <Agree
      setNextStep={setNextStepByName}
      goTermsDetailPage={goToTermsDetail}
    />,
    <SetUserInfo setIsLoading={setIsLoading} setNextStep={setNextStepByName} />,
    <VerifySchool setNextStep={() => navigation.replace('MainTab')} />,
    <SchoolCardVerify
      setIsLoading={setIsLoading}
      setNextStep={() => navigation.replace('ReviewInProgress')}
    />,
    <EmailVerify
      setIsLoading={setIsLoading}
      setNextStep={() => navigation.replace('MainTab')}
    />,
  ];

  const displayPage = (pageName: string) => {
    let result = 0;
    switch (pageName) {
      case 'agree':
        result = 0;
        break;
      case 'setUserInfo':
        result = 1;
        break;
      case 'verifySchool':
        result = 2;
        break;
      case 'schoolCardVerify':
        result = 3;
        break;
      case 'emailVerify':
        result = 4;
        break;
    }
    return result;
  };

  useEffect(() => {
    load(nowStep);
  }, [load, nowStep]);

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
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
      {steps[displayPage(nowPageName)]}
    </View>
  );
};

export default SignUp;
