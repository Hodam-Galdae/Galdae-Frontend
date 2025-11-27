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
import { join, JoinRequest } from '../api/onboardingApi';
import { checkNickname } from '../api/onboardingApi';
import useImagePicker from '../hooks/useImagePicker';
import { banks } from '../constants/bankOptions';
import { StepName } from './SignUp';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { uploadImage } from '../api/fileApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../modules/redux/slice/UserSlice';
import { fetchUserInfo } from '../modules/redux/slice/myInfoSlice';
import { AppDispatch } from '../modules/redux/store';
interface AgreeProps {
  setNextStep: (name: StepName) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
type RootStackParamList = {
  SignupSuccess: undefined;
};
const SetUserInfo: React.FC<AgreeProps> = ({ setNextStep, setIsLoading }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
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

        // FCM 토큰 가져오기 (선택 사항 - 실패해도 회원가입 진행)
        let deviceToken: string | undefined;
        try {
          deviceToken = await messaging().getToken();
          console.log('✅ FCM 토큰 획득 성공:', deviceToken);
        } catch (fcmError) {
          console.warn('⚠️ FCM 토큰 획득 실패 (선택 사항이므로 회원가입은 계속 진행):', fcmError);
          // deviceToken은 undefined로 유지
        }

        let profileImageUrl: string | undefined;

        // ✅ 프로필 이미지(선택) - Presigned URL 방식으로 S3에 먼저 업로드
        if (imageUri) {
          console.log('📸 원본 이미지 URI:', imageUri);

          try {
            const imageFile = {
              uri: imageUri,
              type: imageType || 'image/jpeg',
              name: imageName || 'profile.jpg',
            };

            // S3에 이미지 업로드하고 공개 URL 받기
            console.log('📤 S3에 프로필 이미지 업로드 시작...');
            profileImageUrl = await uploadImage('PROFILE', imageFile);
            console.log('✅ S3 업로드 완료, URL:', profileImageUrl);
          } catch (error) {
            console.error('❌ 이미지 업로드 실패:', error);
            // 이미지 업로드 실패 시에도 회원가입은 진행 (프로필 이미지 없이)
            console.log('⚠️ 프로필 이미지 없이 회원가입 진행');
          }
        }

        // JSON 데이터로 회원가입 요청
        const joinRequestData: JoinRequest = {
          nickname: checkName,
          gender: genderSelected === 0 ? 'FEMALE' : (genderSelected === 1 ? 'MALE' : 'UNKNOWN'),
          bankType: sortedBanks[bankSelect],
          accountNumber: accountNumber!,
          depositor: accountName!,
          deviceToken: deviceToken,
          profileImageUrl: profileImageUrl, // S3에서 받은 URL 또는 undefined
        };

        console.log('🚀 회원가입 요청 데이터:', joinRequestData);
        const response = await join(joinRequestData);
        console.log('✅ 서버에서 받은 회원가입 응답:', response);

        // 토큰 저장
        await EncryptedStorage.setItem('accessToken', response.accessToken);
        await EncryptedStorage.setItem('refreshToken', response.refreshToken);
        console.log('✅ 토큰 저장 완료');

        // 게스트 모드 플래그 제거 및 임시 백업 토큰 삭제 (회원가입 완료)
        try {
          await AsyncStorage.removeItem('isGuestMode');
          await EncryptedStorage.removeItem('tempAccessToken');
          await EncryptedStorage.removeItem('tempRefreshToken');
          await EncryptedStorage.removeItem('tempMemberId');
          console.log('✅ 게스트 모드 종료 및 임시 토큰 정리');
        } catch (removeError) {
          // iOS에서 존재하지 않는 키 삭제 시 에러 발생할 수 있음 (무시 가능)
          console.log('⚠️ 임시 토큰 정리 실패 (무시 가능):', removeError);
        }

        // 사용자 정보 가져와서 Redux에 저장 (게스트 모드 자동 종료)
        try {
          console.log('📖 회원가입 완료 후 사용자 정보 가져오기...');
          const userInfoResult = await dispatch(fetchUserInfo()).unwrap();
          console.log('✅ 사용자 정보 가져오기 성공:', userInfoResult);

          // UserSlice 업데이트 (MainTab의 인증 체크용)
          dispatch(setUser({
            id: userInfoResult.id,
            nickname: userInfoResult.nickname,
            bankType: userInfoResult.bankType,
            accountNumber: userInfoResult.accountNumber,
            depositor: userInfoResult.depositor,
            token: response.accessToken,
            image: userInfoResult.image,
          }));
          console.log('✅ UserSlice 업데이트 완료 - 게스트 모드 자동 종료됨');
        } catch (userInfoError) {
          console.warn('⚠️ 사용자 정보 가져오기 실패 (회원가입은 성공):', userInfoError);
          // 사용자 정보 가져오기 실패 시에도 회원가입은 성공했으므로 계속 진행
          // MainTab에서 다시 시도할 것임
        }

        navigation.navigate('SignupSuccess');
    } catch (e) {
      console.error('❌ 회원가입 실패:', e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(imageUri);
  }, [imageUri]);

  // 닉네임이 변경되면 검증 상태 초기화
  useEffect(() => {
    if (name !== checkName) {
      setIsCheckingNickname(null);
      setAlertNameText('');
    }
  }, [name]);
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
                  <View style={styles.checkBtnContainer}>
                    <BasicButton
                      text="중복 확인"
                      onPress={checkNicknameEvent}
                      buttonStyle={styles.checkBtn}
                      textStyle={styles.checkBtnText}
                      disabled={name.length === 0 || (isCheckingNickname === true && name === checkName)}
                      enabledColors={{
                        backgroundColor: theme.colors.Galdae,
                        textColor: theme.colors.white,
                      }}
                      disabledColors={{
                        backgroundColor: theme.colors.grayV3,
                        textColor: theme.colors.gray2,
                      }}
                    />
                  </View>
                </View>
                {isCheckingNickname === true ? (
                  <BasicText style={styles.alertText2} text={alertNameText} />
                ) : isCheckingNickname === false ? (
                  <BasicText style={styles.alertText} text={alertNameText} />
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
                  style={{ position: 'absolute', zIndex: 999, borderRadius: theme.borderRadius.size12, borderWidth: 1, borderColor: theme.colors.grayV2, paddingVertical: 14, paddingHorizontal: 12, marginBottom: 8 }}
                  textStyle={{ fontSize: theme.fontSize.size14, fontWeight: '500', color: theme.colors.blackV0 }}
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
              disabled={isCheckingNickname !== true || genderSelected === -1 || bankSelect === -1 || accountNumber === undefined || accountName === undefined}
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
