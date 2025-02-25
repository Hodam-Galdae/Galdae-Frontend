// MyInfo.tsx 테스트
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/SetUserInfo.style';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';
import SelectTextButton from '../components/button/SelectTextButton';
import BasicButton from '../components/button/BasicButton';
import {theme} from '../styles/theme';
import ItemSelector from '../components/ItemSelector';

const SetUserInfo: React.FC = () => {
  const [genderSelected, setGenderSelected] = useState<number>(-1);
  const [bankSelect, setBankSelect] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const bankText = [
    '국민 은행',
    '우리 은행',
    '신한 은행',
    '농협',
    '카카오 뱅크',
    '제주 은행',
    '광주 은행',
  ];

  return (
    <View style={styles.container}>
      <View>
        <BasicText text="유저 정보 입력" style={styles.title} />
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <SVG
              style={styles.profile}
              name="DefaultProfile"
              width={68}
              height={68}
            />
            <SVGButton
              iconName="Filter"
              SVGStyle={{width: 28, height: 28}}
              buttonStyle={styles.camera}
            />
          </View>
        </View>
        <BasicText text="닉네임" style={styles.subTitle} />
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <TouchableOpacity>
            <View style={styles.checkBtn}>
              <BasicText style={styles.checkBtnText} text="중복 확인" />
            </View>
          </TouchableOpacity>
        </View>
        <BasicText text="성별" style={styles.subTitle} />
        <View style={styles.genderBtnContainer}>
          <SelectTextButton
            text="여자"
            selected={genderSelected == 0}
            onPress={() => setGenderSelected(0)}
            buttonStyle={styles.genderBtn}
          />
          <SelectTextButton
            text="남자"
            onPress={() => setGenderSelected(1)}
            selected={genderSelected == 1}
            buttonStyle={styles.genderBtn}
          />
        </View>
        <BasicText text="결제·정산관리" style={styles.subTitle} />
        <View style={styles.bankSelector}>
          <ItemSelector
            hint="은행 선택"
            items={bankText}
            selected={bankSelect}
            setSelected={setBankSelect}
            style={{position: 'absolute', zIndex: 999}}
            textStyle={{paddingLeft: 10}}
          />
        </View>
        <TextInput
          style={styles.bankContainer}
          placeholder="계좌번호 입력"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholderTextColor={theme.colors.gray2}
        />
        <TextInput
          style={styles.bankContainer}
          placeholder="예금주 입력"
          placeholderTextColor={theme.colors.gray2}
          value={accountName}
          onChangeText={setAccountName}
        />
      </View>
      <BasicButton
        text="다음"
        onPress={() => {}}
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

export default SetUserInfo;
