import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import styles from '../../styles/Logout.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { withdrawMember } from '../../api/membersApi';
import { theme } from '../../styles/theme';
import SVG from '../../components/SVG';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../modules/redux/store';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Login: undefined;
  CreateGaldae: undefined;
  NowGaldae: {
    departureLarge?: string,
    departureSmall?: string,
    destinationLarge?: string,
    destinationSmall?: string,
  };

  SetDestination: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const WithDraw: React.FC<HomeProps> = () => {
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);
  const goBack = () => navigation.goBack();
  const surveyList = [
    { text: '사용법이 어렵거나 불편' },
    { text: 'N빵 멤버를 찾기 어려움 ' },
    { text: '개인정보 및 안전 문제 우려' },
    { text: '비용 절감 효과가 크지 않음' },
    { text: '기타' },
  ];
  const handleWithDraw = async () => {
    try {
      // 1. 백엔드에 탈퇴 요청
      try {
        await withdrawMember(surveyList[selectedSurvey ? selectedSurvey : 0].text);
      } catch (apiError) {
        // API 호출 실패 시 사용자에게 알림
        console.error('탈퇴 API 호출 실패:', apiError);
        Alert.alert('탈퇴 실패', '탈퇴에 실패하였습니다');
        return; // API 실패 시 초기화하지 않고 종료
      }

      // 2. EncryptedStorage 완전히 초기화
      try {
        await EncryptedStorage.clear();
        console.log('✅ [탈퇴] EncryptedStorage 완전히 초기화됨');
      } catch (e) {
        console.log('[탈퇴] EncryptedStorage 초기화 실패 (무시):', e);
      }

      // 3. AsyncStorage 완전히 초기화
      try {
        await AsyncStorage.clear();
        console.log('✅ [탈퇴] AsyncStorage 완전히 초기화됨');
      } catch (e) {
        console.log('[탈퇴] AsyncStorage 초기화 실패 (무시):', e);
      }

      // 4. Redux 전체 상태 초기화
      dispatch({type: 'RESET_ALL'});
      console.log('✅ [탈퇴] Redux 상태 완전히 초기화됨');

      // 5. 로그인 화면으로 이동 (네비게이션 스택 리셋)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );

      Alert.alert('회원탈퇴', '정상적으로 회원탈퇴 되었습니다');
    } catch (error) {
      console.error('[탈퇴] 처리 중 치명적 오류:', error);
      // 치명적 오류가 발생해도 로그인 화면으로 보냄
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line2" onPress={goBack} />}
        title={<BasicText text="탈퇴하기" style={styles.headerText} />}
        style={styles.headerStyle}
      />
      <View style={styles.content}>
        <BasicText text="정말 탈퇴하실 건가요?" style={styles.title} />

        <View style={styles.warnTexts}>
          <BasicText text="이용 중 불편하셨던 점을 알려주시면," style={styles.warnText} />
          <BasicText text="다음에 더 나아진 모습으로 찾아오겠습니다!" style={styles.warnText} />
        </View>

        <View style={styles.surveyBtnContainer}>
          {
            surveyList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedSurvey(index)} style={[styles.surveyBtn, selectedSurvey === index && { borderColor: theme.colors.blue }]}>
                <BasicText text={item.text} style={styles.surveyBtnText} />

                <View style={styles.surveyIconAnchor}>
                  {selectedSurvey === index ? (
                    // 1) 굳이 SVGButton 안 써도 됩니다. 작은 아이콘은 그냥 SVG로.
                    <SVG name="check_circle" width={20} height={20} onPress={() => setSelectedSurvey(index)} />
                    // 2) SVGButton을 꼭 써야 한다면:
                    // <SVGButton iconName="check_circle" buttonStyle={styles.iconButton} SVGStyle={{ width: 20, height: 20 }} />
                  ) : (
                    <View style={styles.surveyIconDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))
          }
        </View>

        <View style={styles.logoutBtnContainer}>
          <BasicButton
            text="탈퇴하기"
            buttonStyle={styles.logoutBtn}
            textStyle={styles.logoutText}
            //loading={loading}
            onPress={handleWithDraw}
            enabledColors={
              {
                backgroundColor: theme.colors.white,
                textColor: theme.colors.Galdae,
                borderColor: theme.colors.Galdae,
              }
            }
            disabledColors={
              {
                backgroundColor: theme.colors.grayV2,
                textColor: theme.colors.grayV0,
                borderColor: theme.colors.white,
              }
            }
            disabled={selectedSurvey === null || selectedSurvey === undefined}
          />
          <BasicButton
            text="조금 더 이용하기"
            buttonStyle={styles.logoutBtn}
            textStyle={styles.logoutText}
            //loading={loading}
            onPress={goBack}
          />
        </View>
      </View>

    </View>
  );
};

export default WithDraw;

