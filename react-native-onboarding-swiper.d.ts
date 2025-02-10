// react-native-onboarding-swiper.d.ts
declare module 'react-native-onboarding-swiper' {
    import { ComponentType } from 'react';
    //import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

    interface OnboardingPage {
      backgroundColor: string;
      image: JSX.Element;
      title: string;
      subtitle: string;
    }

    interface OnboardingProps {
      pages: OnboardingPage[];
      onSkip?: () => void;
      onDone?: () => void;
      // 필요에 따라 추가 옵션들을 정의할 수 있습니다.
    }

    const Onboarding: ComponentType<OnboardingProps>;
    export default Onboarding;
  }
