import React,{useState} from 'react';
import {  View ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Logout.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import BasicButton from '../../components/button/BasicButton';
import DeletePopup from '../../components/popup/DeletePopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { withdrawMember } from '../../api/membersApi';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Login: undefined;
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };

    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const WithDraw: React.FC<HomeProps> = () => {
    const [invalidPopupVisible, setInvalidPopupVisible] = useState<boolean>(false);
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();

    const handleWithDraw = async () => {
      try {
        const result = await withdrawMember(); // 탈퇴 API 호출
        //console.log('탈퇴 성공:', result);

        // ✅ 필요 시 로그아웃 처리나 초기 화면 이동 등 추가
        // 예시: navigation.reset({ index: 0, routes: [{ name: 'Login' }] });

        setInvalidPopupVisible(false);
        Alert.alert('회원탈퇴', '정상적으로 회원탈퇴 되었습니다');
        navigation.navigate('Login');
      } catch (error) {
        //console.error('탈퇴 실패:', error);
        // TODO: 사용자에게 에러 알림 (예: 토스트)
        setInvalidPopupVisible(false);
      }
    };
    return (
      <View style={styles.container}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="회원 탈퇴" style={styles.headerText}/>}
        />
        <View style={styles.content}>
          <BasicText text="탈퇴 하기 전 꼭 확인해주세요!" style={styles.title}/>

          <View style={styles.warnTexts}>
            <BasicText text="이용자 편의에 더욱 적합한 서비스 제공을 위해" style={styles.warnText}/>
            <BasicText text="서비스 운영 정책을 마련했습니다." style={styles.warnText}/>

            <View style={styles.margin}>
                <BasicText text="이 약관은 2025년 00월 00일로부터 발효며" style={styles.warnText}/>
                <BasicText text="동의 후에 갈대 서비스 이용이 가능합니다." style={styles.warnText}/>
            </View>
          </View>

          <View style={styles.logoutBtnContainer}>
            <BasicButton
              text="탈퇴하기"
              buttonStyle={styles.logoutBtn}
              textStyle={styles.logoutText}
              //loading={loading}
              onPress={()=>setInvalidPopupVisible(true)}
            />
          </View>
        </View>
        <DeletePopup
            visible={invalidPopupVisible}
            onCancel={() => setInvalidPopupVisible(false)}
            onConfirm={handleWithDraw }
            title="회원 탈퇴 하시겠습니까?"
            message=""
            buttonText="확인"
        />
      </View>
    );
};

export default WithDraw;

