
// MyInfo.tsx 테스트
import React, { } from 'react';
import { View } from 'react-native';
import styles from '../styles/ContinueSignUp.style';
import BasicText from '../components/BasicText';
import BasicButton from '../components/button/BasicButton';
import { StepName } from './SignUp';
interface ContinueSignUpProps {
  setNextStep: (name: StepName) => void;
}


const ContinueSignUp: React.FC<ContinueSignUpProps> = ({ setNextStep }) => {


  return (
    <View style={styles.container}>

      <BasicText style={styles.title}>원할한 서비스 이용을 위해</BasicText>
      <BasicText style={styles.title}>회원가입을 진행해 주세요.</BasicText>

      <BasicButton
        text="회원가입 계속하기"
        onPress={() => setNextStep('EmailVerify')}
        buttonStyle={styles.nextButton}
        textStyle={styles.nextText}
      />

      <BasicButton
        text="둘러보기"
        onPress={() => setNextStep('MainTab' as StepName)}
        buttonStyle={styles.mainButton}
        textStyle={styles.mainText}
      />
    </View>
  );
};

export default ContinueSignUp;
