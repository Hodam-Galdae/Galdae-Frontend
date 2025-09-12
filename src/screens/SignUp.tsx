/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
// SignUp.tsx 테스트
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SignUp.style';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Agree from './Agree';
import SetUserInfo from './SetUserInfo';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import SVG from '../components/SVG';
import VerifySchool from './VerifySchool';
//import SchoolCardVerify from './SchoolCardVerify';
import EmailVerify from './EmailVerify';
import { RouteProp, useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import ContinueSignUp from './ContinueSignUp';
import VerifySchoolCode from './VerifySchoolCode';
import AlertWarning from '../components/popup/AlertWarning';
type RootStackParamList = {
  SignUp: { data: Readonly<boolean> };
  ReviewInProgress: undefined;
  MainTab: undefined;
  Login: undefined;
  TermsOfUseDetail: { index: number }
  ContinueSignUp: undefined;
  SetUserInfo: undefined;
  //SchoolCardVerify: undefined;
  EmailVerify: undefined;
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
export type StepName =
  | 'Login'
  | 'MainTab'
  | 'Agree'
  | 'VerifySchool'
  | 'ContinueSignUp'
  | 'SetUserInfo'
 // | 'SchoolCardVerify'
  | 'EmailVerify'
  | 'VerifySchoolCode';

type FlowKey = 'preference' | 'full';

const FLOW_STEPS: Record<FlowKey, StepName[]> = {
  preference: ['Agree', 'VerifySchool', 'ContinueSignUp'],
  full: ['Agree', 'VerifySchool', 'ContinueSignUp', 'EmailVerify','VerifySchoolCode','SetUserInfo' ],
};
const FULL_ONLY_STEPS: StepName[] = [  'EmailVerify', 'VerifySchoolCode','SetUserInfo'];

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'SignUp'>>();
  const [flow, setFlow] = useState<FlowKey>('preference');
  const [alertWarning, setAlertWarning] = useState<boolean>(false);

  const [nowStep, setNowStep] = useState<number>(0);
  const [nowPageName, setNowPageName] = useState<StepName>('Agree');
  const loaderValue = useRef(new Animated.Value(0)).current;
  const isJoinedRef = useRef(params.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const stepsInFlow = FLOW_STEPS[flow];
 // const currentIndex = stepsInFlow.indexOf(nowPageName);
  const setNextStepByName = (name: StepName | 'MainTab') => {
    if (name === 'MainTab') {
      navigation.replace('MainTab');
      return;
    }
    // 현재 flow가 'preference'이고, 목적지가 full 전용 스텝이면 flow 승격
    const nextFlow: FlowKey =
      flow === 'preference' && FULL_ONLY_STEPS.includes(name) ? 'full' : flow;

    // nextFlow로 steps 목록을 결정하고 인덱스 계산
    const nextSteps = FLOW_STEPS[nextFlow];
    const idx = nextSteps.indexOf(name);

    // 일관되게 한번에 상태 갱신
    setFlow(nextFlow);
    setNowPageName(name);
    if (idx !== -1) {setNowStep(idx);}
  };
  const width = loaderValue.interpolate({
    inputRange: [0, 100], // 0부터 100까지의 값이 들어오면
    outputRange: ['0%', '100%'], // 0% ~ 100%로 변경한다.
    extrapolate: 'clamp', //extrapolate은 clamp 으로 설정한다.
  });
  useEffect(() => {
    // 합격자 재가입 등 특정 진입 지점
    if (isJoinedRef.current) {
      setFlow('preference'); // or 'full' 원하는 정책에 따라
      setNowPageName('VerifySchool');
      setNowStep(stepsInFlow.indexOf('VerifySchool'));
    }
    // 이어하기 복구 (선택)
    // const resume = await AsyncStorage.getItem('signup_resume');
    // if (resume === 'SetUserInfo') { setFlow('full'); setNowPageName('SetUserInfo'); setNowStep(FLOW_STEPS.full.indexOf('SetUserInfo')); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goToTermsDetail = (data: number) => {
    let num = 0;
    if (data === 0) {
      num = 3;
    } else if (data === 1) {
      num = 1;
    } else if (data === 2) {
      num = 0;
    } else if (data === 3) {
      num = 2;
    }
    navigation.navigate('TermsOfUseDetail', { index: num });
  };

  useEffect(() => {
    if (isJoinedRef.current) {
      setNowPageName('VerifySchool');
      setNowStep(2);
    }
  }, []);

  const steps = [
    <Agree
      setNextStep={setNextStepByName}
      goTermsDetailPage={goToTermsDetail}
    />,
    <VerifySchool setNextStep={setNextStepByName} />,
    <ContinueSignUp setNextStep={setNextStepByName} />,
    <EmailVerify
      setIsLoading={setIsLoading}
      setNextStep={setNextStepByName}
      setUserInfo={setUserInfo}
    />,
    <VerifySchoolCode setIsLoading={setIsLoading} setNextStep={setNextStepByName} userInfo={userInfo}/>,
    <SetUserInfo setIsLoading={setIsLoading} setNextStep={setNextStepByName} />,
    // <SchoolCardVerify
    //   setIsLoading={setIsLoading}
    //   setNextStep={setNextStepByName}
    // />,
    
  ];
  const goBack = () => {
    if (nowStep === 0) {
      navigation.replace('Login');
    }
    else if (nowPageName === 'Agree') {
      setNowPageName('Login');
    }
    else if (nowPageName === 'VerifySchool') {
      setNowPageName('Agree');
    }
    else if (nowPageName === 'ContinueSignUp') {
      if (isJoinedRef.current) {
        navigation.replace('Login');
      }
      setNowPageName('VerifySchool');
    } else if (nowPageName === 'SetUserInfo') {
      setAlertWarning(true);
      
    } else if (nowPageName === 'EmailVerify') {
      setNowPageName('ContinueSignUp');
    } else if (nowPageName === 'VerifySchoolCode') {
      setNowPageName('EmailVerify');
    }
    // else if (nowPageName === 'SchoolCardVerify') {
    //   setNowPageName('EmailVerify');
    // }

    setNowStep(nowStep - 1);
  };

  const load = useCallback(
    (count: number) => {
      Animated.timing(loaderValue, {
        toValue: ((count + 1) / stepsInFlow.length) * 100, // 1-based 느낌으로 표시
        duration: 500,
        useNativeDriver: false,
      }).start();
    },
    [loaderValue, stepsInFlow.length],
  );

  useEffect(() => {
    load(nowStep);
  }, [load, nowStep]);



  const displayPage = (pageName: string) => {
    let result = 0;
    switch (pageName) {
      case 'Agree':
        result = 0;
        break;
      case 'VerifySchool':
        result = 1;
        break;
      case 'ContinueSignUp':
        result = 2;
        break;
        case 'EmailVerify':
        result = 3;
        break;
      case 'VerifySchoolCode':
        result = 4;
        break;
      case 'SetUserInfo':
        result = 5;
        break;
      // case 'SchoolCardVerify':
      //   result = 4;
      //   break;
      
    }
    return result;
  };

  useEffect(() => {
    load(nowStep);
  }, [load, nowStep]);



  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {alertWarning && <AlertWarning visible={alertWarning} onCancel={() => setAlertWarning(false)} onConfirm={() => {setAlertWarning(false); setNowPageName('ContinueSignUp')}}/>}
      <Header
        style={styles.headerStyle}
        title={<SVG name="GaldaeLogo" />}
        leftButton={
          <SVGButton
            onPress={goBack}
            iconName="arrow_left_line2"
            buttonStyle={{ width: 30, height: 30 }}
          />
        }
      />
      <View style={styles.bar}>
        <Animated.View style={{ ...styles.progress, width }} />
      </View>
      {steps[displayPage(nowPageName)]}
    </View>
  );
};

export default SignUp;
