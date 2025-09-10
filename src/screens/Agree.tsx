// SignUp.tsx 테스트
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import BasicText from '../components/BasicText';
import styles from '../styles/Agree.style';
import { theme } from '../styles/theme';
import SVG from '../components/SVG';
import BasicButton from '../components/button/BasicButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StepName } from './SignUp';
interface AgreeProps {
  setNextStep: (name: StepName) => void;
  goTermsDetailPage: (data: number) => void;
}

const Agree: React.FC<AgreeProps> = ({ setNextStep, goTermsDetailPage }) => {
  const agreeDetailTexts = [
    '[필수] 서비스 이용약관 동의',
    '[필수] 위치정보 수집 및 이용 동의',
    '[필수] 개인정보 수집 및 이용 동의',
    // '[필수] 만 17세 이상입니다다',
    '[필수] 전체 이용약관',

  ];

  const [selected, setSelected] = useState<boolean[]>(
    Array(agreeDetailTexts.length).fill(false),
  );

  const selectAll = () => {
    if (selected.every(value => value)) {
      setSelected(Array(agreeDetailTexts.length).fill(false));
    } else {
      setSelected(Array(agreeDetailTexts.length).fill(true));
    }
  };

  const selectOne = (id: number) => {
    const newArr = [...selected];
    newArr[id] = !newArr[id];
    setSelected(newArr);
  };

  const clickEvent = async () => {
    if (!selected.every(value => value)) {
      return;
    }

    try {
      await AsyncStorage.setItem('agree', 'agreeAll');
      setNextStep('VerifySchool');
    }
    catch (e) {
      // console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <BasicText style={styles.title}>
          더 나은 서비스를 위해{'\n'}약관을 마련했습니다.
        </BasicText>
        <BasicText style={styles.subTitle}>
          원활한 서비스 이용과 회원님의 권리·의무 사항 안내를 위해 아래{'\n'}의 이용약관을 제공합니다. {'\n'}가입 전 반드시 내용을 확인해 주시기 바랍니다.
          {'\n'}모든 항목은 필수 동의 사항이며, 동의하지 않을 경우 회원가입이
          {'\n'}제한됩니다
        </BasicText>
      </View>

      <View>
        <TouchableOpacity onPress={selectAll}>
          <View
            style={
              selected.every(value => value)
                ? {
                  ...styles.agreeBtnWrapper,
                  borderColor: theme.colors.Galdae,
                }
                : styles.agreeBtnWrapper
            }>
            <SVG
              name={selected.every(value => value) ? 'CheckSelected' : 'Check'}
              width={18}
              height={18}
              style={styles.agreeBtn}
            />
            <BasicText
              text="모두 동의합니다"
              style={
                selected.every(value => value)
                  ? { ...styles.agreeText, color: theme.colors.blackV0 }
                  : styles.agreeText
              }
            />
          </View>
        </TouchableOpacity>
        {agreeDetailTexts.map((e, i) => {
          return (
            <View key={i} style={styles.agreeWrapper}>
              <TouchableOpacity onPress={() => selectOne(i)}>
                <SVG
                  width={20}
                  height={20}
                  name={selected[i] ? 'CheckSelected' : 'Check'}
                  style={styles.agreeIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goTermsDetailPage(i)}>
                <BasicText style={selected[i] ? styles.agreeDetailText : styles.agreeDetailTextSelected} text={e} />
              </TouchableOpacity>
            </View>
          );
        })}
        <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={!selected.every(value => value)}
          disabledColors={{
            backgroundColor: theme.colors.grayV3,
            textColor: theme.colors.blackV0,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
      </View>
    </View>
  );
};

export default Agree;
