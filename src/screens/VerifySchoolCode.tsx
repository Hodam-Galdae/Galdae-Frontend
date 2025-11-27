/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import React, { useRef, useState } from 'react';
import {
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
} from 'react-native';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import styles from '../styles/EmailVerify.style';
import { theme } from '../styles/theme';
import { TextInput } from 'react-native-gesture-handler';
import { verifyUniversity } from '../api/mailApi';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer';
import { StepName } from './SignUp';
import { sendUniversityMail } from '../api/mailApi';

interface AgreeProps {
    setNextStep: (name: StepName) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: any;
}

const VerifySchoolCode: React.FC<AgreeProps> = ({ setNextStep, setIsLoading, userInfo }) => {
    const [code, setCode] = useState<string[]>(['', '', '', '']);

   // const userInfo = useSelector((state: RootState) => state.user);
    const refs = useRef<TextInput[]>([]);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);
    const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
    const clickEvent = async () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            setIsClicked(true);
            try {
                setIsLoading(true);
                const result = await verifyUniversity({ code: fullCode });
                if (result) {
                    setIsCodeCorrect(true);
                    //setNextStep('MainTab');
                } else {

                    setIsCodeCorrect(false);
                }
            } catch (err) {

                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCodeChange = (index: number, text: string) => {
        // 숫자만 허용하고 1자리로 제한
        const filtered = text.replace(/[^0-9]/g, '').slice(0, 1);
        const newCode = [...code];
        newCode[index] = filtered;
        setCode(newCode);

        // 다음 입력 필드로 자동 이동
        if (filtered && index < 3) {
            // 다음 입력 필드에 포커스 (실제로는 ref를 사용해야 함)
            refs.current[index + 1].focus();
        }
    };
    const sendEmail = async () => {

        if (userInfo.email.length > 0) {
            //이메일 보내기
            try {
                setIsLoading(true);
                // 대학 인증 메일 발송 api
                const isSuccess = await sendUniversityMail({
                    email: userInfo.email,
                    studentId: userInfo.schoolNumber,
                    department: userInfo.schoolDepartment,
                });
                if (isSuccess) { // 성공했을 시
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
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <BasicText style={styles.title} text="학생 인증" />
                    <BasicText
                        style={styles.subTitle}
                        text="학교 이메일로 온 코드를 입력해 주세요"
                    />
                    <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={isCodeCorrect === null ? styles.codeInput : isCodeCorrect === true ? styles.codeInputSuccess : styles.codeInputError}
                                value={digit}
                                onChangeText={(text) => handleCodeChange(index, text)}
                                keyboardType="numeric"
                                maxLength={1}
                                textAlign="center"
                                selectTextOnFocus
                                ref={(el) => refs.current[index] = el as TextInput}
                            />
                        ))}
                    </View>
                    {isCodeCorrect === false && isClicked && (
                        <BasicText style={styles.alert} text="*인증 코드가 틀렸습니다." />
                    )}
                    {isCodeCorrect === true && isClicked && (
                        <BasicText style={styles.successText} text="*인증이 완료되었습니다." />
                    )}
                    <BasicButton text="인증확인" onPress={clickEvent} buttonStyle={styles.againButton} textStyle={styles.againText2} />

                    <BasicText style={styles.noCodeText} text="인증코드가 오지 않았나요?" />
                    <BasicText style={styles.resendText} text="재전송" onPress={() => sendEmail()} />
                </View>
                <View>
                    <BasicButton
                        text="다음"
                        onPress={() => setNextStep('SetUserInfo')}
                        disabled={code.join('').length !== 4 || !isCodeCorrect === true}
                        disabledColors={{
                            backgroundColor: theme.colors.grayV2,
                            textColor: theme.colors.grayV0,
                        }}
                        buttonStyle={styles.nextButton}
                        textStyle={styles.nextText}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default VerifySchoolCode;
