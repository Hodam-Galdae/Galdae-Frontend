// Home.tsx 테스트
import React,{useState} from 'react';
import { View, Text } from 'react-native';
import BasicButton from '../components/BasicButton';
import BasicInput from '../components/BasicInput';
import BasicText from '../components/BasicText';
import SVGButton from '../components/SVGButton';
import SVGTextButton from '../components/SVGTextButton';
import styles from '../styles/Home.style';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 파라미터 타입 정의
type RootStackParamList = {
  Onboarding: undefined;
  CreateGaldae: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTab: undefined; // 메인 탭 네비게이터 화면
};

// 로그인 화면에 사용할 네비게이션 타입 지정 (Login 스크린의 네비게이션 객체)
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


const Home: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleGoToMainTab = () => {
    // 로그인 로직 수행 후 메인 탭 네비게이터로 이동 (replace 메서드 사용 가능)
    navigation.navigate('CreateGaldae');
  };
  const handlePress = () => {
    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Text style={styles.subtitle}>환영합니다! 여기는 메인 스크린입니다.</Text>
      <BasicButton
        text="버튼 텍스트"
        onPress={()=>handleGoToMainTab()}
        loading={loading}
        // disabled={true}
        // 활성화 상태 색상 객체 (배경, 텍스트, 테두리)
        // enabledColors={{
        //   backgroundColor: '#FFFFFF',
        //   textColor: '#000000',
        //   borderColor: '#000000',
        // }}
        // 비활성화 상태 색상 객체
        // disabledColors={{
        //   backgroundColor: '#D3D3D3',
        //   textColor: '#000000',
        //   borderColor: '#D3D3D3',
        // }}
        // 추가 스타일 (필요에 따라 조정)
        buttonStyle={styles.button}
        // textStyle={styles.text}
        // accessibilityLabel="Example Button"
      />

      <BasicInput
        text="이름을 입력하세요"  // placeholder로 사용됨
        value={name}
        onChangeText={setName}
      />

    <BasicText text="text prop을 사용한 예시입니다.22" />

    <SVGButton
        iconName="Notification" // ../assets/svg/index.ts 에서 export한 아이콘 이름
        onPress={handlePress}
        loading={loading}
        // enabledColors={{
        //   backgroundColor: '#FFFFFF',
        //   textColor: '#000000',
        //   borderColor: '#000000',
        // }}
        // disabledColors={{
        //   backgroundColor: '#D3D3D3',
        //   textColor: '#000000',
        //   borderColor: '#D3D3D3',
        // }}
        //buttonStyle={styles.button}
        accessibilityLabel="알림 버튼"
      />

      <SVGTextButton
        iconName="Notification" // 'BellIcon'은 '../assets/svg/index.ts'에서 export한 아이콘 키
        text="알림"
        onPress={handlePress}
        loading={loading}
        enabledColors={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderColor: '#000000',
        }}
        disabledColors={{
          backgroundColor: '#D3D3D3',
          textColor: '#000000',
          borderColor: '#D3D3D3',
        }}
        //buttonStyle={styles.button}
        //textStyle={styles.text}
        accessibilityLabel="알림 버튼"
      />
    </View>
  );
};

export default Home;

