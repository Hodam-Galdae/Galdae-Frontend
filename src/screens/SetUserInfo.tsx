/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import styles from '../styles/SetUserInfo.style';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import SVGButton from '../components/button/SVGButton';
import SelectTextButton from '../components/button/SelectTextButton';
import BasicButton from '../components/button/BasicButton';
import { theme } from '../styles/theme';
import ItemSelector from '../components/ItemSelector';
import { ScrollView } from 'react-native-gesture-handler';
import { join } from '../api/onboardingApi';
import { checkNickname } from '../api/onboardingApi';
import useImagePicker from '../hooks/useImagePicker';
import RNFS from 'react-native-fs';
import { banks } from '../constants/bankOptions';
import { StepName } from './SignUp';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface AgreeProps {
  setNextStep: (name: StepName) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
type RootStackParamList = {
  SignupSuccess: undefined;
};
const SetUserInfo: React.FC<AgreeProps> = ({ setNextStep, setIsLoading }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [genderSelected, setGenderSelected] = useState<number>(-1);
  const [bankSelect, setBankSelect] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [checkName, setCheckName] = useState<string>('');
  const [isImageLoading] = useState(false); // 이미지 업데이트 로딩 상태
  const [accountNumber, setAccountNumber] = useState<string | undefined>(undefined);
  const [accountName, setAccountName] = useState<string | undefined>(undefined);
  const [alertNameText, setAlertNameText] = useState<string>('');
  const { imageUri, imageName, imageType, getImageByGallery } = useImagePicker();
  const [isCheckingNickname, setIsCheckingNickname] = useState<boolean | null>(null);
  const englishBanks = banks
    .filter(bank => /^[A-Za-z]/.test(bank.name))
    .map(bank => bank.name)
    .sort((a, b) => a.localeCompare(b));
  const koreanBanks = banks
    .filter(bank => !/^[A-Za-z]/.test(bank.name))
    .map(bank => bank.name)
    .sort((a, b) => a.localeCompare(b, 'ko'));
  const sortedBanks = [...englishBanks, ...koreanBanks];

  const clickEvent = async () => {

    try {
        setIsLoading(true);
        const deviceToken = await messaging().getToken();
        const formData = new FormData();
        const data = {
          nickname: checkName,
          gender: genderSelected === 0 ? 'FEMALE' : (genderSelected === 1 ? 'MALE' : 'UNKNOWN'),
          bankType: sortedBanks[bankSelect],
          accountNumber: accountNumber,
          depositor: accountName,
          deviceToken: deviceToken,
        };
        
        const fileName = `${name}.json`;
        const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');

        formData.append('joinRequestDTO', {
          uri: `file://${filePath}`,
          type: 'application/json',
          name: fileName,
        } as any);
        // ✅ 프로필 이미지(선택)
        if (imageUri) {
  //console.log('hi');
  let imageFile = {uri: imageUri, type: imageType, name: imageName};
  formData.append('profileImage', imageFile as any);
        }
        // just for debug
        const dumpForm = (fd: any) => {
          const parts = (fd as any)?._parts;
          if (Array.isArray(parts)) {
            console.log('🧩 FormData parts:');
            parts.forEach((p, i) => console.log(i, p[0], p[1]));
          }
        };
  
        dumpForm(formData);
  
        await join(formData);
        //setNextStep('SignupSuccess');
        navigation.navigate('SignupSuccess');
    } catch (e) {
      //console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(imageUri);
  }, [imageUri]);
  const checkNicknameEvent = async () => {
    try {
      const regex = /^[가-힣0-9]{2,6}$/;
      console.log(`${name} 닉네임 중복 검사 시작`);
      // 닉네임 확인
      if (name.length === 0) {
        setIsCheckingNickname(false);
        setAlertNameText('*필수 입력 항목입니다.');
        console.log(`${name} 닉네임 중복 검사 결과: 필수 입력 항목입니다.`);
        return;
      } else if (!regex.test(name)) {
        setIsCheckingNickname(false);
        setAlertNameText('*닉네임은 한글, 숫자 2~6자로 제한됩니다.');
        console.log(`${name} 닉네임 중복 검사 결과: 닉네임은 한글, 숫자 2~6자로 제한됩니다.`);
        return;
      }
      const isAvailableNickname = !(await checkNickname({ nickname: name }));
      console.log(`${name} 닉네임 중복 검사 결과: ${isAvailableNickname}`);
      if (isAvailableNickname === false) {
        setAlertNameText('*중복되는 닉네임입니다.');
        setIsCheckingNickname(false);
      } else {
        setAlertNameText('사용할 수 있는 닉네임입니다.');
        setIsCheckingNickname(true);
        setCheckName(name);
      }
    } catch (err) {
      setAlertNameText('*중복되는 닉네임입니다.');
      setIsCheckingNickname(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, paddingTop: 30 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <BasicText text="유저 정보 입력" style={styles.title} />
              <View style={styles.profileContainer}>
                <View style={styles.profileWrapper}>
                  {isImageLoading ? (
                    <View style={[styles.profileImg, { justifyContent: 'center', alignItems: 'center' }]}>
                      <ActivityIndicator size="small" color={theme.colors.Galdae} />
                    </View>
                  ) : imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.profileImg}
                      resizeMode="cover"
                      onError={(error) => {
                        console.log('이미지 로드 에러:', error);
                        console.log('에러 URI:', imageUri);
                        console.log('에러 네이티브 이벤트:', error.nativeEvent);
                      }}
                      onLoad={() => console.log('이미지 로드 성공:', imageUri)}
                    />
                  ) : (
                    <SVG name="profileImg" style={styles.profileImg} />
                  )}

                  <SVGButton iconName="camera_2_line" buttonStyle={styles.profileCamera} onPress={getImageByGallery} />
                </View>
              </View>
              <View>
                <View style={styles.subTitleContainer}>
                  <BasicText text="닉네임" style={styles.subTitle} />
                  <BasicText text="(필수)" style={styles.required} />
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="예) 동동"
                    placeholderTextColor={theme.colors.gray2}
                  />
                  <BasicButton text="중복 확인" onPress={checkNicknameEvent} buttonStyle={styles.checkBtn} textStyle={styles.checkBtnText} />
                </View>
                {alertNameText.length !== 0 || isCheckingNickname === false ? (
                  <BasicText style={styles.alertText} text={alertNameText} />
                ) : null}

                {isCheckingNickname === true ? (
                  <BasicText style={styles.alertText2} text={alertNameText} />
                ) : null}
              </View>
              <View>
                <View style={styles.subTitleContainer}>
                  <BasicText text="성별" style={styles.subTitle} />
                  <BasicText text="(필수)" style={styles.required} />
                </View>

                <View style={styles.genderBtnContainer}>
                  <SelectTextButton
                    text="여자"
                    selected={genderSelected === 0}
                    onPress={() => setGenderSelected(0)}
                    buttonStyle={styles.genderBtn}
                    textStyle={styles.genderBtnText}
                    unselectedColors={{
                      backgroundColor: theme.colors.white,
                      textColor: theme.colors.blackV2,
                      borderColor: theme.colors.blackV2,
                    }}
                    selectedColors={{
                      backgroundColor: theme.colors.blue,
                      textColor: theme.colors.white,
                      borderColor: theme.colors.blue,
                    }}
                  />
                  <SelectTextButton
                    text="남자"
                    onPress={() => setGenderSelected(1)}
                    selected={genderSelected === 1}
                    buttonStyle={styles.genderBtn}
                    textStyle={styles.genderBtnText}
                    unselectedColors={{
                      backgroundColor: theme.colors.white,
                      textColor: theme.colors.blackV2,
                      borderColor: theme.colors.blackV2,
                    }}
                    selectedColors={{
                      backgroundColor: theme.colors.blue,
                      textColor: theme.colors.white,
                      borderColor: theme.colors.blue,
                    }}
                  />
                  <SelectTextButton
                    text="선택 안함"
                    onPress={() => setGenderSelected(2)}
                    selected={genderSelected === 2}
                    buttonStyle={styles.genderBtn}
                    textStyle={styles.genderBtnText}
                    unselectedColors={{
                      backgroundColor: theme.colors.white,
                      textColor: theme.colors.blackV2,
                      borderColor: theme.colors.blackV2,
                    }}
                    selectedColors={{
                      backgroundColor: theme.colors.blue,
                      textColor: theme.colors.white,
                      borderColor: theme.colors.blue,
                    }}
                  />
                </View>
              </View>
              <View style={styles.subTitleContainer}>
                <BasicText text="결제·정산관리" style={styles.subTitle} />
                <BasicText text="(필수)" style={styles.required} />
              </View>
              <View style={styles.bankSelector}>
                <ItemSelector
                  hint="은행 선택"
                  items={sortedBanks}
                  selected={bankSelect}
                  setSelected={setBankSelect}
                  style={{ position: 'absolute', zIndex: 999, borderRadius: theme.borderRadius.size12, borderWidth: 1, borderColor: theme.colors.grayV2, paddingVertical: 14, paddingHorizontal: 20, marginBottom: 8 }}
                  textStyle={{ paddingLeft: 10, fontSize: theme.fontSize.size14, fontWeight: '500', color: theme.colors.blackV0 }}
                />
              </View>
              <TextInput
                style={styles.bankContainer}
                placeholder="계좌번호 입력"
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholderTextColor={theme.colors.blackV0}
                keyboardType="numeric"
                maxLength={15}
              />
              <TextInput
                style={styles.bankContainer}
                placeholder="예금주 입력"
                placeholderTextColor={theme.colors.blackV0}
                value={accountName}
                onChangeText={setAccountName}
                keyboardType="default"
                maxLength={10}
              />
            </View>
            <BasicButton
              text="다음"
              onPress={clickEvent}
              disabled={isCheckingNickname === false || genderSelected === -1 || bankSelect === -1 || accountNumber === undefined || accountName === undefined}
              disabledColors={{
                backgroundColor: theme.colors.grayV3,
                textColor: theme.colors.blackV0,
              }}
              buttonStyle={styles.nextButton}
              textStyle={styles.nextText}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SetUserInfo;
