/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  View,
} from 'react-native';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import styles from '../styles/EmailVerify.style';
import { theme } from '../styles/theme';
import { TextInput } from 'react-native-gesture-handler';
import {sendUniversityMail} from '../api/mailApi';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import { StepName } from './SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUniversityArea } from '../api/onboardingApi';
interface AgreeProps {
  setNextStep: (name: StepName) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}
type Errors = {
  email?: string;
  schoolNumber?: string;
  schoolDepartment?: string;
};
const EmailVerify: React.FC<AgreeProps> = ({ setNextStep, setIsLoading, setUserInfo }) => {
  const [email, setEmail] = useState<string>('');

  const [schoolNumber, setSchoolNumber] = useState<string>('');
  const [schoolDepartment, setSchoolDepartment] = useState<string>('');
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
  const [isVisibleNumberInput, setIsVisibleNumberInput] =
    useState<boolean>(false);
  const [number, setNumber] = useState<string>('');
  const userInfo = useSelector((state: RootState) => state.user);
  const [errors, setErrors] = useState<Errors>({});
  //setUserInfo({email: email, schoolNumber: schoolNumber, schoolDepartment: schoolDepartment});
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  // 학교 이메일만 허용하려면 아래처럼 사용:
  // const emailRegex = /^[^\s@]+@[^\s@]+\.ac\.kr$/i;

  const studentNoRegex = useMemo(() => /^\d{6,10}$/, []); // 6~10자리 숫자
  const deptRegex = useMemo(() => /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]{2,20}$/, []); // 한글/공백 2~20자

  const clickEvent = () => {
    if (!validateAndSetErrors()) {return;}
    sendEmail();
  };
  useEffect(() => {
    setUserInfo({email: email, schoolNumber: schoolNumber, schoolDepartment: schoolDepartment});
  }, [email, schoolNumber, schoolDepartment, setUserInfo]);

  // 게스트 모드에서 복구 시 대학 정보를 서버에 다시 전송
  useEffect(() => {
    const resyncUniversityInfo = async () => {
      try {
        const savedUniversity = await AsyncStorage.getItem('selectedUniversity');
        const savedUniversityArea = await AsyncStorage.getItem('selectedUniversityArea');

        if (savedUniversity && savedUniversityArea) {
          console.log('📤 [EmailVerify] 게스트 모드 복구 - 대학 정보 재전송:', {
            university: savedUniversity,
            universityArea: savedUniversityArea,
          });

          await selectUniversityArea({
            university: savedUniversity,
            universityArea: savedUniversityArea,
          });

          console.log('✅ [EmailVerify] 대학 정보 재전송 완료');
        }
      } catch (error) {
        console.error('❌ [EmailVerify] 대학 정보 재전송 실패 (무시):', error);
        // 실패해도 사용자는 계속 진행 가능
      }
    };

    resyncUniversityInfo();
  }, []);
  const sendEmail = async () => {

    if (emailRegex.test(email) && email.length > 0) {
      //이메일 보내기
      try{
        setIsLoading(true);
        // 대학 인증 메일 발송 api
        const isSuccess = await sendUniversityMail({
          email: email,
          studentId: schoolNumber,
          department: schoolDepartment,
        });
        if(isSuccess){ // 성공했을 시
          setNextStep('VerifySchoolCode');
        }
        else { // 실패
          Alert.alert('이메일을 확인해주세요.');
        }
      }
      catch (err: unknown) {
        setIsVisibleAlert(true);
      
        let message = '이메일을 확인해주세요.'; // 기본 문구
      
        if (axios.isAxiosError(err)) {
          // 서버에서 내려준 메시지
          if (err.response?.data?.message) {
            message = err.response.data.message;
          } else if (err.message) {
            message = err.message;
          }
        } else if (err instanceof Error) {
          message = err.message;
        }
      
        Alert.alert('오류', message);
      }
      finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('이메일을 확인해주세요.');
    }
  };
// 제출 시에만 에러 세팅
const validateAndSetErrors = () => {
  const next: Errors = {};
  if (!emailRegex.test(email)) {
    next.email = '*이메일 형식이 올바르지 않습니다.';
  }
  if (!studentNoRegex.test(schoolNumber)) {
    next.schoolNumber = '*학번이 올바르지 않습니다.';
  }
  if (!deptRegex.test(schoolDepartment)) {
    next.schoolDepartment = '*학과가 올바르지 않습니다.';
  }
  setErrors(next);
  return Object.keys(next).length === 0;
};

// 입력 핸들러(타이핑 시 해당 에러 즉시 해제)
const handleEmailChange = (t: string) => {
  setEmail(t);
  if (errors.email) {setErrors(prev => ({ ...prev, email: undefined }));}
};
const handleStudentNoChange = (t: string) => {
  const digits = t.replace(/\D/g, '');
  setSchoolNumber(digits);
  if (errors.schoolNumber) {setErrors(prev => ({ ...prev, schoolNumber: undefined }));}
};
const handleDeptChange = (t: string) => {
  const filtered = t.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '');
  setSchoolDepartment(filtered);
  if (errors.schoolDepartment) {setErrors(prev => ({ ...prev, schoolDepartment: undefined }));}
};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <BasicText style={styles.title} text="학생 인증" />
          <BasicText
            style={styles.subTitle}
            text="학교 이메일을 입력해 주세요."
          />
          <TextInput
            style={styles.input}
            placeholder=""
            editable={!isVisibleNumberInput}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {errors.email && (
            <BasicText style={styles.alert} text={errors.email} />
          )}
          <BasicText
            style={styles.subTitle}
            text="학번"
          />
          <TextInput
            style={styles.input}
            placeholder=""
            editable={!isVisibleNumberInput}
            value={schoolNumber || ''}
            onChangeText={handleStudentNoChange}
            keyboardType="numeric"
            maxLength={10}
          />
          {errors.schoolNumber && (
            <BasicText style={styles.alert} text={errors.schoolNumber} />
          )}
          <BasicText
            style={styles.subTitle}
            text="학과"
          />
          <TextInput
            style={styles.input}
            placeholder=""
            editable={!isVisibleNumberInput}
            value={schoolDepartment}
            onChangeText={handleDeptChange}
            keyboardType="default"
            maxLength={10}
          />
        </View>
        {errors.schoolDepartment && (
          <BasicText style={styles.alert} text={errors.schoolDepartment} />
        )}
        <View>
          <BasicText
            style={styles.redText}
            text="*허위 정보 입력, 사실과 다른 내용의 기재, 또는 타인의 개인정보를 무단으로 사용하는 경우 「형법」, 「개인정보 보호법」 등 관련 법령에 따라 민사상 손해배상 책임과 형사상 처벌을 받을 수 있습니다."
          />
        <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={!email || !schoolNumber || !schoolDepartment}
          disabledColors={{
            backgroundColor: theme.colors.grayV3,
            textColor: theme.colors.blackV0,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailVerify;
