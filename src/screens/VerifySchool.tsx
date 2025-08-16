// MyInfo.tsx 테스트
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BasicButton from '../components/button/BasicButton';
import {theme} from '../styles/theme';
import styles from '../styles/VerifySchool.style';
import BasicText from '../components/BasicText';
import ItemSelector from '../components/ItemSelector';
import { useDispatch } from 'react-redux';
import { setUniversity } from '../modules/redux/slice/UserSlice';
import { getSchool, emailVerify } from '../api/authApi';

interface VerifySchoolProps {
  setNextStep: () => void;
}
 
const VerifySchool: React.FC<VerifySchoolProps> = ({setNextStep}) => {
  const [schoolSelected, setSchoolSelected] = useState<number>(-1);
  const [methodSelected, setMethodSelected] = useState<number>(-1);
  const dispatch = useDispatch();
  const [isVisibleSchoolSelect, setIsVisibleSchoolSelect] =
    useState<boolean>(false);
  const [isVisibleMethodSelect, setIsVisibleMethodSelect] =
    useState<boolean>(false);
  const [schools, setSchools] = useState(['']);

  useEffect(() => {
    getSchool().then(data => {
      setSchools(data.map(item => item.name));
    });
  }, []);

  const clickEvent = async() => {
    let flag = true;
    if (schoolSelected === -1) {
      setIsVisibleSchoolSelect(true);
      flag = false;
    } else {
      setIsVisibleSchoolSelect(false);
    }

    // if (methodSelected === -1) {
    //   setIsVisibleMethodSelect(true);
    //   flag = false;
    // } else {
    //   setIsVisibleMethodSelect(false);
    // }

    if (flag) {
      // if (methodSelected === 0) {
      //   dispatch(setUniversity(schools[schoolSelected]));
      //   setNextStep('schoolCardVerify');
      // } else {
      //   dispatch(setUniversity(schools[schoolSelected]));
      //   setNextStep('emailVerify');
      // }

      await emailVerify(schools[schoolSelected]);
      setNextStep();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText text="학교 선택" style={styles.title} />

        <View style={styles.selector}>
          <View style={styles.selectorBox}>
            <ItemSelector
              style={{position: 'absolute', zIndex: 999}}
              hint="학교 선택"
              items={schools}
              selected={schoolSelected}
              setSelected={setSchoolSelected}
            />
          </View>
          {isVisibleSchoolSelect ? (
            <BasicText style={styles.alert} text="*학교를 선택해주세요." />
          ) : null}
        </View>

        {/* <BasicText text="학생 인증 " style={styles.title} />
        <View>
          <TouchableOpacity onPress={() => setMethodSelected(0)}>
            <View
              style={[
                styles.verifyContainer,
                methodSelected === 0
                  ? {
                      backgroundColor: theme.colors.Galdae2,
                      borderColor: theme.colors.Galdae,
                    }
                  : null,
              ]}>
              <BasicText text="학생증 인증" style={styles.verifyTitle} />
              <BasicText style={styles.verifyContent}>
                {'1. 학생증 촬영\n2.학생증 이미지 갤러리에서 가져오기'}
              </BasicText>
              <BasicText
                style={styles.verifyAlert}
                text="*최대 72시간 내 검토 후 이용이 가능합니다."
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMethodSelected(1)}>
            <View
              style={[
                styles.verifyContainer,
                methodSelected === 1
                  ? {
                      backgroundColor: theme.colors.Galdae2,
                      borderColor: theme.colors.Galdae,
                    }
                  : null,
              ]}>
              <BasicText text="이메일 인증" style={styles.verifyTitle} />
              <BasicText style={styles.verifyContent}>
                {
                  '1. 학교 이메일 입력 후 인증 코드 전송\n2. 인증 코드 입력 후 확인'
                }
              </BasicText>
              <BasicText
                style={styles.verifyAlert}
                text="*인증 시 바로 이용이 가능합니다"
              />
            </View>
          </TouchableOpacity>
          {isVisibleMethodSelect ? (
            <BasicText
              style={styles.alert}
              text="*학생 인증 방법을 선택해주세요"
            />
          ) : null}
        </View> */}
      </View>

      <BasicButton
        text="다음"
        onPress={clickEvent}
        disabled={false}
        disabledColors={{
          backgroundColor: theme.colors.grayV3,
          textColor: theme.colors.blackV0,
        }}
        buttonStyle={styles.nextButton}
        textStyle={styles.nextText}
      />
    </View>
  );
};

export default VerifySchool;
