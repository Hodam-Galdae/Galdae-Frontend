import React from 'react';
import { View } from 'react-native';
import styles from '../styles/ContinueSignUp.style';
import BasicText from '../components/BasicText';
import BasicButton from '../components/button/BasicButton';
import { StepName } from './SignUp';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../modules/redux/store';

interface ChooseSignupPathProps {
  setNextStep: (name: StepName) => void;
}

const ChooseSignupPath: React.FC<ChooseSignupPathProps> = ({ setNextStep }) => {
  const dispatch = useAppDispatch();

  const handleContinueSignup = async () => {
    try {
      // 백업된 토큰이 있으면 복원 (둘러보기 후 회원가입 계속하기 케이스)
      const tempAccessToken = await EncryptedStorage.getItem('tempAccessToken');
      const tempRefreshToken = await EncryptedStorage.getItem('tempRefreshToken');
      const tempMemberId = await EncryptedStorage.getItem('tempMemberId');

      if (tempAccessToken && tempRefreshToken) {
        // 백업된 토큰 복원
        await EncryptedStorage.setItem('accessToken', tempAccessToken);
        await EncryptedStorage.setItem('refreshToken', tempRefreshToken);
        if (tempMemberId) {
          await EncryptedStorage.setItem('memberId', tempMemberId);
        }

        // 백업 토큰 삭제
        try {
          await EncryptedStorage.removeItem('tempAccessToken');
          await EncryptedStorage.removeItem('tempRefreshToken');
          await EncryptedStorage.removeItem('tempMemberId');
          await AsyncStorage.removeItem('isGuestMode');
        } catch (removeError) {
          // iOS에서 존재하지 않는 키 삭제 시 에러 발생할 수 있음 (무시 가능)
          console.log('⚠️ 임시 토큰 정리 실패 (무시 가능):', removeError);
        }

        console.log('✅ [회원가입 계속하기] 백업 토큰 복원 완료 - EmailVerify로 이동');
      } else {
        console.log('✅ [회원가입 계속하기] EmailVerify로 이동');
      }

      setNextStep('EmailVerify');
    } catch (error) {
      console.error('❌ [회원가입 계속하기] 오류:', error);
      setNextStep('EmailVerify');
    }
  };

  const handleBrowse = async () => {
    try {
      console.log('🔄 [둘러보기] 게스트 모드 전환 시작');

      // 1. 백업할 정보 저장 (대학 정보 + 토큰)
      let savedUniversity = null;
      let savedUniversityArea = null;
      let savedAccessToken = null;
      let savedRefreshToken = null;
      let savedMemberId = null;

      try {
        savedUniversity = await AsyncStorage.getItem('selectedUniversity');
        savedUniversityArea = await AsyncStorage.getItem('selectedUniversityArea');
        savedAccessToken = await EncryptedStorage.getItem('accessToken');
        savedRefreshToken = await EncryptedStorage.getItem('refreshToken');
        savedMemberId = await EncryptedStorage.getItem('memberId');

        console.log('💾 [둘러보기] 정보 백업:', {
          savedUniversity,
          savedUniversityArea,
          hasAccessToken: !!savedAccessToken,
          hasRefreshToken: !!savedRefreshToken,
          hasMemberId: !!savedMemberId,
        });
      } catch (e) {
        console.log('[둘러보기] 정보 백업 실패 (무시):', e);
      }

      // 2. EncryptedStorage 완전히 초기화 (토큰 포함 모든 인증 정보 삭제)
      try {
        await EncryptedStorage.clear();
        console.log('✅ [둘러보기] EncryptedStorage 완전히 초기화됨 (토큰 삭제)');
      } catch (e) {
        console.log('[둘러보기] EncryptedStorage 초기화 실패 (무시):', e);
      }

      // 3. AsyncStorage 완전히 초기화
      try {
        await AsyncStorage.clear();
        console.log('✅ [둘러보기] AsyncStorage 완전히 초기화됨');
      } catch (e) {
        console.log('[둘러보기] AsyncStorage 초기화 실패 (무시):', e);
      }

      // 4. 백업 정보 복원 (대학 정보 + 토큰을 임시 키로 저장)
      try {
        // 대학 정보 복원
        if (savedUniversity) {
          await AsyncStorage.setItem('selectedUniversity', savedUniversity);
        }
        if (savedUniversityArea) {
          await AsyncStorage.setItem('selectedUniversityArea', savedUniversityArea);
        }

        // 토큰을 임시 키로 백업 (회원가입 계속하기 시 복원 가능)
        if (savedAccessToken) {
          await EncryptedStorage.setItem('tempAccessToken', savedAccessToken);
        }
        if (savedRefreshToken) {
          await EncryptedStorage.setItem('tempRefreshToken', savedRefreshToken);
        }
        if (savedMemberId) {
          await EncryptedStorage.setItem('tempMemberId', savedMemberId);
        }

        // 게스트 모드 플래그 설정 (401 에러 시 로그인 화면으로 리다이렉트하지 않기 위함)
        await AsyncStorage.setItem('isGuestMode', 'true');
        console.log('✅ [둘러보기] 정보 복원 및 게스트 모드 설정 완료');
      } catch (e) {
        console.log('[둘러보기] 정보 복원 실패 (무시):', e);
      }

      // 5. Redux 전체 상태 초기화 (게스트 모드)
      dispatch({type: 'RESET_ALL'});
      console.log('✅ [둘러보기] Redux 상태 완전히 초기화됨');

      // 6. MainTab으로 이동 (게스트 모드)
      console.log('✅ [둘러보기] MainTab으로 이동 (게스트 모드)');
      setNextStep('MainTab');
    } catch (error) {
      console.error('[둘러보기] 초기화 중 오류:', error);
      // 오류가 발생해도 MainTab으로 이동
      setNextStep('MainTab');
    }
  };

  return (
    <View style={styles.container}>
      <BasicText style={styles.title}>원할한 서비스 이용을 위해</BasicText>
      <BasicText style={styles.title}>회원가입을 진행해 주세요.</BasicText>

      <BasicButton
        text="회원가입 계속하기"
        onPress={handleContinueSignup}
        buttonStyle={styles.nextButton}
        textStyle={styles.nextText}
      />

      <BasicButton
        text="둘러보기"
        onPress={handleBrowse}
        buttonStyle={styles.mainButton}
        textStyle={styles.mainText}
      />
    </View>
  );
};

export default ChooseSignupPath;
