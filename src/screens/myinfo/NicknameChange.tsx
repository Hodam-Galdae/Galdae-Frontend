import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import styles from '../../styles/NicknameChange.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import DeletePopup from '../../components/popup/DeletePopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput } from 'react-native';
import { theme } from '../../styles/theme';
import SelectTextButton from '../../components/button/SelectTextButton';
import { useAppDispatch } from '../../modules/redux/store';
import { fetchUserInfo } from '../../modules/redux/slice/myInfoSlice';
import { fetchMyGaldaeHistory } from '../../modules/redux/slice/myGaldaeSlice';
import { fetchMyCreatedGaldae } from '../../modules/redux/slice/myCreatedGaldaeSlice';
import { fetchHomeGaldaePosts } from '../../modules/redux/slice/homeGaldaeSlice';
//api
import { updateNickname, updateGender } from '../../api/membersApi'; // updateNickname API 임포트
import { checkNickname } from '../../api/onboardingApi'; // checkNickname API 임포트

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)

};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLarge?: string,
    departureSmall?: string,
    destinationLarge?: string,
    destinationSmall?: string,
  };

  SetDestination: undefined;
  MyGaldaeHistory: any;

  NicknameChange: { nickname: string }; // 수정: 파라미터로 닉네임을 받음
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NicknameChangeRouteProp = RouteProp<RootStackParamList, 'NicknameChange'>;

const NicknameChange: React.FC<HomeProps> = () => {
  const route = useRoute<NicknameChangeRouteProp>();
  const dispatch = useAppDispatch();
  // 전달받은 닉네임을 초기값으로 설정 (없으면 기본값 '닉네임')
  const initialNickname = route.params?.nickname || '닉네임';
  const [nickname, setNickname] = useState<string>(initialNickname);
  const [isCheckingNickname, setIsCheckingNickname] = useState<boolean>(false);
  const [alertNameText, setAlertNameText] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<"MALE" | "FEMALE">("FEMALE");
  const [checkName, setCheckName] = useState<string>('');
  const [invalidPopupVisible, setInvalidPopupVisible] = useState<boolean>(false);
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const goBack = () => navigation.goBack();
  const handleChangeNickname = async () => {
    try {
      // 닉네임 변경 API 호출
      await updateNickname(nickname);
      await updateGender(selectedGender);
      //console.log('닉네임 변경 성공');
      dispatch(fetchUserInfo());
      dispatch(fetchMyGaldaeHistory());
      dispatch(fetchMyCreatedGaldae());
      dispatch(fetchHomeGaldaePosts());
      setInvalidPopupVisible(false);
      goBack();
    } catch (error: any) {
      // 에러 응답 객체에서 메시지를 추출합니다.
      const errorMessage =
        error.response?.data?.message || error.message || '닉네임 변경에 실패했습니다.';
      Alert.alert('오류', errorMessage);
      setInvalidPopupVisible(false);
      goBack();
      //console.error('닉네임 변경 실패:', error);
    }
  };
  const checkNicknameEvent = async () => {
    try {
      const regex = /^[가-힣0-9]{2,6}$/;
      console.log(`${nickname} 닉네임 중복 검사 시작`);
      // 닉네임 확인
      if (nickname.length === 0) {
        setIsCheckingNickname(false);
        setAlertNameText('*필수 입력 항목입니다.');
        console.log(`${nickname} 닉네임 중복 검사 결과: 필수 입력 항목입니다.`);
        return;
      } else if (!regex.test(nickname)) {
        setIsCheckingNickname(false);
        setAlertNameText('*닉네임은 한글, 숫자 2~6자로 제한됩니다.');
        console.log(`${nickname} 닉네임 중복 검사 결과: 닉네임은 한글, 숫자 2~6자로 제한됩니다.`);
        return;
      }
      const isAvailableNickname = !(await checkNickname({ nickname: nickname }));
      console.log(`${nickname} 닉네임 중복 검사 결과: ${isAvailableNickname}`);
      if (isAvailableNickname === false) {
        setAlertNameText('*중복되는 닉네임입니다.');
        setIsCheckingNickname(false);
      } else {
        setAlertNameText('사용할 수 있는 닉네임입니다.');
        setIsCheckingNickname(true);
        setCheckName(nickname);
      }
    } catch (err) {
      setAlertNameText('*중복되는 닉네임입니다.');
      setIsCheckingNickname(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
        title={<BasicText text="정보수정" style={styles.headerText} />}
        style={styles.header}
      />

      <View style={styles.content}>
        <View>
          <BasicText text="닉네임" style={styles.subTitle} />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="예) 동동"
              placeholderTextColor={theme.colors.gray2}
            />

            <BasicButton text="중복 확인" onPress={checkNicknameEvent} buttonStyle={styles.checkBtn} textStyle={styles.checkBtnText} />
          </View>
          <BasicText text="* 닉네임은 최초 설정 후 최대 2회까지 변경 가능합니다." style={styles.redText} />
          {alertNameText.length !== 0 && isCheckingNickname === false ? (
            <BasicText style={styles.alertText} text={alertNameText} />
          ) : isCheckingNickname === true ? (
            <BasicText style={styles.alertText2} text={alertNameText} />
          ) : null}

          <BasicText text="성별" style={styles.subTitle2} />
          <View style={styles.buttonWrapper}>
            <SelectTextButton
              text="여자"
              selected={selectedGender === "FEMALE"}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender("FEMALE")}
              unselectedColors={{
                backgroundColor: theme.colors.white,
                textColor: theme.colors.blackV0,
                borderColor: theme.colors.blackV0,
              }}
              selectedColors={{
                backgroundColor: theme.colors.blue,
                textColor: theme.colors.white,
                borderColor: theme.colors.blue,
              }}
            />
            <SelectTextButton
              text="남자"
              selected={selectedGender === "MALE"}
              buttonStyle={styles.selectBtn}
              textStyle={styles.selectText}
              onPress={() => setSelectedGender("MALE")}
              unselectedColors={{
                backgroundColor: theme.colors.white,
                textColor: theme.colors.blackV0,
                borderColor: theme.colors.blackV0,
              }}
              selectedColors={{
                backgroundColor: theme.colors.blue,
                textColor: theme.colors.white,
                borderColor: theme.colors.blue,
              }}
            />
          </View>
          <BasicText text="* 한번 선택한 성별 정보는 수정이 불가합니다." style={styles.redText} />

        </View>
        <BasicButton
          text="완료"
          disabled={nickname.length < 2 || nickname.length > 6 || checkName.length === 0}
          buttonStyle={styles.generateButton}
          textStyle={styles.generateText}
          onPress={() => {
            // 닉네임 길이 검증: 2~6자 제한
            if (nickname.length < 2 || nickname.length > 6) {
              Alert.alert('닉네임 오류', '닉네임은 2~6자여야 합니다.');
              return;
            }
            // 한글과 숫자만 허용하는 정규식 검사
            const regex = /^[가-힣0-9]+$/;
            if (!regex.test(nickname)) {
              Alert.alert('닉네임 오류', '닉네임은 한글과 숫자만 사용할 수 있습니다.');
              return;
            }
            setInvalidPopupVisible(true);
          }}
        />
      </View>

      <DeletePopup
        visible={invalidPopupVisible}
        onCancel={() => setInvalidPopupVisible(false)}
        onConfirm={handleChangeNickname}
        title="정보를 수정하시겠습니까?"
        message=""
        buttonText="확인"
      />
    </View>
  );
};

export default NicknameChange;

