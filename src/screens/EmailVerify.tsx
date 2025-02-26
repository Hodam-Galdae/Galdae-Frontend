import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import styles from '../styles/EmailVerify.style';
import { theme } from '../styles/theme';
import { TextInput } from 'react-native-gesture-handler';

interface AgreeProps {
  setNextStep: () => void;
}

const EmailVerify: React.FC<AgreeProps> = ({setNextStep}) => {
  const [email, setEmail] = useState<string>('');
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
  const [isVisibleNumberInput, setIsVisibleNumberInput] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('');

  const clickEvent = () => {
    if(!isVisibleNumberInput) {
      sendEmail();
    }
    else {
      verify();
    }
  };

  const sendEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(email) && email.length > 0){
      //이메일 보내기
      setIsVisibleNumberInput(true);
      setIsVisibleAlert(false);
    }
    else{
      setIsVisibleAlert(true);
    }
  };

  const verify = () => {
    if(number.length === 0) {
      return;
    }
    //인증

    setNextStep();
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText style={styles.title} text="이메일 인증"/>
        <BasicText style={styles.subTitle} text="사용중인 대학교 이메일을 입력해주세요."/>
        <TextInput style={styles.input} placeholder="이메일 입력" value={email} onChangeText={setEmail}/>
        {isVisibleAlert ? <BasicText style={styles.alert} text="*정확한 대학교 이메일을 입력해주세요."/> : null}
        {isVisibleNumberInput ? <TextInput style={styles.input} placeholder="인증 번호 입력" value={number} onChangeText={setNumber}/> : null}
        {isVisibleNumberInput ? <View>
          <BasicText style={styles.verifyText} text="인증 코드가 오지 않았나요?"/>
          <TouchableOpacity onPress={sendEmail}>
            <BasicText style={styles.againText} text="재전송"/>
          </TouchableOpacity>
        </View> : null}
      </View>
      <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={isVisibleNumberInput ? number.length === 0 : email.length === 0}
          disabledColors={{
            backgroundColor: theme.colors.lightGray,
            textColor: theme.colors.black,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
    </View>
  );
};

export default EmailVerify;
