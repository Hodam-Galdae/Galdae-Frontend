// Onboarding.tsx 임시
import React from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

type OnboardingProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

const OnboardingScreen: React.FC<OnboardingProps> = ({ navigation }) => {
    const onboardingPath = '../assets/test.jpg';
    // 온보딩 완료 또는 건너뛰었을 때 호출할 함수
    const handleFinish = () => {
      navigation.replace('Home'); // 'Home' 스크린으로 전환
    };

    return (
      <Onboarding
        onSkip={handleFinish}
        onDone={handleFinish}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require(onboardingPath)} style={{ width: 200, height: 200 }} />,
            title: '환영합니다!',
            subtitle: '첫 번째 온보딩 화면입니다.',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require(onboardingPath)} style={{ width: 200, height: 200 }} />,
            title: '앱 소개',
            subtitle: '앱의 주요 기능을 소개합니다.',
          },
          {
            backgroundColor: '#e9bcbe',
            image: <Image source={require(onboardingPath)} style={{ width: 200, height: 200 }} />,
            title: '시작하기',
            subtitle: '지금 바로 사용해보세요!',
          },
        ]}
      />
    );
};

export default OnboardingScreen;
