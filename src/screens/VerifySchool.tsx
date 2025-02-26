// MyInfo.tsx 테스트
import React, { useState } from 'react';
import {View, TouchableOpacity} from 'react-native';
import BasicButton from '../components/button/BasicButton';
import { theme } from '../styles/theme';
import styles from '../styles/VerifySchool.style';
import BasicText from '../components/BasicText';
import ItemSelector from '../components/ItemSelector';

interface VerifySchoolProps {
  setNextStep: (index: number) => void;
}

const VerifySchool: React.FC<VerifySchoolProps> = ({setNextStep}) => {
  const [schoolSelected, setSchoolSelected] = useState<number>(-1);
  const [methodSelected, setMethodSelected] = useState<number>(0);
  const schools = [
    '건국대학교 글로컬캠퍼스',
    '한국 교통대학교 충주캠퍼스',
    '공주대학교 천안캠퍼스',
    '단국대학교 천안캠퍼스',
    '단국대학교 천안캠퍼스',
    '백석문화대학교',
    '상명대학교 천안캠퍼스',
  ];

  const clickEvent = () => {
    if(schoolSelected === -1) {
      return;
    }
    if(methodSelected === 0){
      setNextStep(3);
    }
    else {
      setNextStep(4);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText text="학교 선택" style={styles.title}/>
        <View style={styles.selector}>
          <ItemSelector style={{position: 'absolute', zIndex: 999}} hint="학교 선택" items={schools} selected={schoolSelected} setSelected={setSchoolSelected}/>
        </View>
        <BasicText text="학생 인증 " style={styles.title}/>
        <TouchableOpacity onPress={() => setMethodSelected(0)}>
          <View style={[styles.verifyContainer, methodSelected === 0 ? {backgroundColor: theme.colors.brandSubColor, borderColor: theme.colors.brandColor} : null]}>
            <BasicText text="학생증 인증" style={styles.verifyTitle}/>
            <BasicText style={styles.verifyContent}>{'1. 학생증 촬영\n2.학생증 이미지 갤러리에서 가져오기'}</BasicText>
            <BasicText style={styles.verifyAlert} text="*최대 72시간 내 검토 후 이용이 가능합니다."/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMethodSelected(1)}>
          <View style={[styles.verifyContainer, methodSelected === 1 ? {backgroundColor: theme.colors.brandSubColor, borderColor: theme.colors.brandColor} : null]}>
            <BasicText text="이메일 인증" style={styles.verifyTitle}/>
            <BasicText style={styles.verifyContent}>{'1. 학교 이메일 입력 후 인증 코드 전송\n2. 인증 코드 입력 후 확인인'}</BasicText>
            <BasicText style={styles.verifyAlert} text="*인증 시 바로 이용이 가능합니다."/>
          </View>
        </TouchableOpacity>
      </View>

      <BasicButton
        text="다음"
        onPress={clickEvent}
        disabled={false}
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
 
export default VerifySchool;
