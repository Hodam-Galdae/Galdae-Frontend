/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// MyInfo.tsx 테스트
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BasicButton from '../components/button/BasicButton';
import { theme } from '../styles/theme';
import styles from '../styles/VerifySchool.style';
import BasicText from '../components/BasicText';
import ItemSelector from '../components/ItemSelector';
// import { useDispatch } from 'react-redux';
// import { setUniversity } from '../modules/redux/slice/UserSlice';
import { fetchUniversityList, selectUniversityArea } from '../api/onboardingApi';
import { TextInput } from 'react-native-gesture-handler';
import { StepName } from './SignUp';
interface VerifySchoolProps {
  setNextStep: (name: StepName) => void;
}

const VerifySchool: React.FC<VerifySchoolProps> = ({ setNextStep }) => {
  const [schoolSelected, setSchoolSelected] = useState<number>(-1);
  // const [methodSelected, setMethodSelected] = useState<number>(-1);
  // const dispatch = useDispatch();
  const [isVisibleSchoolSelect] =
    useState<boolean>(false);
  // const [isVisibleMethodSelect, setIsVisibleMethodSelect] =
  //   useState<boolean>(false);
  const [schools, setSchools] = useState(['']);
  const [region, setRegion] = useState('지역');
  const [universityData, setUniversityData] = useState<any[]>([]);

  useEffect(() => {
    fetchUniversityList().then(data => {
      console.log(data);
      // 모든 지역의 대학교를 하나의 배열로 합치기
      const allUniversities = data.flatMap(area =>
        area.universityList.map(university => university.universityName)
      );
      setSchools(allUniversities);
      setUniversityData(data);
      // setRegion(data[0].universityAreaName);
    });
  }, []);

  // 학교 선택이 변경될 때 해당 지역 찾기
  useEffect(() => {
    if (schoolSelected !== -1 && universityData.length > 0) {
      const selectedSchool = schools[schoolSelected];
      const foundArea = universityData.find(area =>
        area.universityList.some((university: any) => university.universityName === selectedSchool)
      );
      if (foundArea) {
        setRegion(foundArea.universityAreaName);
      }
    }
  }, [schoolSelected, schools, universityData]);

  const clickEvent = async () => {
    let flag = true;
    // if (schoolSelected === -1) {

    //   setIsVisibleSchoolSelect(true);
    //   flag = false;
    // } else {
    //   setIsVisibleSchoolSelect(false);
    // }

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
      console.log('📤 [VerifySchool] 전송할 데이터:', {
        university: schools[schoolSelected],
        universityArea: region,
      });

      await selectUniversityArea({
        university: schools[schoolSelected],
        universityArea: region,
      });

      console.log('✅ [VerifySchool] API 호출 완료');

      // await sendUniversityMail({
      //   email: schools[schoolSelected],
      //   studentId: '',
      //   department: '',
      // });
      setNextStep('ContinueSignUp');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText text="재학중인 학교를 선택해주세요." style={styles.title} />

        <View style={styles.selector}>
          <View style={styles.selectorBox}>
            <ItemSelector
              style={{ position: 'absolute', zIndex: 999, borderRadius: theme.borderRadius.size12, borderWidth: 1, borderColor: theme.colors.grayV2, paddingVertical: 14, paddingHorizontal: 20 }}
              hint="학교 선택"
              items={schools}
              selected={schoolSelected}
              setSelected={setSchoolSelected}
              textStyle={{ fontSize: theme.fontSize.size14, fontWeight: '500', color: theme.colors.blackV0 }}
            />
          </View>
          {isVisibleSchoolSelect ? (
            <BasicText style={styles.alert} text="*재학중인 학교를 선택해주세요." />
          ) : null}
        </View>

        <TextInput
          style={styles.input}
          placeholder="지역"
          value={region}
          onChangeText={setRegion}
          placeholderTextColor={theme.colors.grayV2}
          editable={false}
        />
      </View>

      <BasicButton
        text="다음"
        onPress={clickEvent}
        disabled={region.length === 0 || schoolSelected === -1}
        disabledColors={{
          backgroundColor: theme.colors.grayV2,
          textColor: theme.colors.grayV0,
        }}
        buttonStyle={styles.nextButton}
        textStyle={styles.nextText}
      />
    </View>
  );
};

export default VerifySchool;
