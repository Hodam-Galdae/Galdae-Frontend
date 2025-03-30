// SignUp.tsx 테스트
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BasicText from '../components/BasicText';
import styles from '../styles/Agree.style';
import {theme} from '../styles/theme';
import SVG from '../components/SVG';
import BasicButton from '../components/button/BasicButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AgreeProps {
  setNextStep: (name: string) => void;
  goTermsDetailPage: (data: string) => void;
}

const Agree: React.FC<AgreeProps> = ({setNextStep, goTermsDetailPage}) => {
  const agreeDetailTexts = [
    '[필수] 만 17세 이상입니다.',
    '[필수] 서비스 이용약관 동의',
    '[필수] 위치정보 수집 및 이용 동의',
    '[필수] 개인정보 수집 및 이용 동의',
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

  const clickEvent = async() => {
    if (!selected.every(value => value)) {
      return;
    }

    try{
      await AsyncStorage.setItem('agree', 'agreeAll');
      setNextStep('setUserInfo');
    }
    catch(e) {
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
          이용자 편의에 더욱 적합한 서비스 제공을 위해{'\n'}서비스 운영 정책을
          마련했습니다. {'\n\n'}이 약관은 2025년 00월 00일로부터 발효며{'\n'}
          동의 후에 갈대 서비스 이용이 가능합니다.
        </BasicText>
      </View>

      <View>
        <TouchableOpacity onPress={selectAll}>
          <View
            style={
              selected.every(value => value)
                ? {
                    ...styles.agreeBtnWrapper,
                    borderColor: theme.colors.brandColor,
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
                  ? {...styles.agreeText, color: theme.colors.black}
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
                  name={selected[i] ? 'CheckSelected' : 'CheckLine'}
                  style={styles.agreeIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goTermsDetailPage(e)}>
                <BasicText style={styles.agreeDetailText} text={e} />
              </TouchableOpacity>
            </View>
          );
        })}
        <BasicButton
          text="다음"
          onPress={clickEvent}
          disabled={!selected.every(value => value)}
          disabledColors={{
            backgroundColor: theme.colors.lightGray,
            textColor: theme.colors.black,
          }}
          buttonStyle={styles.nextButton}
          textStyle={styles.nextText}
        />
      </View>
    </View>
  );
};

export default Agree;
